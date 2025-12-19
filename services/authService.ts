import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  signOut,
  Auth
} from "firebase/auth";
import { UserProfile } from '../types';

// Provided Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWI52maq3QfBT4hjin-mBzuH7TBuQrkyU",
  authDomain: "washmarket-3d81a.firebaseapp.com",
  databaseURL: "https://washmarket-3d81a-default-rtdb.firebaseio.com",
  projectId: "washmarket-3d81a",
  storageBucket: "washmarket-3d81a.firebasestorage.app",
  messagingSenderId: "989360349383",
  appId: "1:989360349383:web:8b35a4ca651e152e88dee2"
};

// Initialize Firebase App only once
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Get Auth instance
const auth: Auth = getAuth(app);

const USER_KEY = 'gs_neuro_user';
const USERS_DB_KEY = 'gs_neuro_users_db';

let confirmationResult: ConfirmationResult | null = null;

export const authService = {
  // Setup invisible recaptcha
  setupRecaptcha: (containerId: string): RecaptchaVerifier => {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Recaptcha container #${containerId} not found in DOM.`);
      }

      const verifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response: any) => {
          console.log("ReCAPTCHA verification success.");
        },
        'expired-callback': () => {
          console.warn("ReCAPTCHA verification expired.");
        }
      });
      return verifier;
    } catch (error) {
      console.error("Recaptcha Setup Error:", error);
      throw error;
    }
  },

  // Send OTP via Firebase
  sendOtp: async (phone: string, appVerifier: RecaptchaVerifier): Promise<boolean> => {
    try {
      const cleanedPhone = phone.replace(/[^\d]/g, '');
      if (cleanedPhone.length < 10) throw new Error("Invalid phone number length.");

      const formattedPhone = `+91${cleanedPhone.slice(-10)}`;

      console.log("Requesting OTP for", formattedPhone);

      // Ensure recaptcha is rendered before sign-in attempt
      await appVerifier.render();

      confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      console.log("OTP Sent Successfully!");
      return true;
    } catch (error: any) {
      console.error("Firebase Auth Send OTP Error:", error);

      if (error.code === 'auth/internal-error') {
        throw new Error("Application security module failed to initialize. Please check network and refresh the page.");
      }
      throw error;
    }
  },

  // Verify OTP via Firebase
  verifyOtp: async (otp: string): Promise<{ isNewUser: boolean; user?: UserProfile }> => {
    if (!confirmationResult) {
      throw new Error("No pending verification found. Please request OTP again.");
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      const phone = firebaseUser?.phoneNumber || "";

      const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
      const existingUser = db[phone];

      if (existingUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(existingUser));
        return { isNewUser: false, user: existingUser };
      } else {
        return { isNewUser: true };
      }
    } catch (error: any) {
      console.error("OTP Verification Failed:", error);
      throw new Error("The verification code is incorrect. Please try again.");
    }
  },

  // Complete registration and log user in
  register: async (profileData: Omit<UserProfile, 'id' | 'initials'>): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initials = profileData.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);

        const newUser: UserProfile = {
          ...profileData,
          id: `u_${Date.now()}`,
          initials,
          bloodType: 'O+',
          weight: '-- kg',
          height: '-- cm'
        };

        const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
        db[newUser.phone] = newUser;
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));

        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  },

  getCurrentUser: (): UserProfile | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase SignOut error:", e);
    }
    localStorage.removeItem(USER_KEY);
  },

  updateProfile: (user: UserProfile) => {
    const previousUserStr = localStorage.getItem(USER_KEY);
    const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');

    if (previousUserStr) {
      const previousUser = JSON.parse(previousUserStr);
      if (previousUser.phone !== user.phone) {
        delete db[previousUser.phone];
      }
    }

    localStorage.setItem(USER_KEY, JSON.stringify(user));
    db[user.phone] = user;
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
  }
};