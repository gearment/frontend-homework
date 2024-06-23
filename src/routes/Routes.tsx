import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeRoutes } from './HomeRoutes';
import { InvoicesRoutes } from './InvoicesRoutes';


const routes = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<HomeRoutes />} />
                <Route path="/invoices/*" element={<InvoicesRoutes />} />
            </Routes>
        </>
    );
};

export default routes;