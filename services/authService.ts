import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  ConfirmationResult 
} from "firebase/auth";
import { UserProfile } from '../types';

// Firebase configuration placeholder. 
// Note: In a production environment, these should be securely stored.
const firebaseConfig = {
  apiKey: process.env.API_KEY || "AIzaSyDummyKey-For-Demo",
  authDomain: "gs-neuro-prod.firebaseapp.com",
  projectId: "gs-neuro-prod",
  storageBucket: "gs-neuro-prod.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const USER_KEY = 'gs_neuro_user';
const USERS_DB_KEY = 'gs_neuro_users_db';

let confirmationResult: ConfirmationResult | null = null;

export const authService = {
  // Setup invisible recaptcha
  setupRecaptcha: (containerId: string): RecaptchaVerifier => {
    return new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
  },

  // Real Firebase OTP sending
  sendOtp: async (phone: string, appVerifier: RecaptchaVerifier): Promise<boolean> => {
    try {
      // Ensure phone is in E.164 format
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      console.log("OTP Sent Successfully to", formattedPhone);
      return true;
    } catch (error) {
      console.error("Firebase Auth Error: Failed to send OTP", error);
      throw error;
    }
  },

  // Verify real Firebase OTP
  verifyOtp: async (otp: string): Promise<{ isNewUser: boolean; user?: UserProfile }> => {
    if (!confirmationResult) {
      throw new Error("No pending verification found. Please request OTP again.");
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      const phone = firebaseUser.phoneNumber || "";
      
      const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
      const existingUser = db[phone];
      
      if (existingUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(existingUser));
        return { isNewUser: false, user: existingUser };
      } else {
        return { isNewUser: true };
      }
    } catch (error) {
      console.error("Firebase Auth Error: Verification Failed", error);
      throw error;
    }
  },

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
    await auth.signOut();
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