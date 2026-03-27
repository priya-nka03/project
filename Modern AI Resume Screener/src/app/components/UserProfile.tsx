import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Calendar, MapPin, Briefcase, Camera, Edit2, X, Check, Upload, ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCameraOptions, setShowCameraOptions] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showCameraCapture, setShowCameraCapture] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    dob: '1994-06-12',
    location: 'San Francisco, CA',
    bio: 'Passionate Frontend Developer with 8+ years of experience in building high-performance web applications using React, TypeScript, and modern CSS frameworks. Looking for a leadership role in a fast-paced product company.',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256',
    employmentStatus: 'Actively Looking',
  });

  const [editedData, setEditedData] = useState(profileData);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedData(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Check if email has changed
    if (editedData.email !== profileData.email) {
      setTempEmail(editedData.email);
      setShowOtpModal(true);
      return;
    }
    
    // Save without OTP if email hasn't changed
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError('');

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    
    // Mock OTP verification (in real app, this would call an API)
    if (otpValue === '123456') {
      setProfileData({ ...editedData, email: tempEmail });
      setIsEditing(false);
      setShowOtpModal(false);
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  const handleCameraOptionClick = (option: 'camera' | 'gallery') => {
    setShowCameraOptions(false);
    
    if (option === 'gallery') {
      fileInputRef.current?.click();
    } else {
      startCamera();
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setCameraStream(stream);
      setShowCameraCapture(true);
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please use gallery upload instead.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      
      const imageUrl = canvas.toDataURL('image/jpeg');
      setPreviewImage(imageUrl);
      setShowImagePreview(true);
      stopCamera();
      setShowCameraCapture(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setShowImagePreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmImageUpdate = () => {
    setProfileData(prev => ({ ...prev, profileImage: previewImage }));
    setEditedData(prev => ({ ...prev, profileImage: previewImage }));
    setShowImagePreview(false);
    setPreviewImage('');
  };

  const cancelImageUpdate = () => {
    setShowImagePreview(false);
    setPreviewImage('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your personal information and career settings.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="relative mx-auto mb-4 h-32 w-32">
              <div className="h-full w-full overflow-hidden rounded-full border-4 border-primary/20 bg-slate-100 dark:bg-slate-800">
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-lg ring-4 ring-white dark:ring-slate-900" onClick={() => setShowCameraOptions(true)}>
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{profileData.fullName}</h2>
            <p className="text-sm font-medium text-primary">Senior Frontend Developer</p>
            
            <div className="mt-6 flex justify-center gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">24</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Applications</p>
              </div>
              <div className="h-10 w-px bg-slate-100 dark:bg-slate-800" />
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">156</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile Views</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Verification Status</h3>
            <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 p-4 text-emerald-600">
              <div className="rounded-full bg-emerald-500 p-1 text-white">
                <CheckCircle size={16} />
              </div>
              <span className="text-sm font-bold">Identity Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 p-8 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
              <button className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300" onClick={handleEditToggle}>
                <Edit2 size={16} />
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <User size={12} /> Full Name
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.fullName} 
                    onChange={(e) => handleInputChange('fullName', e.target.value)} 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.fullName}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Mail size={12} /> Email Address
                </label>
                {isEditing ? (
                  <input 
                    type="email" 
                    value={editedData.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)} 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Calendar size={12} /> Date of Birth
                </label>
                {isEditing ? (
                  <input 
                    type="date" 
                    value={editedData.dob} 
                    onChange={(e) => handleInputChange('dob', e.target.value)} 
                    min="1876-03-10"
                    max="2005-03-10"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 [color-scheme:dark]"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatDate(profileData.dob)}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <MapPin size={12} /> Location
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.location} 
                    onChange={(e) => handleInputChange('location', e.target.value)} 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.location}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Briefcase size={12} /> Employment Status
                </label>
                {isEditing ? (
                  <select 
                    value={editedData.employmentStatus} 
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)} 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <option value="Actively Looking">Actively Looking</option>
                    <option value="Employed">Employed</option>
                    <option value="Not Looking">Not Looking</option>
                  </select>
                ) : (
                  <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-500/20">
                    {profileData.employmentStatus}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 p-8 dark:border-slate-800">
              <h4 className="mb-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Bio</h4>
              {isEditing ? (
                <textarea 
                  value={editedData.bio} 
                  onChange={(e) => handleInputChange('bio', e.target.value)} 
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                />
              ) : (
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {profileData.bio}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end p-8">
                <button className="mr-4 rounded-lg bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300" onClick={handleEditToggle}>
                  Cancel
                </button>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/80" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Camera Options Modal */}
      <AnimatePresence>
        {showCameraOptions && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowCameraOptions(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" 
                onClick={() => setShowCameraOptions(false)}
              >
                <X size={20} />
              </button>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Camera size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Update Profile Picture</h3>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Choose how you'd like to update your profile photo
                </p>
              </div>
              <div className="space-y-3">
                <button 
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left font-bold transition-all hover:border-primary hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary" 
                  onClick={() => handleCameraOptionClick('camera')}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Camera size={20} />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white">Take Photo</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Use your camera to take a new photo</p>
                  </div>
                </button>
                <button 
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left font-bold transition-all hover:border-primary hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary" 
                  onClick={() => handleCameraOptionClick('gallery')}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white">Upload from Gallery</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Choose an existing photo from your device</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowOtpModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" 
                onClick={() => setShowOtpModal(false)}
              >
                <X size={20} />
              </button>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Mail size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Verify Email Address</h3>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Enter the 6-digit code sent to<br />
                  <span className="font-bold text-primary">{tempEmail}</span>
                </p>
                <p className="mt-3 text-xs text-slate-400">
                  Demo: Use code <span className="font-bold text-primary">123456</span>
                </p>
              </div>
              
              <div className="mb-6 flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input 
                    key={index} 
                    type="text" 
                    maxLength={1}
                    value={digit} 
                    onChange={(e) => handleOtpChange(index, e.target.value)} 
                    className="h-14 w-12 rounded-xl border-2 border-slate-200 bg-white text-center text-xl font-bold text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    id={`otp-${index}`}
                  />
                ))}
              </div>
              
              {otpError && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-rose-600">
                  <AlertCircle size={18} />
                  <p className="text-sm font-semibold">{otpError}</p>
                </div>
              )}
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" 
                  onClick={() => {
                    setShowOtpModal(false);
                    setOtp(['', '', '', '', '', '']);
                    setOtpError('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-primary-dark disabled:opacity-50" 
                  onClick={handleVerifyOtp}
                  disabled={otp.some(d => !d)}
                >
                  Verify OTP
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {showImagePreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={cancelImageUpdate}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" 
                onClick={cancelImageUpdate}
              >
                <X size={20} />
              </button>
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Preview Profile Picture</h3>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Review your new profile photo before confirming
                </p>
              </div>
              
              <div className="mb-6 flex justify-center">
                <div className="overflow-hidden rounded-3xl border-4 border-primary/20">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="h-64 w-64 object-cover"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" 
                  onClick={cancelImageUpdate}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-primary-dark" 
                  onClick={confirmImageUpdate}
                >
                  Confirm & Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Capture Modal */}
      <AnimatePresence>
        {showCameraCapture && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <button 
                className="absolute top-4 right-4 z-10 rounded-full bg-rose-500 p-2 text-white transition-colors hover:bg-rose-600" 
                onClick={() => {
                  stopCamera();
                  setShowCameraCapture(false);
                }}
              >
                <X size={20} />
              </button>
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Take a Photo</h3>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Position yourself in the frame and click capture
                </p>
              </div>
              
              <div className="mb-6 flex justify-center">
                <div className="overflow-hidden rounded-2xl border-4 border-primary/20 bg-slate-100 dark:bg-slate-800">
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="h-96 w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" 
                  onClick={() => {
                    stopCamera();
                    setShowCameraCapture(false);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-primary-dark" 
                  onClick={capturePhoto}
                >
                  <Camera size={20} />
                  Capture Photo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Input for Gallery Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileSelect}
      />
    </div>
  );
};

const CheckCircle: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);