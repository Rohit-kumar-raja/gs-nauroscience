import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import ChatFAB from './components/ChatFAB';
import EmergencyOverlay from './components/EmergencyOverlay';

// Import Pages
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import MyFacilitiesPage from './pages/MyFacilitiesPage';
import VideoCallPage from './pages/VideoCallPage';
import TransactionsPage from './pages/TransactionsPage';
import ReportsPage from './pages/ReportsPage';

const App = () => {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <Router>
       {/* Desktop Mobile Wrapper/Simulator */}
       <div className="w-full h-full sm:max-w-[400px] sm:h-[800px] bg-slate-50 sm:rounded-[3rem] shadow-2xl sm:border-[8px] sm:border-slate-800 overflow-hidden relative flex flex-col font-sans">
          
          {/* Status Bar Area (Visual only) */}
          <div className="hidden sm:flex justify-between px-6 py-3 bg-slate-800 text-white text-[10px] font-medium rounded-t-[2.5rem] z-50">
             <span>9:41</span>
             <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
                <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
             </div>
          </div>

          <EmergencyOverlay isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50 scroll-smooth">
             <Routes>
                <Route path="/" element={<HomePage onEmergency={() => setEmergencyOpen(true)} />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/facilities" element={<FacilitiesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/my-facilities" element={<MyFacilitiesPage />} />
                <Route path="/video-call" element={<VideoCallPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
             </Routes>
          </div>
          
          <BottomNav />
          <ChatFAB />
       </div>
    </Router>
  );
};

export default App;