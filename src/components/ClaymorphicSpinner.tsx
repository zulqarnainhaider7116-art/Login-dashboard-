import React from 'react';
import { motion } from 'motion/react';

export interface ClaymorphicSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'purple' | 'blue' | 'light';
  label?: string;
  className?: string;
}

/**
 * Custom 3D Claymorphic Loading Spinner
 * Features volumetric clay beads, specular gloss highlights,
 * dual inner ambient shadows, and a soft outer drop shadow.
 */
export const ClaymorphicSpinner: React.FC<ClaymorphicSpinnerProps> = ({
  size = 'md',
  variant = 'light',
  label,
  className = '',
}) => {
  const sizeMap = {
    sm: { container: 'w-6 h-6', bead: 'w-2 h-2', center: 'w-2.5 h-2.5', track: 'p-0.5' },
    md: { container: 'w-8 h-8', bead: 'w-2.5 h-2.5', center: 'w-3 h-3', track: 'p-1' },
    lg: { container: 'w-11 h-11', bead: 'w-3.5 h-3.5', center: 'w-4 h-4', track: 'p-1.5' },
  };

  const selectedSize = sizeMap[size];

  // Palette configurations for clay beads & specular highlights
  const colorMap = {
    purple: {
      trackBg: 'bg-purple-200/50',
      trackShadow: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(109,40,217,0.25)]',
      centerBg: 'bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]',
      bead1: 'bg-gradient-to-br from-[#E9D5FF] via-[#C084FC] to-[#7C3AED]',
      bead2: 'bg-gradient-to-br from-[#F472B6] via-[#EC4899] to-[#DB2777]',
      bead3: 'bg-gradient-to-br from-[#DDD6FE] via-[#A78BFA] to-[#6D28D9]',
      text: 'text-purple-700',
    },
    blue: {
      trackBg: 'bg-blue-200/50',
      trackShadow: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(29,78,216,0.25)]',
      centerBg: 'bg-gradient-to-br from-[#60A5FA] to-[#2563EB]',
      bead1: 'bg-gradient-to-br from-[#BAE6FD] via-[#60A5FA] to-[#1D4ED8]',
      bead2: 'bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1]',
      bead3: 'bg-gradient-to-br from-[#93C5FD] via-[#3B82F6] to-[#1E40AF]',
      text: 'text-blue-700',
    },
    light: {
      trackBg: 'bg-white/25',
      trackShadow: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.2)]',
      centerBg: 'bg-gradient-to-br from-white via-slate-100 to-slate-200',
      bead1: 'bg-gradient-to-br from-white via-purple-100 to-purple-300',
      bead2: 'bg-gradient-to-br from-white via-pink-100 to-pink-300',
      bead3: 'bg-gradient-to-br from-white via-sky-100 to-sky-300',
      text: 'text-white',
    },
  };

  const colors = colorMap[variant];

  return (
    <div className={`inline-flex items-center justify-center gap-2.5 ${className}`}>
      {/* 3D Clay Spinner Orbit */}
      <div
        className={`relative ${selectedSize.container} flex items-center justify-center rounded-full ${colors.trackBg} ${colors.trackShadow} backdrop-blur-xs`}
        style={{
          boxShadow:
            'inset 1.5px 1.5px 3px rgba(255,255,255,0.85), inset -1.5px -1.5px 3px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.12)',
        }}
      >
        {/* Pulsing center clay core with specular shine */}
        <motion.div
          animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className={`${selectedSize.center} rounded-full ${colors.centerBg} relative z-10`}
          style={{
            boxShadow:
              'inset 1px 1px 2px rgba(255,255,255,0.95), inset -1px -1px 2px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.15)',
          }}
        >
          {/* Specular clay highlight point */}
          <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/90 filter blur-[0.3px]" />
        </motion.div>

        {/* Orbiting Clay Beads Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Bead 1 (Top) */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0.5 ${selectedSize.bead} rounded-full ${colors.bead1} relative`}
            style={{
              boxShadow:
                'inset 1.5px 1.5px 2px rgba(255,255,255,0.95), inset -1.5px -1.5px 2px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <span className="absolute top-[15%] left-[20%] w-[35%] h-[35%] rounded-full bg-white/95" />
          </div>

          {/* Bead 2 (Bottom Right) */}
          <div
            className={`absolute bottom-0.5 right-0.5 ${selectedSize.bead} rounded-full ${colors.bead2} scale-90 relative`}
            style={{
              boxShadow:
                'inset 1.5px 1.5px 2px rgba(255,255,255,0.95), inset -1.5px -1.5px 2px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <span className="absolute top-[15%] left-[20%] w-[35%] h-[35%] rounded-full bg-white/95" />
          </div>

          {/* Bead 3 (Bottom Left) */}
          <div
            className={`absolute bottom-0.5 left-0.5 ${selectedSize.bead} rounded-full ${colors.bead3} scale-75 relative`}
            style={{
              boxShadow:
                'inset 1.5px 1.5px 2px rgba(255,255,255,0.95), inset -1.5px -1.5px 2px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <span className="absolute top-[15%] left-[20%] w-[35%] h-[35%] rounded-full bg-white/95" />
          </div>
        </motion.div>
      </div>

      {/* Optional tactile clay text */}
      {label && (
        <span className={`text-xs sm:text-sm font-extrabold tracking-wide drop-shadow-xs ${colors.text}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default ClaymorphicSpinner;
