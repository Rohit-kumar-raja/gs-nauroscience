
import { UserProfile } from '../types';

declare var Razorpay: any;

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const paymentService = {
  processRazorpayPayment: async (
    amount: number,
    user: UserProfile,
    description: string
  ): Promise<PaymentResponse | null> => {
    return new Promise((resolve, reject) => {
      // Razorpay Checkout Configuration
      // Using the user-provided key: rzp_test_RtU7ZqO2lizS85
      const options = {
        key: 'rzp_test_RtU7ZqO2lizS85', 
        amount: amount * 100, // Amount is in paise (1500 INR = 150000 paise)
        currency: 'INR',
        name: 'G.S Neuroscience',
        description: description,
        image: 'https://cdn-icons-png.flaticon.com/512/883/883356.png', // Hospital Icon
        handler: function (response: PaymentResponse) {
          // Success callback
          resolve(response);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          address: user.address,
          patient_id: user.id
        },
        theme: {
          color: '#002B5B', // Brand Navy
        },
        modal: {
          ondismiss: function() {
            // User closed the payment modal
            resolve(null);
          }
        }
      };

      try {
        if (typeof Razorpay === 'undefined') {
          throw new Error("Razorpay SDK not loaded. Please check your internet connection.");
        }
        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Razorpay initiation failed:", error);
        reject(error);
      }
    });
  }
};
