import React from 'react';
import Avatar from '../assets/avatar.png';
import { IoSearchSharp } from 'react-icons/io5';
import { IoMdNotifications } from 'react-icons/io';
import HeadItem from 'components/HeadItem';

const HeaderNav = () => {
  return (
    <div className="pl-5 pr-10 py-6 flex items-center justify-between">
      <h1 className="text-primary text-3xl font-semibold">Invoices</h1>
      <div className="flex gap-10 items-center">
        <div className="flex gap-4">
          <HeadItem>
            <IoSearchSharp className="text-glaucous" />
          </HeadItem>
          <HeadItem number_notif={8}>
            <IoMdNotifications className="text-glaucous" />
          </HeadItem>
        </div>
        <img src={Avatar} alt="Avatar" className="w-10 rounded-full" />
      </div>
    </div>
  );
};

export default HeaderNav;
