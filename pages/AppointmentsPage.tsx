
import React, { useState, useEffect } from 'react';
import { 
    Calendar, 
    Clock, 
    History, 
    Video, 
    AlertCircle, 
    ChevronRight, 
    CheckCircle, 
    XCircle, 
    User, 
    CreditCard, 
    Banknote, 
    Receipt, 
    X, 
    Building2,
    ShieldCheck,
    Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { Appointment, Transaction } from '../types';
import { appointmentService } from '../services/appointmentService';
import { transactionService } from '../services/transactionService';

const AppointmentsPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    // Cancellation & Detail State
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const loadData = () => {
        setLoading(true);
        const appts = appointmentService.getAll();
        const txns = transactionService.getAll();
        setAppointments(appts);
        setTransactions(txns);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const initiateCancel = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setCancellingId(id);
        setCancelReason('');
    }

    const confirmCancel = async () => {
        if (!cancellingId) return;
        setLoading(true);
        const success = await appointmentService.updateStatus(cancellingId, 'cancelled', cancelReason);
        if (success) {
            loadData();
            setCancellingId(null);
            setCancelReason('');
            setSelectedAppointment(null);
        }
        setLoading(false);
    }

    const isPast = (dateStr: string, timeStr: string) => {
        const now = new Date();
        const apptDate = new Date(`${dateStr}T${timeStr}`);
        return apptDate < now;
    };

    const upcomingList = appointments.filter(a => 
        !isPast(a.date, a.time) && a.status === 'confirmed'
    ).sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

    const pastList = appointments.filter(a => 
        isPast(a.date, a.time) || a.status === 'completed' || a.status === 'cancelled'
    ).sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());

    const getStatusColor = (status: string, isPastItem: boolean) => {
        if (status === 'cancelled') return 'bg-red-50 text-red-600 border-red-100';
        if (status === 'completed' || (status === 'confirmed' && isPastItem)) return 'bg-blue-50 text-blue-600 border-blue-100';
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'; 
    };

    // Sub-component for listing items
    const AppointmentItem: React.FC<{ appt: Appointment, isUpcoming: boolean }> = ({ appt, isUpcoming }) => {
        const isItemPast = isPast(appt.date, appt.time);
        const displayStatus = (appt.status === 'confirmed' && isItemPast) ? 'completed' : appt.status;
        
        return (
            <Card className="p-4 relative hover:shadow-md transition-all active:scale-[0.98] mb-4 cursor-pointer" onClick={() => setSelectedAppointment(appt)}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                            {appt.doctorName.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1">
                                {appt.doctorName}
                                {appt.consultationType === 'virtual' && <Video className="h-3 w-3 text-accent-500" />}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{appt.doctorSpecialty}</p>
                        </div>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${getStatusColor(appt.status, isItemPast)}`}>
                        {displayStatus}
                    </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between mb-4 border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {appt.time}
                    </div>
                </div>
                
                <div className="flex gap-2">
                    {isUpcoming ? (
                        <>
                            {appt.consultationType === 'virtual' && (
                                <Button onClick={(e) => { e.stopPropagation(); navigate('/video-call'); }} className="flex-[2] py-2 text-xs bg-primary-500">
                                    Join Video Call
                                </Button>
                            )}
                            <Button variant="outline" className="flex-1 py-2 text-xs border-slate-200 text-slate-600">
                                View Details
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={(e) => { e.stopPropagation(); navigate('/doctors'); }} className="w-full py-2 text-xs border-primary-500 text-primary-500">
                            Book Again
                        </Button>
                    )}
                </div>
            </Card>
        );
    };

    // Component for Detailed Modal
    const AppointmentDetailsSheet = () => {
        if (!selectedAppointment) return null;
        const appt = selectedAppointment;
        const relatedTx = transactions.find(t => t.referenceId === appt.id);
        const isItemPast = isPast(appt.date, appt.time);
        const displayStatus = (appt.status === 'confirmed' && isItemPast) ? 'completed' : appt.status;

        return (
            <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedAppointment(null)}>
                <div className="bg-white rounded-t-[3rem] max-h-[92vh] flex flex-col animate-slide-up shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                             <div className={`p-1.5 rounded-lg ${getStatusColor(appt.status, isItemPast)}`}>
                                 <CheckCircle className="h-4 w-4" />
                             </div>
                             <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Appointment Details</h3>
                        </div>
                        <button onClick={() => setSelectedAppointment(null)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar pb-32">
                        {/* Status Header */}
                        <div className="brand-gradient rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                             <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4 opacity-70">
                                    <Receipt className="h-4 w-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Booking Reference #{appt.id.slice(-6).toUpperCase()}</span>
                                </div>
                                <h4 className="text-2xl font-bold mb-1">Dr. {appt.doctorName.replace('Dr. ', '')}</h4>
                                <p className="text-sm opacity-80 font-medium">{appt.doctorSpecialty} Specialist</p>
                                
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
                                        <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest">Status</p>
                                        <p className="text-xs font-bold uppercase">{displayStatus}</p>
                                    </div>
                                    <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
                                        <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest">Type</p>
                                        <p className="text-xs font-bold uppercase flex items-center gap-1.5">
                                            {appt.consultationType === 'virtual' ? <Video className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                                            {appt.consultationType}
                                        </p>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Scheduling & Patient Section */}
                        <div className="grid grid-cols-1 gap-4">
                            <section>
                                <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 px-1">
                                    <Calendar className="h-3.5 w-3.5 text-primary-500" />
                                    Booking Information
                                </h5>
                                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Patient</span>
                                        <span className="text-sm font-bold text-slate-800">{appt.patientName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Date</span>
                                        <span className="text-sm font-bold text-slate-800">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Time Slot</span>
                                        <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{appt.time}</span>
                                    </div>
                                    {appt.notes && (
                                        <div className="pt-3 border-t border-slate-50">
                                            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Reason for visit</span>
                                            <p className="text-sm text-slate-600 font-medium italic">"{appt.notes}"</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Transaction Details Section */}
                            <section>
                                <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 px-1">
                                    <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
                                    Payment & Transaction
                                </h5>
                                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Fee Amount</span>
                                        <span className="text-sm font-bold text-slate-900">₹{appt.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '1,500.00'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Payment Method</span>
                                        <div className="flex items-center gap-2">
                                            {appt.paymentStatus === 'paid' ? (
                                                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs uppercase bg-emerald-50 px-2 py-1 rounded-md">
                                                    <ShieldCheck className="h-3 w-3" /> Online Paid
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-orange-600 font-bold text-xs uppercase bg-orange-50 px-2 py-1 rounded-md">
                                                    <Banknote className="h-3 w-3" /> Pay at Desk
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {relatedTx && (
                                        <div className="pt-4 mt-2 border-t border-dashed border-slate-200">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Transaction ID</p>
                                                    <p className="text-[11px] font-mono text-slate-600 font-bold">{relatedTx.id}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">TX Status</p>
                                                    <p className={`text-[10px] font-bold uppercase ${relatedTx.status === 'Completed' ? 'text-emerald-500' : 'text-orange-500'}`}>{relatedTx.status}</p>
                                                </div>
                                            </div>
                                            {appt.paymentId && (
                                                <div className="bg-slate-50 p-2 rounded-xl flex items-center justify-between">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Razorpay Ref</span>
                                                    <span className="text-[9px] font-mono text-slate-500 font-bold">{appt.paymentId}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Additional Help Section */}
                        <div className="bg-primary-50 rounded-3xl p-5 border border-primary-100 flex items-start gap-4">
                            <AlertCircle className="h-6 w-6 text-primary-500 shrink-0 mt-0.5" />
                            <div>
                                <h6 className="text-xs font-bold text-primary-900 mb-1">Important Instruction</h6>
                                <p className="text-xs text-primary-700 leading-relaxed font-medium">
                                    {appt.consultationType === 'virtual' 
                                        ? "Please ensure you have the G.S Healthcare app open 10 minutes prior to the slot. A 'Join' button will appear automatically."
                                        : "Kindly report to the registration desk in Wing B at least 15 minutes before your time slot for physical check-in."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-white border-t border-slate-50 absolute bottom-0 left-0 right-0 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] flex gap-4">
                        {appt.status === 'confirmed' && !isItemPast && (
                             <Button variant="danger" className="flex-1 py-4 font-bold rounded-2xl" onClick={(e) => initiateCancel(appt.id, e)}>
                                Cancel Visit
                             </Button>
                        )}
                        {appt.consultationType === 'virtual' && appt.status === 'confirmed' && !isItemPast && (
                            <Button className="flex-[1.5] py-4 font-bold bg-primary-600 rounded-2xl shadow-xl shadow-primary-600/20" onClick={() => navigate('/video-call')}>
                                Start Call
                            </Button>
                        )}
                        {(appt.status === 'completed' || (appt.status === 'confirmed' && isItemPast)) && (
                            <Button className="w-full py-4 font-bold bg-primary-600 rounded-2xl shadow-xl shadow-primary-600/20" onClick={() => navigate('/doctors')}>
                                Re-book Consultation
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="My Appointments" showBack />
            
            <div className="p-4 space-y-8 animate-fade-in">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-widest">Loading Records...</p>
                    </div>
                ) : (
                    <>
                        {/* CATEGORY: UPCOMING */}
                        <section>
                            <div className="flex justify-between items-center mb-4 px-1">
                                <h2 className="text-xs font-bold text-primary-500 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1 h-4 bg-primary-500 rounded-full"></div>
                                    Upcoming Appointments
                                </h2>
                                <span className="text-[10px] font-bold bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full border border-primary-100">
                                    {upcomingList.length}
                                </span>
                            </div>
                            
                            {upcomingList.length === 0 ? (
                                <div className="bg-white/50 border border-dashed border-slate-200 rounded-3xl p-8 text-center">
                                    <Calendar className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                                    <p className="text-sm font-bold text-slate-400">No upcoming visits</p>
                                    <button 
                                        onClick={() => navigate('/doctors')}
                                        className="text-primary-500 text-xs font-bold mt-2 hover:underline"
                                    >
                                        Find a Specialist
                                    </button>
                                </div>
                            ) : (
                                upcomingList.map(appt => (
                                    <AppointmentItem key={appt.id} appt={appt} isUpcoming={true} />
                                ))
                            )}
                        </section>

                        {/* CATEGORY: PAST */}
                        <section className="pt-2">
                            <div className="flex justify-between items-center mb-4 px-1">
                                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                                    Past Appointments
                                </h2>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                                    {pastList.length}
                                </span>
                            </div>
                            
                            {pastList.length === 0 ? (
                                <div className="bg-white/50 border border-dashed border-slate-200 rounded-3xl p-8 text-center opacity-60">
                                    <History className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                                    <p className="text-sm font-bold text-slate-400">No past history</p>
                                </div>
                            ) : (
                                pastList.map(appt => (
                                    <AppointmentItem key={appt.id} appt={appt} isUpcoming={false} />
                                ))
                            )}
                        </section>
                    </>
                )}
            </div>

            {/* Detailed Appointment View */}
            <AppointmentDetailsSheet />

            {/* Cancel Modal */}
            {cancellingId && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl animate-slide-up">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-center text-slate-900">Cancel Appointment?</h3>
                        <p className="text-slate-500 text-sm text-center mb-6">This action cannot be undone. Please let us know the reason.</p>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6 text-sm resize-none focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all font-bold"
                            placeholder="Reason for cancellation (optional)..."
                            rows={3}
                        />
                        <div className="flex gap-3">
                            <Button variant="ghost" className="flex-1 font-bold text-slate-400" onClick={() => setCancellingId(null)}>Go Back</Button>
                            <Button variant="danger" className="flex-1 bg-red-600 text-white shadow-lg shadow-red-600/20" onClick={confirmCancel}>Confirm</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppointmentsPage;
