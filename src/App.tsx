import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GenderProvider } from './context/GenderContext';
import { Welcome } from './components/Welcome';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  return (
    <GenderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GenderProvider>
  );
}
