import React from 'react';

type HeadItemProps = {
  children: React.ReactNode;
  number_notif?: number;
};

const HeadItem = ({ children, number_notif }: HeadItemProps) => {
  return (
    <div className="p-[6px] rounded-lg bg-alice_blue h-fit relative">
      {number_notif && (
        <div className="px-[4px] bg-red-600 rounded-[5px] absolute top-[-4px] right-[-2px]">
          <p className="text-[9px] text-white">{number_notif}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default HeadItem;
