import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import Footer from './Footer';
import SideBar from './SideBar';

const MasterLayout = () => {
  return (
    <div className='flex'>
      <div className='w-[19vw] h-full'>
        <SideBar />
      </div>
      <div className="flex flex-col h-full flex-1">
        <header>
          <HeaderNav />
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default MasterLayout;
