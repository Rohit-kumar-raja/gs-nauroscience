import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Filter, Receipt, Search } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import { transactionService } from '../services/transactionService';
import { Transaction } from '../types';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const data = transactionService.getAll();
        setTransactions(data);
        setTotalSpent(transactionService.getMonthlyTotal('debit'));
    }, []);

    const filteredTransactions = transactions.filter(tx => 
        tx.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="Transactions" showBack />
            
            <div className="p-4">
                {/* Balance Card */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl mb-6 relative overflow-hidden animate-fade-in">
                    <div className="relative z-10">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Spent ({new Date().toLocaleString('default', { month: 'long' })})</p>
                        <h2 className="text-3xl font-bold mb-4">₹{totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                        <div className="flex gap-4">
                            <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <p className="text-[10px] text-slate-300">Volume</p>
                                <p className="font-bold text-sm">{transactions.length} Txns</p>
                            </div>
                            <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <p className="text-[10px] text-slate-300">Status</p>
                                <p className="font-bold text-sm">Verified</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                    <Receipt className="absolute bottom-4 right-4 text-slate-800 h-24 w-24 opacity-20" />
                </div>

                <div className="flex gap-2 mb-6">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 shadow-sm text-sm"
                        />
                        <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    </div>
                    <button className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-500 hover:bg-slate-50 transition-colors">
                        <Filter className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction History</h3>
                </div>

                <div className="space-y-3">
                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-20 opacity-40">
                            <Receipt className="h-12 w-12 mx-auto mb-4" />
                            <p className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">No Transactions Found</p>
                        </div>
                    ) : (
                        filteredTransactions.map(tx => (
                            <div key={tx.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm animate-fade-in hover:border-primary-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{tx.title}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                            {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {tx.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </span>
                                    {tx.category && (
                                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter mt-1">{tx.category}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;