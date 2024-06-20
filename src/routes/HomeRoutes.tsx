import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MasterLayout from '../layouts/MasterLayout';
import { HomePage } from 'pages/HomePage';

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};
