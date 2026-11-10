import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../utils/sound-effects';

export type Gender = 'boy' | 'girl';

interface GenderContextType {
  gender: Gender;
  setGender: (g: Gender) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export const GenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gender, setGenderState] = useState<Gender>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlGender = params.get('theme') || params.get('gender');
      if (urlGender === 'boy' || urlGender === 'girl') return urlGender;
      const saved = localStorage.getItem('selected_gender');
      if (saved === 'boy' || saved === 'girl') return saved;
    }
    return 'girl';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled');
      if (saved !== null) return saved === 'true';
    }
    return true; // Cheerful sounds enabled by default
  });

  useEffect(() => {
    soundManager.setMuted(!soundEnabled);
  }, [soundEnabled]);

  const setGender = (g: Gender) => {
    setGenderState(g);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected_gender', g);
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('sound_enabled', String(next));
      }
      soundManager.setMuted(!next);
      return next;
    });
  };

  return (
    <GenderContext.Provider value={{ gender, setGender, soundEnabled, toggleSound }}>
      {children}
    </GenderContext.Provider>
  );
};

export const useGender = () => {
  const context = useContext(GenderContext);
  if (!context) {
    return {
      gender: 'girl' as Gender,
      setGender: () => {},
      soundEnabled: true,
      toggleSound: () => {},
    };
  }
  return context;
};
