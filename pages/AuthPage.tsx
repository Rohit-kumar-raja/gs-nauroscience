import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ChevronRight, ShieldCheck, Mail, Calendar, MapPin, User, ArrowLeft, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { authService } from '../services/authService';

type AuthStep = 'PHONE' | 'OTP' | 'PROFILE';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>('PHONE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    dob: '',
    address: ''
  });

  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>(null);

  useEffect(() => {
    // Initialize recaptcha when the component mounts
    try {
        const verifier = authService.setupRecaptcha('recaptcha-container');
        setRecaptchaVerifier(verifier);
    } catch (err) {
        console.error("Recaptcha Init Error", err);
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setError(null);
    setLoading(true);
    
    try {
        await authService.sendOtp(phone, recaptchaVerifier);
        setStep('OTP');
    } catch (err: any) {
        setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return; // Firebase standard is 6
    setError(null);
    setLoading(true);
    
    try {
        const result = await authService.verifyOtp(otp);
        if (result.isNewUser) {
            setStep('PROFILE');
        } else {
            navigate('/');
        }
    } catch (err: any) {
        setError("Invalid code. Please check and try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
        await authService.register({
            ...profile,
            phone: phone.startsWith('+') ? phone : `+91${phone}`
        });
        navigate('/');
    } catch (err: any) {
        setError("Registration failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col p-6 animate-fade-in relative">
      {/* Recaptcha Hidden Anchor */}
      <div id="recaptcha-container"></div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Header Section with Official Logo */}
        <div className="mb-12 text-center flex flex-col items-center">
            <div className="mb-8 p-6 bg-slate-50 rounded-[2.5rem] shadow-sm border border-slate-100 inline-block">
                <Logo className="h-12 scale-150" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {step === 'PROFILE' ? 'Your Profile' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
                {step === 'PROFILE' ? 'Let us get to know you' : 'Log in to your G.S Neuroscience account'}
            </p>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-fade-in">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                <p className="text-xs font-bold text-red-600 leading-tight">{error}</p>
            </div>
        )}

        {/* Step: Phone Input */}
        {step === 'PHONE' && (
          <form onSubmit={handleSendOtp} className="space-y-6 animate-slide-up">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Mobile Number</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-3">
                  <span className="text-sm font-bold text-slate-900">+91</span>
                </div>
                <input 
                  type="tel"
                  required
                  placeholder="Enter 10 digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full pl-20 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 text-lg font-bold tracking-widest"
                />
              </div>
            </div>
            <Button 
                type="submit" 
                disabled={phone.length < 10 || loading}
                className="w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/20"
            >
              {loading ? 'Requesting SMS...' : 'Send OTP'} <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="flex items-center justify-center gap-2 text-slate-400">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Verified Secure Login</span>
            </div>
          </form>
        )}

        {/* Step: OTP Input */}
        {step === 'OTP' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6 animate-slide-up">
            <button type="button" onClick={() => setStep('PHONE')} className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-4">
                <ArrowLeft className="h-4 w-4" /> Change Number
            </button>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Verification Code</label>
              <input 
                type="text"
                required
                autoFocus
                placeholder="6-digit Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 text-center text-3xl font-bold tracking-[0.5rem]"
              />
              <p className="mt-4 text-center text-sm text-slate-500">
                  SMS sent to <span className="font-bold text-slate-900">+91 {phone}</span>
              </p>
            </div>
            <Button 
                type="submit" 
                disabled={otp.length < 6 || loading}
                className="w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/20"
            >
              {loading ? 'Checking...' : 'Verify OTP'}
            </Button>
            <button 
                type="button" 
                onClick={handleSendOtp}
                className="w-full text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest"
            >
                Didn't get SMS? Resend
            </button>
          </form>
        )}

        {/* Step: Registration Profile */}
        {step === 'PROFILE' && (
          <form onSubmit={handleRegister} className="space-y-5 animate-slide-up overflow-y-auto max-h-[60vh] px-1 no-scrollbar">
            <h3 className="text-xl font-bold text-slate-900">New Patient Registration</h3>
            <p className="text-sm text-slate-500 mb-4">Complete your medical profile to enable one-tap bookings.</p>
            
            <div className="space-y-4">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                        required
                        type="text"
                        placeholder="Full Legal Name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-bold"
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                        required
                        type="email"
                        placeholder="Email Address"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-bold"
                    />
                </div>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                        required
                        type="date"
                        placeholder="Date of Birth"
                        value={profile.dob}
                        onChange={(e) => setProfile({...profile, dob: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-bold"
                    />
                </div>
                <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <textarea 
                        required
                        placeholder="Residential Address"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-bold resize-none"
                        rows={3}
                    />
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={loading || !profile.name || !profile.email}
                className="w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/20 mt-4"
            >
              {loading ? 'Creating Profile...' : 'Complete Profile'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;