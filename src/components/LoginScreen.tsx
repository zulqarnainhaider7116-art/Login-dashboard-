import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Heart,
  Crown,
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import useSound from 'use-sound';
import girlImg from '../assets/girl.png';
import boyImg from '../assets/boy.png';
import { useGender, Gender } from '../context/GenderContext';
import {
  POP_SOUND_URI,
  PUSH_SOUND_URI,
  CHIME_SOUND_URI,
  SUCCESS_SOUND_URI,
  soundManager,
} from '../utils/sound-effects';
import {
  validateUsernameOrEmail,
  validatePassword,
  formatSocialProviderName,
} from '../utils/auth-validation';

export interface LoginScreenProps {
  gender?: Gender;
  onBack?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  gender: propGender,
  onBack,
}) => {
  const navigate = useNavigate();
  const { gender: contextGender, setGender, soundEnabled, toggleSound } = useGender();
  const currentGender: Gender = propGender || contextGender || 'girl';

  // Integrated 'use-sound' library hooks for cheerful tactile 3D sound effects
  const [playPop] = useSound(POP_SOUND_URI, { volume: 0.5, soundEnabled });
  const [playPush] = useSound(PUSH_SOUND_URI, { volume: 0.75, soundEnabled });
  const [playChime] = useSound(CHIME_SOUND_URI, { volume: 0.65, soundEnabled });
  const [playSuccess] = useSound(SUCCESS_SOUND_URI, { volume: 0.7, soundEnabled });

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ identity?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const isGirl = currentGender === 'girl';
  const characterImg = isGirl ? girlImg : boyImg;

  const triggerSound = (type: 'pop' | 'push' | 'chime' | 'success') => {
    if (!soundEnabled) return;
    try {
      if (type === 'push') playPush();
      else if (type === 'pop') playPop();
      else if (type === 'chime') playChime();
      else if (type === 'success') playSuccess();
    } catch {
      // Audio playback fallback
    }
    // Web Audio fallback for instant tactile response
    if (type === 'push') soundManager.playPush();
    else if (type === 'pop') soundManager.playPop();
    else if (type === 'chime') soundManager.playChime();
    else if (type === 'success') soundManager.playSuccess();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSound('push'); // Play tactile 3D button push sound immediately

    const idValidation = validateUsernameOrEmail(identity);
    const passValidation = validatePassword(password);

    const newErrors: { identity?: string; password?: string } = {};
    if (!idValidation.valid) newErrors.identity = idValidation.error;
    if (!passValidation.valid) newErrors.password = passValidation.error;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setLoginSuccess(true);
        triggerSound('success'); // Play cheerful celebration jingle
        showToast(`🎉 Welcome back, ${identity}! Authenticated successfully.`);
      }, 750);
    }
  };

  const handleSocialClick = (provider: 'google' | 'apple' | 'facebook') => {
    triggerSound('pop');
    showToast(`Connecting with ${formatSocialProviderName(provider)}...`);
  };

  const handleBack = () => {
    triggerSound('pop');
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleSwitchGender = (newGender: Gender) => {
    triggerSound('chime');
    setGender(newGender);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-start sm:justify-center py-6 sm:py-10 px-4 transition-colors duration-500 relative overflow-x-hidden ${
        isGirl
          ? 'bg-gradient-to-br from-[#F5EEFB] via-[#FBF7FF] to-[#EFE4F8]'
          : 'bg-gradient-to-br from-[#E8F2FE] via-[#F4F9FF] to-[#D9ECFE]'
      }`}
    >
      {/* Ambient background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-50 ${
            isGirl ? 'bg-purple-300' : 'bg-blue-300'
          }`}
        />
        <div
          className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-50 ${
            isGirl ? 'bg-pink-300' : 'bg-sky-300'
          }`}
        />
      </div>

      {/* Floating Top Control Bar */}
      <header className="w-full max-w-[420px] mx-auto mb-4 z-30 flex items-center justify-between px-1">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-slate-700 shadow-sm transition-all text-xs font-bold hover:scale-105 active:scale-95 border border-white/60 cursor-pointer"
          aria-label="Back to Theme Selection"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Theme Selection</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              if (!soundEnabled) {
                soundManager.playPop();
              }
            }}
            className="p-1.5 rounded-full bg-white/85 hover:bg-white text-slate-600 shadow-sm border border-white/60 transition-all hover:scale-105 cursor-pointer"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-purple-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Quick Gender Switcher */}
          <div className="flex items-center bg-white/85 backdrop-blur-md p-1 rounded-full shadow-sm border border-white/60">
            <button
              onClick={() => handleSwitchGender('girl')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                isGirl
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-purple-600'
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Girl</span>
            </button>
            <button
              onClick={() => handleSwitchGender('boy')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                !isGirl
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              <Crown className="w-3 h-3 fill-current" />
              <span>Boy</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-[400px] relative z-10 mt-36 sm:mt-40 mb-4">
        {/* ========================================================
            THE 3D CHARACTER (CRUCIAL):
            Position absolute, pops out of the card.
            DO NOT crop the image. Keep the cat and dog fully visible.
            Continuous floating animation for lifelike presence.
           ======================================================== */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[160px] sm:-top-[180px] left-1/2 -translate-x-1/2 z-20 w-[330px] sm:w-[365px] pointer-events-none"
        >
          <img
            src={characterImg}
            alt={isGirl ? 'Girl and Cat 3D Character' : 'Boy and Dog 3D Character'}
            className="w-full h-auto object-contain filter drop-shadow-xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* ========================================================
            THE CARD:
            Off-white (bg-[#F8F9FA]), huge rounded corners (rounded-[50px]), deep 3D shadow.
           ======================================================== */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="w-full bg-[#F8F9FA] rounded-[50px] shadow-2xl shadow-slate-500/20 border border-white/80 pt-16 sm:pt-18 pb-7 px-6 sm:px-7 relative z-10"
        >
          {/* Card Header */}
          <div className="text-center mb-5">
            <h1
              className={`text-2xl sm:text-[26px] font-extrabold tracking-tight font-display leading-tight ${
                isGirl ? 'text-[#6D28D9]' : 'text-[#1D4ED8]'
              }`}
            >
              Welcome Back
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Login to continue your journey
            </p>
          </div>

          <AnimatePresence mode="wait">
            {loginSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="py-4 text-center flex flex-col items-center"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white shadow-lg ${
                    isGirl ? 'bg-purple-600 shadow-purple-300' : 'bg-blue-600 shadow-blue-300'
                  }`}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Login Successful!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Welcome, <span className="font-bold text-slate-700">{identity}</span>! Your{' '}
                  {isGirl ? 'Girls' : 'Boys'} session is authenticated.
                </p>

                <div className="mt-5 flex flex-col gap-2 w-full">
                  <button
                    onClick={() => {
                      triggerSound('pop');
                      setLoginSuccess(false);
                      setIdentity('');
                      setPassword('');
                      setErrors({});
                    }}
                    className={`w-full py-3 px-6 rounded-full text-white font-bold text-xs tracking-wide transition-all cursor-pointer ${
                      isGirl
                        ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_5px_0_#6D28D9] active:translate-y-1 active:shadow-none'
                        : 'bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_5px_0_#1D4ED8] active:translate-y-1 active:shadow-none'
                    }`}
                  >
                    Reset & Try Again
                  </button>
                  <button
                    onClick={handleBack}
                    className="w-full py-2 px-4 rounded-full text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Back to Theme Selection
                  </button>
                </div>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleLogin} className="space-y-3.5">
                {/* Pill Username/Email Input */}
                <div>
                  <div
                    className={`relative flex items-center bg-[#F1F3F5] rounded-full p-1 transition-all focus-within:ring-2 ${
                      isGirl
                        ? 'focus-within:ring-purple-400 focus-within:bg-white focus-within:shadow-md'
                        : 'focus-within:ring-blue-400 focus-within:bg-white focus-within:shadow-md'
                    } ${errors.identity ? 'ring-2 ring-rose-400' : ''}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${
                        isGirl
                          ? 'bg-gradient-to-br from-purple-500 to-purple-700'
                          : 'bg-gradient-to-br from-blue-500 to-blue-700'
                      }`}
                    >
                      <User className="w-4 h-4" />
                    </div>

                    <input
                      type="text"
                      value={identity}
                      onChange={(e) => {
                        setIdentity(e.target.value);
                        if (errors.identity) setErrors((prev) => ({ ...prev, identity: undefined }));
                      }}
                      placeholder="Email or Username"
                      className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none"
                    />
                  </div>
                  {errors.identity && (
                    <p className="text-[11px] text-rose-500 mt-1 ml-4 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.identity}</span>
                    </p>
                  )}
                </div>

                {/* Pill Password Input */}
                <div>
                  <div
                    className={`relative flex items-center bg-[#F1F3F5] rounded-full p-1 transition-all focus-within:ring-2 ${
                      isGirl
                        ? 'focus-within:ring-purple-400 focus-within:bg-white focus-within:shadow-md'
                        : 'focus-within:ring-blue-400 focus-within:bg-white focus-within:shadow-md'
                    } ${errors.password ? 'ring-2 ring-rose-400' : ''}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${
                        isGirl
                          ? 'bg-gradient-to-br from-purple-500 to-purple-700'
                          : 'bg-gradient-to-br from-blue-500 to-blue-700'
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                    </div>

                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="Password"
                      className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        triggerSound('pop');
                        setShowPassword(!showPassword);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors mr-1 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-rose-500 mt-1 ml-4 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <div className="flex justify-end pr-2">
                  <button
                    type="button"
                    onClick={() => {
                      triggerSound('pop');
                      setShowForgotModal(true);
                    }}
                    className={`text-xs font-bold transition-colors cursor-pointer ${
                      isGirl ? 'text-[#7C3AED] hover:text-[#6D28D9]' : 'text-[#2563EB] hover:text-[#1D4ED8]'
                    }`}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* 3D Push Button: tactile 3D sound on press and disappearing bottom shadow */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onMouseDown={() => triggerSound('push')}
                    className={`w-full py-3 px-6 rounded-full text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-100 ${
                      isGirl
                        ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_5px_0_#6D28D9] active:translate-y-1 active:shadow-none'
                        : 'bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_5px_0_#1D4ED8] active:translate-y-1 active:shadow-none'
                    } ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Login</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Social Logins */}
                <div className="pt-2">
                  <div className="relative flex items-center justify-center my-2.5">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-[#F8F9FA] px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                      or continue with
                    </span>
                    <div className="border-t border-slate-200 w-full" />
                  </div>

                  <div className="flex items-center justify-center gap-3.5 pt-1">
                    {/* Google */}
                    <button
                      type="button"
                      onClick={() => handleSocialClick('google')}
                      aria-label="Login with Google"
                      className="w-11 h-11 rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center border border-slate-100 cursor-pointer"
                    >
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </button>

                    {/* Apple */}
                    <button
                      type="button"
                      onClick={() => handleSocialClick('apple')}
                      aria-label="Login with Apple"
                      className="w-11 h-11 rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center border border-slate-100 cursor-pointer"
                    >
                      <svg className="w-4.5 h-4.5 fill-slate-900" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-1.99.6-2.63 1.35-.58.67-1.08 1.74-.95 2.78 1.01.08 2.05-.51 2.66-1.26z" />
                      </svg>
                    </button>

                    {/* Facebook */}
                    <button
                      type="button"
                      onClick={() => handleSocialClick('facebook')}
                      aria-label="Login with Facebook"
                      className="w-11 h-11 rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center border border-slate-100 cursor-pointer"
                    >
                      <svg className="w-4.5 h-4.5 fill-[#1877F2]" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-xs text-slate-500 font-medium">
                    Don’t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        triggerSound('pop');
                        showToast('Sign up form would open next in this flow!');
                      }}
                      className={`font-bold transition-colors cursor-pointer ${
                        isGirl ? 'text-[#7C3AED] hover:text-[#6D28D9]' : 'text-[#2563EB] hover:text-[#1D4ED8]'
                      }`}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Demo Helper Pill */}
        <div className="mt-3 text-center">
          <button
            onClick={() => {
              triggerSound('pop');
              setIdentity(isGirl ? 'luna.kitten@example.com' : 'leo.doggo@example.com');
              setPassword('adventure123');
              showToast('Filled in demo credentials!');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-slate-600 text-xs font-semibold shadow-sm transition-all border border-white/60 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Use Demo {isGirl ? 'Girl' : 'Boy'} Account</span>
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-800">Reset Password</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your registered username or email to receive a recovery link.
              </p>
              <input
                type="text"
                placeholder="Enter email or username"
                defaultValue={identity}
                className="w-full mt-3 px-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    triggerSound('pop');
                    setShowForgotModal(false);
                  }}
                  className="flex-1 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerSound('chime');
                    setShowForgotModal(false);
                    showToast('Password recovery instructions sent to your email!');
                  }}
                  className={`flex-1 py-2 text-xs font-bold text-white rounded-xl shadow-md cursor-pointer ${
                    isGirl ? 'bg-purple-600' : 'bg-blue-600'
                  }`}
                >
                  Send Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 z-50 px-5 py-3 rounded-full bg-slate-900/95 text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-slate-700 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginScreen;
