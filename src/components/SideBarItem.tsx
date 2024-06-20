import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';

type SlideBarItemProps = {
  icon: React.ReactNode;
  title: string;
  url?: string;
  isActive?: boolean;
  isMultiple?: boolean;
  className?: string;
  isOpen?: boolean;
  childActive?: boolean;
  handleShowSubmenu?: () => void;
};

const SideBarItem = ({
  icon,
  title,
  url,
  isMultiple,
  isActive,
  className,
  isOpen,
  childActive,
  handleShowSubmenu
}: SlideBarItemProps) => {
  return (
    <>
      {!url ? (
        <div
          className={`flex justify-between items-center py-2 px-4 cursor-pointer rounded-lg ${className} ${
            isActive ? 'bg-primary' : ''
          }`}
        >
          <div
            className={`flex gap-[6px] items-center ${
              isActive ? 'text-white' : 'text-glaucous'
            } ${childActive ? 'text-primary' : ''}`}
          >
            {icon}
            <p
              className={`text-primary ${
                isActive ? 'font-bold text-white' : ''
              } ${childActive ? 'font-bold' : ''}`}
            >
              {title}
            </p>
          </div>
          {isMultiple && (
            <div onClick={handleShowSubmenu}>
              <IoIosArrowUp
                className={`text-primary text-lg font-semibold ${
                  isOpen ? '' : 'rotate-180'
                } ${isActive ? ' text-white' : ''}`}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex justify-between items-center py-2 px-4 rounded-lg ${
            isActive ? 'bg-primary' : ''
          }`}
        >
          <Link
            to={url}
            className={`flex gap-[6px] items-center ${className} ${
              isActive ? 'text-white' : 'text-glaucous'
            } ${childActive ? 'text-primary' : ''}`}
          >
            {icon}
            <p
              className={`text-primary ${
                isActive ? 'font-bold text-white' : ''
              } ${childActive ? 'font-bold' : ''}`}
            >
              {title}
            </p>
          </Link>
          {isMultiple && (
            <div onClick={handleShowSubmenu}>
              <IoIosArrowUp
                className={`text-primary text-lg font-semibold ${
                  isOpen ? '' : 'rotate-180'
                } ${isActive ? ' text-white' : ''}`}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SideBarItem;
