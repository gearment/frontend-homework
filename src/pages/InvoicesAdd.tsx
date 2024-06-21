import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMoneyBillWave, FaRegCalendarAlt } from 'react-icons/fa';
import { HiReceiptTax } from 'react-icons/hi';
import { FaPercent } from 'react-icons/fa6';

const InvoicesAdd = () => {
  const [invoiceDate, setInvoiceDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();

  const handleCheckAll = (checked: boolean) => {
    const checkboxes = document.querySelectorAll('.invoiceCheckbox');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = checked;
    });
  };

  return (
    <div className="container text-primary flex flex-col gap-3 relative">
      <div className="p-5 bg-white rounded-xl flex gap-5 flex-wrap select-style">
        <input
          type="number"
          className="invoice-input w-[calc(33.33%-20px)] placeholder:text-[#474646] placeholder:opacity-80"
          placeholder="Document number"
        />
        <Select
          placeholder="Document type"
          className="w-[calc(33.33%-20px)]"
          options={[
            { value: '1', label: 'Document type 1' },
            { value: '2', label: 'Document type 2' },
            { value: '3', label: 'Document type 3' },
            { value: '4', label: 'Document type 4' }
          ]}
        />
        <Select
          placeholder="Prepared"
          className="w-[calc(33.33%-20px)]"
          options={[
            { value: '1', label: 'Prepared 1' },
            { value: '2', label: 'Prepared 2' },
            { value: '3', label: 'Prepared 3' },
            { value: '4', label: 'Prepared 4' }
          ]}
        />
        <Select
          placeholder="Contractor"
          className="w-[calc(33.33%-20px)]"
          options={[
            { value: '1', label: 'Contractor 1' },
            { value: '2', label: 'Contractor 2' },
            { value: '3', label: 'Contractor 3' },
            { value: '4', label: 'Contractor 4' }
          ]}
        />
        <Select
          placeholder="Format"
          className="w-[calc(33.33%-20px)]"
          options={[
            { value: '1', label: 'Format 1' },
            { value: '2', label: 'Format 2' },
            { value: '3', label: 'Format 3' },
            { value: '4', label: 'Format 4' }
          ]}
        />
        <Select
          placeholder="Bank account"
          className="w-[calc(33.33%-20px)]"
          options={[
            { value: '1', label: 'Bank account 1' },
            { value: '2', label: 'Bank account 2' },
            { value: '3', label: 'Bank account 3' },
            { value: '4', label: 'Bank account 4' }
          ]}
        />
        <div className="w-[calc(33.33%-20px)] relative">
          <DatePicker
            selected={invoiceDate}
            onChange={(date: any) => setInvoiceDate(date)}
            className="h-[38px] bg-alice_blue px-2 rounded-md w-full text-sm text-[#333333] placeholder:text-[#333333] placeholder:opacity-80 outline-none"
            placeholderText="Invoice date"
          />
          <div className="absolute right-2 top-[12px]">
            <FaRegCalendarAlt className="text-[14px] text-primary" />
          </div>
        </div>
        <div className="w-[calc(33.33%-20px)] relative">
          <DatePicker
            selected={dueDate}
            onChange={(date: any) => setDueDate(date)}
            className="h-[38px] bg-alice_blue px-2 rounded-md w-full text-sm text-[#333333] placeholder:text-[#333333] placeholder:opacity-80 outline-none"
            placeholderText="Due date"
          />
          <div className="absolute right-2 top-[12px]">
            <FaRegCalendarAlt className="text-[14px] text-primary" />
          </div>
        </div>
        <Select
          placeholder="Payment"
          className="w-[calc(33.33%-20px)]"
          options={[
            { value: '1', label: 'Payment 1' },
            { value: '2', label: 'Payment 2' },
            { value: '3', label: 'Payment 3' },
            { value: '4', label: 'Payment 4' }
          ]}
        />
      </div>
      <div className="p-3 bg-white rounded-xl">
        <div className="invoice-table-container">
          <table className="w-full invoice-table invoice-add-table">
            <thead>
              <tr>
                <th className="w-[50px]">
                  <input
                    type="checkbox"
                    className="invoiceCheckbox"
                    onChange={e => handleCheckAll(e.target.checked)}
                  />
                </th>
                <th className="w-[34vw]">Detail</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="hidden-scrollbar">
              <tr>
                <td className="w-[50px]">
                  <input type="checkbox" className="invoiceCheckbox" />
                </td>
                <td className="w-[34vw]">Goodies</td>
                <td>1</td>
                <td>Pieces</td>
                <td>0 BGN</td>
                <td>0 BGN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3 bg-white rounded-xl flex justify-between fixed bottom-8 right-5 left-[calc(19vw+20px)]">
        <div className="flex text-sm items-center">
          <div className="pr-5 flex gap-3 h-fit py-1">
            <div className="flex items-center gap-[2px]">
              <HiReceiptTax />
              <p>Tax Base</p>
            </div>
            <p>0 BGN</p>
          </div>
          <div className="px-5 border-r-2 border-l-2 border-solid border-primary flex gap-3 h-fit py-1">
            <div className="flex items-center gap-[2px]">
              <FaPercent />
              VAT
            </div>
            <p>0 BGN</p>
          </div>
          <div className="pl-5 flex gap-3 h-fit py-1">
            <div className="flex items-center gap-[2px] font-extrabold">
              <FaMoneyBillWave />
              Total
            </div>
            <p className="font-extrabold">0 BGN</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="primary-button min-w-[130px] font-semibold">
            <p>Save</p>
          </button>
          <button className="secondary-button min-w-[130px]">
            <p>Save as a draft</p>
          </button>
          <button className="min-w-[100px] bg-white text-primary text-sm font-semibold hover:bg-alice_blue p-2 rounded-lg">
            <p>Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicesAdd;
