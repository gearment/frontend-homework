import MasterLayout from 'layouts/MasterLayout';
import Invoices from 'pages/Invoices';
import InvoicesAdd from 'pages/InvoicesAdd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const InvoicesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route index element={<Invoices />} />
      </Route>
      <Route path="/new" element={<MasterLayout />}>
        <Route index element={<InvoicesAdd />} />
      </Route>
    </Routes>
  );
};
