
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import ChatFAB from './components/ChatFAB';
import EmergencyOverlay from './components/EmergencyOverlay';
import { authService } from './services/authService';

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
import AuthPage from './pages/AuthPage';
import PersonalDetailsPage from './pages/PersonalDetailsPage';
import DischargeSummaryPage from './pages/DischargeSummaryPage';

// PrivateRoute now strictly enforces authentication
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = authService.getCurrentUser();
  
  if (!user) {
    // If no user is found, redirect to the authentication page
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-full bg-slate-50 flex flex-col items-center justify-center p-10 text-center">
    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
    <h2 className="text-xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-sm text-slate-500">This feature is coming soon in the next update.</p>
  </div>
);

const AppContent = () => {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<PrivateRoute><HomePage onEmergency={() => setEmergencyOpen(true)} /></PrivateRoute>} />
            <Route path="/doctors" element={<PrivateRoute><DoctorsPage /></PrivateRoute>} />
            <Route path="/appointments" element={<PrivateRoute><AppointmentsPage /></PrivateRoute>} />
            <Route path="/facilities" element={<PrivateRoute><FacilitiesPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
            <Route path="/my-facilities" element={<PrivateRoute><MyFacilitiesPage /></PrivateRoute>} />
            <Route path="/video-call" element={<PrivateRoute><VideoCallPage /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
            <Route path="/discharge-summary" element={<PrivateRoute><DischargeSummaryPage /></PrivateRoute>} />
            <Route path="/personal-info" element={<PrivateRoute><PersonalDetailsPage /></PrivateRoute>} />
            
            <Route path="/payment-methods" element={<PrivateRoute><PlaceholderPage title="Payment Methods" /></PrivateRoute>} />
            <Route path="/insurance" element={<PrivateRoute><PlaceholderPage title="Insurance Details" /></PrivateRoute>} />
            <Route path="/help" element={<PrivateRoute><PlaceholderPage title="Help & Support" /></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </div>
      
      {!isAuthPage && <BottomNav />}
      {!isAuthPage && <ChatFAB />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
       <AppContent />
    </Router>
  );
};

export default App;
