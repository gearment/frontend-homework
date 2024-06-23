import React, { useState } from 'react';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { FaHome, FaUser, FaDatabase, FaUsers } from 'react-icons/fa';
import { IoIosArrowUp, IoMdSettings } from 'react-icons/io';
import { RiFileCloseFill } from 'react-icons/ri';
import { FaFilePen, FaChartSimple } from 'react-icons/fa6';
import { HiInformationCircle } from 'react-icons/hi';
import SideBarItem from 'components/SideBarItem';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
  const [isShowInvoice, setIsShowInvoice] = useState(false);
  const location = useLocation();

  return (
    <div className="pl-10 pr-5">
      <div className="py-10">
        <div className="flex gap-2 items-center">
          <FaFileInvoiceDollar className="text-xl text-primary" />
          <p className="text-lg text-primary font-bold">Microinvoice</p>
        </div>
      </div>
      <div className="text-primary flex flex-col gap-8 text-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs px-4">Recent</p>
          <SideBarItem
            icon={<FaHome />}
            title="Home"
            isActive={location.pathname === '/'}
            url="/"
          />
          <SideBarItem
            icon={<FaFileInvoiceDollar />}
            title="Invoices"
            isMultiple
            handleShowSubmenu={() => setIsShowInvoice(!isShowInvoice)}
            isActive={location.pathname === '/invoices'}
            isOpen={isShowInvoice}
            url="/invoices"
            childActive={
              location.pathname === '/invoices/new' ||
              location.pathname === '/invoices/edit'
            }
          />
          {isShowInvoice && (
            <>
              <div>
                <SideBarItem
                  icon={<RiFileCloseFill />}
                  title="Create new"
                  isActive={location.pathname === '/invoices/new'}
                  url="/invoices/new"
                  className="px-5"
                />
                <SideBarItem
                  icon={<FaFilePen />}
                  title="Edit"
                  isActive={location.pathname === '/invoices/edit'}
                  url="/invoices/edit"
                  className="px-5"
                />
              </div>
            </>
          )}
          <SideBarItem icon={<FaUser />} title="Contractors" isMultiple />
          <SideBarItem icon={<FaDatabase />} title="Products and Services" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs px-4">Orthers</p>
          <SideBarItem icon={<FaUsers />} title="Users" />
          <SideBarItem icon={<FaChartSimple />} title="Statistics" />
          <div className="flex flex-col gap-2 mt-4">
            <SideBarItem icon={<IoMdSettings />} title="Settings" />
            <SideBarItem icon={<HiInformationCircle />} title="Help" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
