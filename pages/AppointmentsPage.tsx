import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, History, AlertCircle, CheckCircle, XCircle, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { Appointment } from '../types';

const AppointmentsPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [ratingId, setRatingId] = useState<string | null>(null);

    // Cancellation State
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('appointments');
        if (stored) {
            setAppointments(JSON.parse(stored));
        }
    }, []);

    const initiateCancel = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setCancellingId(id);
        setCancelReason('');
    }

    const confirmCancel = () => {
        if (!cancellingId) return;

        const updated = appointments.map(a => {
            if (a.id === cancellingId) {
                const feedbackNote = cancelReason ? ` [Cancellation Reason: ${cancelReason}]` : '';
                return { 
                    ...a, 
                    status: 'cancelled' as const,
                    notes: (a.notes || '') + feedbackNote
                };
            }
            return a;
        });

        setAppointments(updated);
        localStorage.setItem('appointments', JSON.stringify(updated));
        setCancellingId(null);
        setCancelReason('');
    }

    const handleRate = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        alert("Thank you for your feedback! Rating submitted.");
        setRatingId(null);
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

    const activeList = activeTab === 'upcoming' ? upcomingList : pastList;

    const getStatusColor = (status: string, isPastItem: boolean) => {
        if (status === 'cancelled') return 'bg-red-50 text-red-600 border-red-100';
        if (status === 'completed' || (status === 'confirmed' && isPastItem)) return 'bg-blue-50 text-blue-600 border-blue-100';
        return 'bg-green-50 text-green-600 border-green-100'; // Upcoming Confirmed
    };

    const getStatusIcon = (status: string, isPastItem: boolean) => {
        if (status === 'cancelled') return <XCircle className="h-3 w-3" />;
        if (status === 'completed' || (status === 'confirmed' && isPastItem)) return <CheckCircle className="h-3 w-3" />;
        return <Calendar className="h-3 w-3" />;
    };

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="My Appointments" showBack />
            
            {/* Tabs */}
            <div className="px-4 pt-4 pb-2">
                <div className="flex p-1 bg-slate-200/60 rounded-xl">
                    <button 
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'upcoming' ? 'bg-white text-slate-800 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Upcoming
                    </button>
                    <button 
                        onClick={() => setActiveTab('past')}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'past' ? 'bg-white text-slate-800 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        History
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {activeList.length === 0 ? (
                    <div className="text-center py-20 opacity-50 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            {activeTab === 'upcoming' ? <Calendar className="h-8 w-8 text-slate-300" /> : <History className="h-8 w-8 text-slate-300" />}
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No {activeTab} appointments</h3>
                        <p className="text-sm text-slate-500 max-w-[200px]">
                            {activeTab === 'upcoming' 
                                ? "You don't have any scheduled visits coming up." 
                                : "Your past appointment history will appear here."}
                        </p>
                        {activeTab === 'upcoming' && (
                            <button onClick={() => navigate('/doctors')} className="mt-6 bg-primary-50 text-primary-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-100 transition-colors">
                                Find a Doctor
                            </button>
                        )}
                    </div>
                ) : (
                    activeList.map(appt => {
                        const isItemPast = isPast(appt.date, appt.time);
                        const displayStatus = (appt.status === 'confirmed' && isItemPast) ? 'completed' : appt.status;
                        const isVirtual = appt.consultationType === 'virtual';
                        
                        return (
                            <Card key={appt.id} className="p-5 relative group active:scale-[0.99] transition-transform">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 font-bold text-lg">
                                                {appt.doctorName.charAt(0)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-base leading-tight flex items-center gap-1.5">
                                                {appt.doctorName}
                                                {isVirtual && <Video className="h-3.5 w-3.5 text-indigo-500" />}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{appt.doctorSpecialty}</p>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1.5 ${getStatusColor(appt.status, isItemPast)}`}>
                                        {getStatusIcon(appt.status, isItemPast)}
                                        {displayStatus}
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between mb-4 border border-slate-100">
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div className="w-px h-4 bg-slate-300"></div>
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold">{appt.time}</span>
                                    </div>
                                </div>
                                
                                {appt.notes && (
                                    <div className="mb-4 text-xs text-slate-500 bg-yellow-50 p-2.5 rounded-lg border border-yellow-100 flex gap-2 items-start">
                                        <AlertCircle className="h-3.5 w-3.5 text-yellow-600 shrink-0 mt-0.5" />
                                        <span><span className="font-bold text-yellow-700">Note:</span> {appt.notes}</span>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    {activeTab === 'upcoming' ? (
                                        <>
                                            {isVirtual && displayStatus === 'confirmed' ? (
                                                <button onClick={() => navigate('/video-call')} className="flex-[2] py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 animate-pulse">
                                                    <Video className="h-4 w-4" /> Join Video Call
                                                </button>
                                            ) : (
                                                <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">Reschedule</button>
                                            )}
                                            <button onClick={(e) => initiateCancel(appt.id, e)} className="flex-1 py-2.5 rounded-xl border border-red-100 bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors">Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                         {displayStatus !== 'cancelled' && (
                                            <button onClick={(e) => handleRate(appt.id, e)} className="flex-1 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50 text-xs font-bold text-yellow-700 hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2">
                                                <Star className="h-3.5 w-3.5" /> Rate
                                            </button>
                                         )}
                                         <button onClick={() => navigate('/doctors')} className="flex-1 py-2.5 rounded-xl border border-primary-100 bg-primary-50 text-xs font-bold text-primary-600 hover:bg-primary-100 transition-colors">
                                            Book Again
                                         </button>
                                        </>
                                    )}
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Cancellation Feedback Modal */}
            {cancellingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl animate-slide-up" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Cancel Appointment</h3>
                        <p className="text-sm text-slate-500 mb-4">We're sorry you can't make it. Would you like to tell us why?</p>
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex flex-wrap gap-2">
                                {['Rescheduling', 'Found another doctor', 'Issue Resolved', 'Too expensive', 'Other'].map(reason => (
                                    <button 
                                        key={reason}
                                        onClick={() => setCancelReason(reason)}
                                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${cancelReason === reason ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                                    >
                                        {reason}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mb-6 focus:ring-2 focus:ring-primary-500 outline-none text-sm resize-none placeholder:text-slate-400"
                            placeholder="Add more details (optional)..."
                            rows={3}
                        />
                        
                        <div className="flex gap-3">
                            <Button variant="ghost" className="flex-1" onClick={() => setCancellingId(null)}>Keep</Button>
                            <Button variant="danger" className="flex-1" onClick={confirmCancel}>Confirm Cancel</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppointmentsPage;