import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck } from 'lucide-react';

const VideoCallPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [status, setStatus] = useState('Connecting...');
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Simulate connection
    const connectTimer = setTimeout(() => {
        setStatus('Connected');
    }, 2000);

    // Call duration timer
    const durationTimer = setInterval(() => {
        if (status === 'Connected') {
            setCallDuration(prev => prev + 1);
        }
    }, 1000);

    // Get user media
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing media devices:", err);
            setStatus('Camera Access Denied');
        }
    };
    
    startVideo();

    return () => {
        clearTimeout(connectTimer);
        clearInterval(durationTimer);
        // Stop tracks
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [status]);

  const toggleMute = () => {
      setIsMuted(!isMuted);
      if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getAudioTracks().forEach(track => track.enabled = isMuted);
      }
  };

  const toggleVideo = () => {
      setIsVideoOff(!isVideoOff);
      if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getVideoTracks().forEach(track => track.enabled = isVideoOff);
      }
  };

  const endCall = () => {
      navigate(-1);
  };

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-start">
            <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span className="text-xs font-medium">Encrypted</span>
            </div>
            <div className="text-right">
                <h3 className="font-bold text-shadow">Dr. Sarah Jenning</h3>
                <p className="text-xs opacity-80">{status === 'Connected' ? formatTime(callDuration) : status}</p>
            </div>
        </div>

        {/* Main Video Area (Doctor - Simulated) */}
        <div className="flex-1 relative bg-slate-800 flex items-center justify-center">
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="w-32 h-32 rounded-full bg-slate-700 mb-6 overflow-hidden border-4 border-slate-600 shadow-2xl relative">
                      <img src="https://picsum.photos/id/64/300/300" alt="Doctor" className="w-full h-full object-cover" />
                      {status === 'Connecting...' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                      )}
                 </div>
                 <h2 className="text-2xl font-bold tracking-tight">Dr. Sarah Jenning</h2>
                 <p className="text-slate-400 animate-pulse mt-2">{status}</p>
             </div>
        </div>

        {/* Self View (PIP) */}
        <div className="absolute top-20 right-4 w-28 h-40 bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl z-20">
             <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline 
                className={`w-full h-full object-cover transform scale-x-[-1] ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} 
             />
             {isVideoOff && (
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                     <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                        <VideoOff className="h-5 w-5 text-slate-400" />
                     </div>
                 </div>
             )}
        </div>

        {/* Controls */}
        <div className="bg-slate-900/80 backdrop-blur-xl p-8 pb-10 flex items-center justify-around rounded-t-[2.5rem] z-30 border-t border-white/10">
            <button onClick={toggleMute} className={`p-4 rounded-full transition-all active:scale-95 ${isMuted ? 'bg-white text-slate-900' : 'bg-slate-800 text-white border border-slate-700'}`}>
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </button>
            <button onClick={endCall} className="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/40 hover:bg-red-600 active:scale-95 transition-all mx-4">
                <PhoneOff className="h-8 w-8" />
            </button>
            <button onClick={toggleVideo} className={`p-4 rounded-full transition-all active:scale-95 ${isVideoOff ? 'bg-white text-slate-900' : 'bg-slate-800 text-white border border-slate-700'}`}>
                {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </button>
        </div>
    </div>
  );
};

export default VideoCallPage;