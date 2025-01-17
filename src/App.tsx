import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PlatformDetails } from './pages/PlatformDetails';
import { Leaderboard } from './pages/Leaderboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="platform/:id" element={<PlatformDetails />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}