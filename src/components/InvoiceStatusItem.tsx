import React from 'react';

type InvoiceStatusItemProps = {
  status: string;
};

const InvoiceStatusItem = ({ status }: InvoiceStatusItemProps) => {
  return (
    <div
      className={`rounded-md text-center py-2 px-3 ${
        status === 'Drafts'
          ? 'bg-cosmic_latte'
          : status === 'Paid'
          ? 'bg-aero_blue'
          : 'bg-lavender_blush'
      }`}
    >
      <p className="font-bold text-primary">{status}</p>
    </div>
  );
};

export default InvoiceStatusItem;
