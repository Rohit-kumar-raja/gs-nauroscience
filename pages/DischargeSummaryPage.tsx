import React, { useState } from 'react';
import { 
    ChevronLeft, 
    FileText, 
    Download, 
    Eye, 
    Calendar, 
    User, 
    Activity, 
    X,
    FileCheck
} from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import Button from '../components/Button';

interface SummaryRecord {
    id: string;
    admissionDate: string;
    dischargeDate: string;
    doctor: string;
    department: string;
    diagnosis: string;
    reason: string;
    advice: string;
}

const DischargeSummaryPage = () => {
    const [selectedSummary, setSelectedSummary] = useState<SummaryRecord | null>(null);

    const summaries: SummaryRecord[] = [
        {
            id: 'DS-2023-001',
            admissionDate: 'Oct 10, 2023',
            dischargeDate: 'Oct 14, 2023',
            doctor: 'Dr. Sarah Jenning',
            department: 'Cardiology',
            diagnosis: 'Mild Hypertension with Cardiac Arrhythmia',
            reason: 'Patient complained of chest discomfort and irregular heartbeat.',
            advice: 'Continue medication as prescribed. Low sodium diet. Follow-up in 2 weeks.',
        },
        {
            id: 'DS-2023-002',
            admissionDate: 'Aug 05, 2023',
            dischargeDate: 'Aug 06, 2023',
            doctor: 'Dr. James Wilson',
            department: 'Neurology',
            diagnosis: 'Acute Migraine Cluster',
            reason: 'Severe headache unresponsive to primary medication.',
            advice: 'Avoid bright lights. Maintain sleep hygiene. MRI scan recommended if symptoms persist.',
        }
    ];

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="Discharge Summaries" showBack />
            
            <div className="p-5 space-y-4">
                {summaries.length === 0 ? (
                    <div className="text-center py-20 opacity-40">
                        <FileCheck className="h-16 w-16 mx-auto mb-4" />
                        <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">No Discharge Records</p>
                    </div>
                ) : (
                    summaries.map((item) => (
                        <div key={item.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 transition-all hover:shadow-md active:scale-[0.98]">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">Discharge Summary</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.id}</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-emerald-100">
                                    Finalized
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-5 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 text-primary-500" />
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase">Discharge Date</p>
                                        <p className="text-[11px] font-bold text-slate-800">{item.dischargeDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-3.5 w-3.5 text-primary-500" />
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase">Consultant</p>
                                        <p className="text-[11px] font-bold text-slate-800">{item.doctor}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button 
                                    onClick={() => setSelectedSummary(item)}
                                    className="flex-1 py-2.5 text-xs bg-primary-500 text-white shadow-none"
                                >
                                    <Eye className="h-3.5 w-3.5" /> View Report
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="flex-1 py-2.5 text-xs border-slate-200 text-slate-600 shadow-none"
                                >
                                    <Download className="h-3.5 w-3.5" /> Download
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Document Viewer Modal */}
            {selectedSummary && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedSummary(null)}>
                    <div className="bg-white rounded-t-[3rem] h-[90vh] flex flex-col animate-slide-up shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h3 className="font-bold text-lg text-slate-900">Medical Summary</h3>
                            <button onClick={() => setSelectedSummary(null)} className="p-2 bg-slate-100 rounded-full text-slate-500">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 no-scrollbar pb-24">
                            <div className="brand-gradient rounded-3xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-4 opacity-70">
                                    <Activity className="h-4 w-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Patient Records</span>
                                </div>
                                <h4 className="text-xl font-bold mb-1">{selectedSummary.diagnosis}</h4>
                                <p className="text-sm opacity-80">{selectedSummary.department} Department</p>
                            </div>

                            <div className="space-y-6">
                                <section>
                                    <h5 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-3 border-b border-primary-100 pb-1">Hospital Stay Information</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Admission</p>
                                            <p className="text-sm font-bold text-slate-800">{selectedSummary.admissionDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Discharge</p>
                                            <p className="text-sm font-bold text-slate-800">{selectedSummary.dischargeDate}</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h5 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-3 border-b border-primary-100 pb-1">Treatment History</h5>
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <p className="text-sm text-slate-700 leading-relaxed italic">"{selectedSummary.reason}"</p>
                                    </div>
                                </section>

                                <section>
                                    <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 border-b border-emerald-100 pb-1">Discharge Advice</h5>
                                    <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
                                        <p className="text-sm text-emerald-800 font-medium leading-relaxed">{selectedSummary.advice}</p>
                                    </div>
                                </section>

                                <section className="p-4 bg-slate-900 rounded-3xl text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <User className="h-5 w-5 text-accent-300" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Consultant Signature</p>
                                            <p className="text-sm font-bold">{selectedSummary.doctor}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-t border-slate-50 absolute bottom-0 left-0 right-0">
                            <Button className="w-full py-4.5 bg-primary-600 shadow-xl shadow-primary-600/20 text-base font-bold rounded-2xl">
                                <Download className="h-5 w-5" /> Download Digital Copy
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DischargeSummaryPage;