import React, { ReactNode } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';

type SlideBarItemProps = {
  icon: ReactNode;
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
            isActive ? 'bg-primary' : 'hover:bg-alice_blue'
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
            <div
              onClick={handleShowSubmenu}
              className="w-full flex justify-end"
            >
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
            isActive ? 'bg-primary' : 'hover:bg-alice_blue'
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
            <div
              onClick={handleShowSubmenu}
              className="w-full flex justify-end"
            >
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
