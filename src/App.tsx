import React, { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { LoginScreen } from './components/LoginScreen';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialTheme = (params?.get('theme') || params?.get('gender')) === 'boy' ? 'boy' : 'girl';
  const initialScreen = params?.get('autostart') === '1' || params?.get('autostart') === 'true' ? 'login' : 'welcome';

  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login'>(initialScreen);
  const [gender, setGender] = useState<'boy' | 'girl'>(initialTheme);

  // Handle URL query parameters for deep linking and ultra-mode verification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    const themeParam = params.get('theme') || params.get('gender');

    if (themeParam === 'boy' || themeParam === 'girl') {
      setGender(themeParam);
    }

    if (autostart === '1' || autostart === 'true') {
      setCurrentScreen('login');
    }
  }, []);

  const handleSelectGender = (selected: 'boy' | 'girl') => {
    setGender(selected);
    setCurrentScreen('login');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleSwitchGender = (newGender: 'boy' | 'girl') => {
    setGender(newGender);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans select-none">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1"
          >
            <Welcome
              onSelectGender={handleSelectGender}
              selectedGender={gender}
            />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1"
          >
            <LoginScreen
              gender={gender}
              onBack={handleBackToWelcome}
              onSwitchGender={handleSwitchGender}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
