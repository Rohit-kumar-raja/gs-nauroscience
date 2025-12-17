import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Filter, Receipt } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';

const TransactionsPage = () => {
    // Mock data for transactions
    const transactions = [
        { id: 1, title: 'Consultation - Dr. Sarah', date: 'Oct 24, 2023', amount: -1500.00, type: 'debit', status: 'Completed' },
        { id: 2, title: 'Pharmacy Purchase', date: 'Oct 24, 2023', amount: -450.00, type: 'debit', status: 'Completed' },
        { id: 3, title: 'Insurance Claim', date: 'Oct 20, 2023', amount: 5000.00, type: 'credit', status: 'Processed' },
        { id: 4, title: 'Lab Tests (Blood Work)', date: 'Oct 15, 2023', amount: -850.00, type: 'debit', status: 'Completed' },
        { id: 5, title: 'Consultation - Dr. House', date: 'Sep 28, 2023', amount: -2000.00, type: 'debit', status: 'Completed' },
    ];

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="Transactions" showBack />
            
            <div className="p-4">
                {/* Balance Card */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Spent (Oct)</p>
                        <h2 className="text-3xl font-bold mb-4">₹2,800.00</h2>
                        <div className="flex gap-4">
                            <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <p className="text-[10px] text-slate-300">Consultations</p>
                                <p className="font-bold text-sm">₹3,500.00</p>
                            </div>
                            <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <p className="text-[10px] text-slate-300">Medicines</p>
                                <p className="font-bold text-sm">₹450.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                    <Receipt className="absolute bottom-4 right-4 text-slate-800 h-24 w-24 opacity-20" />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800">Recent Activity</h3>
                    <button className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-500 hover:bg-slate-50">
                        <Filter className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-3">
                    {transactions.map(tx => (
                        <div key={tx.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {tx.type === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{tx.title}</h4>
                                    <p className="text-xs text-slate-500">{tx.date} • {tx.status}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>
                                {tx.type === 'credit' ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;