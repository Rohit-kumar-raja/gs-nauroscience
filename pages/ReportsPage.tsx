import React, { useState } from 'react';
import { FileText, Pill, Download, Eye, Calendar, Search, Filter } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';

const ReportsPage = () => {
    const [activeTab, setActiveTab] = useState<'reports' | 'prescriptions'>('reports');

    const reports = [
        { id: 1, title: 'Complete Blood Count (CBC)', date: 'Oct 24, 2023', type: 'Lab Report', size: '2.4 MB', doctor: 'Dr. Sarah Jenning' },
        { id: 2, title: 'MRI Brain Scan', date: 'Sep 15, 2023', type: 'Radiology', size: '15.8 MB', doctor: 'Dr. James Wilson' },
        { id: 3, title: 'Lipid Profile', date: 'Aug 10, 2023', type: 'Lab Report', size: '1.2 MB', doctor: 'Dr. Sarah Jenning' },
        { id: 4, title: 'X-Ray Chest PA View', date: 'Jul 05, 2023', type: 'Radiology', size: '4.5 MB', doctor: 'Dr. Robert House' },
    ];

    const prescriptions = [
        { id: 1, doctor: 'Dr. Sarah Jenning', date: 'Oct 24, 2023', specialty: 'Cardiology', meds: ['Atorvastatin 10mg', 'Aspirin 75mg'] },
        { id: 2, doctor: 'Dr. James Wilson', date: 'Sep 15, 2023', specialty: 'Neurology', meds: ['Sumatriptan 50mg', 'Naproxen 500mg'] },
        { id: 3, doctor: 'Dr. Emily Chen', date: 'Jun 12, 2023', specialty: 'Pediatrics', meds: ['Amoxicillin 250mg', 'Paracetamol Syrup'] },
    ];

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="My Reports" showBack />

            <div className="p-4 sticky top-[57px] bg-slate-50 z-10">
                <div className="flex p-1 bg-white border border-slate-200 rounded-xl shadow-sm mb-4">
                    <button 
                        onClick={() => setActiveTab('reports')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'reports' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <FileText className="h-4 w-4" /> Lab Reports
                    </button>
                    <button 
                        onClick={() => setActiveTab('prescriptions')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'prescriptions' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Pill className="h-4 w-4" /> Prescriptions
                    </button>
                </div>

                <div className="relative">
                    <input 
                        type="text" 
                        placeholder={activeTab === 'reports' ? "Search reports..." : "Search prescriptions..."}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 shadow-sm text-sm"
                    />
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <button className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600">
                        <Filter className="h-4 w-4" />
                    </button>
                </div>
            </div>
            
            <div className="px-4 space-y-3 pb-4">
                {activeTab === 'reports' ? (
                    reports.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.99] transition-transform">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{item.date} • {item.doctor}</p>
                                    <span className="inline-block mt-1 text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{item.type}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 border border-slate-200">
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 border border-primary-100">
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    prescriptions.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group active:scale-[0.99] transition-transform">
                             <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                        <Pill className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{item.doctor}</h4>
                                        <p className="text-xs text-slate-500">{item.specialty}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                                    <Calendar className="h-3 w-3" /> {item.date}
                                </div>
                             </div>
                             <div className="space-y-1 mb-3">
                                {item.meds.map((med, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                                        {med}
                                    </div>
                                ))}
                             </div>
                             <button className="w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2">
                                 <Download className="h-3.5 w-3.5" /> Download PDF
                             </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReportsPage;