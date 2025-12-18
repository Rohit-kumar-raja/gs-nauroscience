import React from 'react';
import { CreditCard, Banknote, ShieldCheck, Zap, ChevronRight, Clock } from 'lucide-react';
import Button from '../Button';

interface PaymentStepProps {
    amount: number;
    onPayNow: () => void;
    onPayLater: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ amount, onPayNow, onPayLater }) => {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="text-center mb-8">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Consultation Fee</p>
                <h3 className="text-4xl font-bold text-slate-900">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
            </div>

            <div className="space-y-4">
                {/* Pay Now Option */}
                <button 
                    onClick={onPayNow}
                    className="w-full p-5 bg-primary-500 rounded-3xl text-left flex items-center justify-between group hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/20 active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-base flex items-center gap-2">
                                Pay Now <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase">Instant</span>
                            </h4>
                            <p className="text-primary-100 text-xs">UPI, Cards, Netbanking via Razorpay</p>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-primary-200 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Pay Later Option */}
                <button 
                    onClick={onPayLater}
                    className="w-full p-5 bg-white border-2 border-slate-100 rounded-3xl text-left flex items-center justify-between group hover:border-primary-200 transition-all active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
                            <Banknote className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-slate-900 font-bold text-base">Pay at Hospital</h4>
                            <p className="text-slate-500 text-xs font-medium">Settle payment at the reception desk</p>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-200 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3 border border-slate-100 mt-6">
                <ShieldCheck className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                    <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Safe & Secure</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed">Payments are processed through SSL-secured servers. We do not store your card details.</p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
                 <div className="flex items-center gap-1.5 opacity-50">
                    <Zap className="h-3 w-3 text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fast Checkout</span>
                 </div>
                 <div className="flex items-center gap-1.5 opacity-50">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pay in 30s</span>
                 </div>
            </div>
        </div>
    );
};

export default PaymentStep;