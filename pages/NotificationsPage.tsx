import React from 'react';
import { Bell, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import { NOTIFICATIONS } from '../constants';

const NotificationsPage = () => {
    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="Notifications" showBack />
            
            <div className="p-4 space-y-3">
                {NOTIFICATIONS.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    NOTIFICATIONS.map(notif => (
                        <div key={notif.id} className={`p-4 rounded-2xl border ${notif.read ? 'bg-white border-slate-100' : 'bg-primary-50 border-primary-100'} shadow-sm relative overflow-hidden`}>
                             {!notif.read && (
                                 <div className="absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full"></div>
                             )}
                             <div className="flex gap-3">
                                 <div className={`p-2.5 rounded-full h-fit ${
                                     notif.type === 'appointment' ? 'bg-blue-100 text-blue-600' : 
                                     notif.type === 'alert' ? 'bg-red-100 text-red-600' : 
                                     'bg-green-100 text-green-600'
                                 }`}>
                                     {notif.type === 'appointment' ? <Calendar className="h-5 w-5" /> : 
                                      notif.type === 'alert' ? <AlertCircle className="h-5 w-5" /> : 
                                      <CheckCircle className="h-5 w-5" />}
                                 </div>
                                 <div>
                                     <h4 className={`text-sm font-bold ${notif.read ? 'text-slate-800' : 'text-slate-900'}`}>{notif.title}</h4>
                                     <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                                     <p className="text-[10px] text-slate-400 mt-2 font-medium">{notif.time}</p>
                                 </div>
                             </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default NotificationsPage;