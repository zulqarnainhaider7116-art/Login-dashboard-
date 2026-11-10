import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Crown,
  Sparkles,
  ArrowRight,
  Music,
  Headphones,
  Gamepad2,
  Cat,
  Dog,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import girlCharacter from '../assets/girl-character.png';
import boyCharacter from '../assets/boy-character.png';
import welcomeMusic from '../assets/welcome-music.png';

export interface WelcomeProps {
  onSelectGender: (gender: 'boy' | 'girl') => void;
  selectedGender?: 'boy' | 'girl';
}

export const Welcome: React.FC<WelcomeProps> = ({
  onSelectGender,
  selectedGender,
}) => {
  const [hoveredCard, setHoveredCard] = useState<'boy' | 'girl' | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showMusicFeature, setShowMusicFeature] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#F8FAFC] to-[#EFF6FF] text-slate-800 flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Ambient 3D Clay Background Spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl" />
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

        {/* Ambient music toggle button inspired by Image 1 */}
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
            isPlayingMusic
              ? 'bg-pink-100 text-pink-600 border border-pink-200'
              : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
          }`}
          aria-label="Toggle ambient vibe"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-pink-500" />
              <span>Vibe: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Vibe: Muted</span>
            </>
          )}
        </button>
      </header>

      {/* Hero Content */}
      <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center items-center py-4 sm:py-6 relative z-10">
        {/* Title & Tagline */}
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
            Select your preferred character and theme. Each world comes with its own
            custom 3D pet companion, clay colors, and tactile animations.
          </p>
        </motion.div>

        {/* ========================================================
            THE TWO GENDER SELECTION CARDS
            One for Boys, One for Girls with gradients & soft shadows
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-3xl">
          {/* 1. GIRLS CARD */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onHoverStart={() => setHoveredCard('girl')}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => onSelectGender('girl')}
            className={`group relative rounded-[40px] p-6 sm:p-7 cursor-pointer transition-all duration-300 bg-gradient-to-b from-white to-[#FDF4FF] border-2 shadow-xl hover:shadow-2xl ${
              selectedGender === 'girl'
                ? 'border-purple-500 ring-4 ring-purple-300/40 shadow-purple-200'
                : 'border-purple-100 hover:border-purple-300 shadow-slate-200/50'
            }`}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-xs">
                <Heart className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                <span>Girls Theme</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Cat className="w-4 h-4" />
              </div>
            </div>

            {/* 3D Character Illustration Preview */}
            <div className="w-full h-52 sm:h-56 rounded-[28px] overflow-hidden bg-gradient-to-br from-[#EAE2F8] to-[#DDD2F3] relative mb-5 shadow-inner border border-white">
              <img
                src={girlCharacter}
                alt="Girl with Kitten 3D Character"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent pointer-events-none" />

              {/* Float Bubble */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold text-purple-800">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                <span>Mimi & Girl</span>
              </div>
            </div>

            {/* Content Details */}
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 group-hover:text-purple-700 transition-colors">
              Sweet & Cozy World
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              Lavender room aesthetic with Mimi the playful kitten, sweet heart
              motifs, and soothing purple tactile buttons.
            </p>

            {/* 3D Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectGender('girl');
              }}
              className="w-full py-3.5 px-5 rounded-full text-white font-bold text-sm tracking-wide bg-gradient-to-r from-[#9370DB] to-[#7C3AED] hover:from-[#8A2BE2] hover:to-[#6D28D9] shadow-3d-purple flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Enter Girls World</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* 2. BOYS CARD */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onHoverStart={() => setHoveredCard('boy')}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => onSelectGender('boy')}
            className={`group relative rounded-[40px] p-6 sm:p-7 cursor-pointer transition-all duration-300 bg-gradient-to-b from-white to-[#F0F9FF] border-2 shadow-xl hover:shadow-2xl ${
              selectedGender === 'boy'
                ? 'border-blue-500 ring-4 ring-blue-300/40 shadow-blue-200'
                : 'border-blue-100 hover:border-blue-300 shadow-slate-200/50'
            }`}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                <Crown className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                <span>Boys Theme</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Dog className="w-4 h-4" />
              </div>
            </div>

            {/* 3D Character Illustration Preview */}
            <div className="w-full h-52 sm:h-56 rounded-[28px] overflow-hidden bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] relative mb-5 shadow-inner border border-white">
              <img
                src={boyCharacter}
                alt="Boy with Puppy 3D Character"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent pointer-events-none" />

              {/* Float Bubble */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold text-blue-800">
                <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Buddy & Boy</span>
              </div>
            </div>

            {/* Content Details */}
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
              Adventure & Gaming World
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              Cozy study room with Buddy the happy puppy, golden crown accents,
              gaming vibes, and royal blue 3D buttons.
            </p>

            {/* 3D Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectGender('boy');
              }}
              className="w-full py-3.5 px-5 rounded-full text-white font-bold text-sm tracking-wide bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] shadow-3d-blue flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Enter Boys World</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Music that moves with you - Bonus Feature Banner inspired by attached Image 1 */}
        {showMusicFeature && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-3xl mt-8 rounded-3xl bg-white/90 border border-slate-200/70 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-md">
                <img
                  src={welcomeMusic}
                  alt="Music and sound vibes"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800">
                    Music that moves with you
                  </h4>
                  <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full">
                    Soundtrack Ready
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your vibe, your sound, your world. Enjoy custom ambient sounds as
                  you login.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onSelectGender('girl')}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs transition-colors"
              >
                Girls Vibe
              </button>
              <button
                onClick={() => onSelectGender('boy')}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition-colors"
              >
                Boys Vibe
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto pt-6 text-center text-xs text-slate-400 font-medium relative z-20">
        <span>© 2026 BuddyAuth · 3D Claymorphic Authentication Experience</span>
      </footer>
    </div>
  );
};

export default Welcome;
