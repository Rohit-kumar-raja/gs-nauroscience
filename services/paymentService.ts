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
      // In a real application, you would fetch the `order_id` from your backend first.
      // For this demo, we use a manual integration.
      const options = {
        key: process.env.API_KEY || 'rzp_test_RtU7ZqO2lizS85', // Uses provided key
        amount: amount * 100, // Amount is in paise
        currency: 'INR',
        name: 'G.S Neuroscience',
        description: description,
        image: 'https://gs-neuro.com/logo.png', // Placeholder logo
        handler: function (response: PaymentResponse) {
          resolve(response);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          address: user.address,
        },
        theme: {
          color: '#002B5B', // Primary brand color
        },
        modal: {
          ondismiss: function() {
            resolve(null);
          }
        }
      };

      try {
        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Razorpay initiation failed", error);
        reject(error);
      }
    });
  }
};