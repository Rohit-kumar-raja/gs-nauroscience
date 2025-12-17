import React, { useState } from 'react';
import { X, FileText, ChevronRight, Pill } from 'lucide-react';
import Button from './Button';

const ReportsModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'reports' | 'prescriptions'>('reports');

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl relative animate-slide-up h-[600px] flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X className="h-6 w-6" />
                </button>
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Medical Records</h3>
                </div>
                
                <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                    <button 
                        onClick={() => setActiveTab('reports')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'reports' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Lab Reports
                    </button>
                    <button 
                        onClick={() => setActiveTab('prescriptions')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'prescriptions' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Prescriptions
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3">
                    {activeTab === 'reports' ? (
                        ['Blood Test - Oct 12', 'X-Ray Report - Sep 05', 'General Checkup - Aug 20', 'MRI Scan - Jul 10'].map((report, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary-200 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-orange-500">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-slate-800">{report}</span>
                                        <span className="text-xs text-slate-500">PDF • 2.4 MB</span>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary-500" />
                            </div>
                        ))
                    ) : (
                        ['Amoxicillin - 500mg', 'Paracetamol - 650mg', 'Vitamin D3'].map((med, i) => (
                             <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary-200 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-green-500">
                                        <Pill className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-slate-800">{med}</span>
                                        <span className="text-xs text-slate-500">Prescribed by Dr. Jenning</span>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary-500" />
                            </div>
                        ))
                    )}
                </div>
                <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default ReportsModal;