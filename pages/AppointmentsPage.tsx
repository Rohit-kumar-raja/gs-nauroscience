import React, { useState, useEffect } from 'react';
import { Calendar, Clock, History, Video, AlertCircle, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { Appointment } from '../types';
import { appointmentService } from '../services/appointmentService';

const AppointmentsPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    // Cancellation State
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState('');

    const loadAppointments = () => {
        setLoading(true);
        const data = appointmentService.getAll();
        setAppointments(data);
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
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
            loadAppointments();
            setCancellingId(null);
            setCancelReason('');
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

    const AppointmentItem = ({ appt, isUpcoming }: { appt: Appointment, isUpcoming: boolean }) => {
        const isItemPast = isPast(appt.date, appt.time);
        const displayStatus = (appt.status === 'confirmed' && isItemPast) ? 'completed' : appt.status;
        
        return (
            <Card className="p-4 relative hover:shadow-md transition-shadow mb-4">
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
                                <Button onClick={() => navigate('/video-call')} className="flex-[2] py-2 text-xs bg-primary-500">
                                    Join Video Call
                                </Button>
                            )}
                            <Button variant="danger" onClick={(e) => initiateCancel(appt.id, e)} className="flex-1 py-2 text-xs">
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={() => navigate('/doctors')} className="w-full py-2 text-xs border-primary-500 text-primary-500">
                            Book Again
                        </Button>
                    )}
                </div>
            </Card>
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

            {/* Cancel Modal */}
            {cancellingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl animate-slide-up">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-center text-slate-900">Cancel Appointment?</h3>
                        <p className="text-slate-500 text-sm text-center mb-6">This action cannot be undone. Please let us know the reason.</p>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6 text-sm resize-none focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
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