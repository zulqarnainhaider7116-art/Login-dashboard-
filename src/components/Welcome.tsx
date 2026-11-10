import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Crown, Sparkles, ArrowRight, Cat, Dog, Volume2, VolumeX } from 'lucide-react';
import useSound from 'use-sound';
import girlImg from '../assets/girl.png';
import boyImg from '../assets/boy.png';
import { useGender } from '../context/GenderContext';
import { POP_SOUND_URI, CHIME_SOUND_URI, soundManager } from '../utils/sound-effects';

export interface WelcomeProps {
  onSelectGender?: (gender: 'boy' | 'girl') => void;
}

export const Welcome: React.FC<WelcomeProps> = () => {
  const navigate = useNavigate();
  const { gender, setGender, soundEnabled, toggleSound } = useGender();

  // Integrated 'use-sound' library hooks for cheerful tactile sound effects
  const [playPop] = useSound(POP_SOUND_URI, { volume: 0.5, soundEnabled });
  const [playChime] = useSound(CHIME_SOUND_URI, { volume: 0.7, soundEnabled });

  const triggerPop = () => {
    if (soundEnabled) {
      try {
        playPop();
      } catch {
        // Fallback to Web Audio synthesizer
      }
      soundManager.playPop();
    }
  };

  const handleSelect = (selectedGender: 'boy' | 'girl') => {
    if (soundEnabled) {
      try {
        playChime();
      } catch {
        // Fallback
      }
      soundManager.playChime();
    }
    setGender(selectedGender);
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FAF5FF] via-[#F8FAFC] to-[#EFF6FF] text-slate-800 flex flex-col justify-between p-4 sm:p-6 md:p-10 relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between relative z-20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 text-white flex items-center justify-center shadow-md shadow-purple-500/20 font-black text-lg">
            3D
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
              BuddyAuth
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Interactive 3D Characters
            </span>
          </div>
        </div>

        {/* Tactile Sound Toggle */}
        <button
          onClick={() => {
            toggleSound();
            if (!soundEnabled) {
              soundManager.playPop();
            }
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
            soundEnabled
              ? 'bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200'
              : 'bg-white/80 hover:bg-white text-slate-500 border border-slate-200'
          }`}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>Sound: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Sound: MUTED</span>
            </>
          )}
        </button>
      </header>

      {/* Main Selection Area */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center py-4 sm:py-8 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-slate-100 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">
              Choose Your Companion
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-display">
            Welcome to Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
              3D Journey
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2.5 font-medium leading-relaxed">
            Select your character to experience personalized themes, uncropped 3D companions, and tactile 3D buttons.
          </p>
        </motion.div>

        {/* Two Large Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Card 1: Girls */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onMouseEnter={triggerPop}
            onClick={() => handleSelect('girl')}
            className={`group relative rounded-[40px] p-6 sm:p-7 cursor-pointer transition-all duration-300 bg-gradient-to-b from-white to-[#FDF4FF] border-2 shadow-xl hover:shadow-2xl ${
              gender === 'girl'
                ? 'border-purple-500 ring-4 ring-purple-300/40 shadow-purple-200'
                : 'border-purple-100 hover:border-purple-300 shadow-slate-200/50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-xs">
                <Heart className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                <span>Girls Theme</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Cat className="w-4 h-4" />
              </div>
            </div>

            {/* FULL UNCROPPED Character Illustration with Continuous Float */}
            <div className="w-full rounded-[28px] overflow-hidden bg-gradient-to-b from-[#FAF5FF] to-[#F3E8FF] p-2 sm:p-3 relative mb-5 shadow-inner border border-white">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full flex items-center justify-center"
              >
                <img
                  src={girlImg}
                  alt="Girl and Cat 3D Character"
                  className="w-full h-auto max-h-[220px] object-contain rounded-2xl filter drop-shadow-md transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 group-hover:text-purple-700 transition-colors">
              Sweet & Cozy World
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              Hang out with Mimi the cute kitten, warm lavender room vibes, and soothing purple 3D push buttons.
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect('girl');
              }}
              className="w-full py-3.5 px-5 rounded-full text-white font-bold text-sm tracking-wide bg-gradient-to-r from-[#9370DB] to-[#7C3AED] hover:from-[#8A2BE2] hover:to-[#6D28D9] shadow-3d-purple flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Enter Girls World</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 2: Boys */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onMouseEnter={triggerPop}
            onClick={() => handleSelect('boy')}
            className={`group relative rounded-[40px] p-6 sm:p-7 cursor-pointer transition-all duration-300 bg-gradient-to-b from-white to-[#F0F9FF] border-2 shadow-xl hover:shadow-2xl ${
              gender === 'boy'
                ? 'border-blue-500 ring-4 ring-blue-300/40 shadow-blue-200'
                : 'border-blue-100 hover:border-blue-300 shadow-slate-200/50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                <Crown className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                <span>Boys Theme</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Dog className="w-4 h-4" />
              </div>
            </div>

            {/* FULL UNCROPPED Character Illustration with Continuous Float */}
            <div className="w-full rounded-[28px] overflow-hidden bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE] p-2 sm:p-3 relative mb-5 shadow-inner border border-white">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full flex items-center justify-center"
              >
                <img
                  src={boyImg}
                  alt="Boy and Dog 3D Character"
                  className="w-full h-auto max-h-[220px] object-contain rounded-2xl filter drop-shadow-md transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
              Adventure & Gaming World
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              Explore with Buddy the happy puppy dog, gaming and gadget room vibes, and royal blue 3D push buttons.
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect('boy');
              }}
              className="w-full py-3.5 px-5 rounded-full text-white font-bold text-sm tracking-wide bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] shadow-3d-blue flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Enter Boys World</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto pt-6 text-center text-xs text-slate-400 font-medium relative z-20">
        <span>© 2026 BuddyAuth · 3D Tactile Sound Experience</span>
      </footer>
    </div>
  );
};

export default Welcome;
