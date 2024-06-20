import React, { useEffect, useState } from 'react';
import { IoIosAddCircle, IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaCheck,
  FaDownload,
  FaEye,
  FaFilePdf,
  FaFilter,
  FaPrint
} from 'react-icons/fa';
import { TbMailFilled } from 'react-icons/tb';
import InvoiceStatusItem from 'components/InvoiceStatusItem';
import { IoCloseOutline } from 'react-icons/io5';
import Pagination from 'components/Pagination';

const fillterData = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Edit' },
  { id: 3, name: 'Inprogress' },
  { id: 4, name: 'Draft' }
];

const invoicesData = [
  {
    invoiceId: '000115',
    billedTo: 'Happy Pets LTD',
    invoiceDate: '12/01/2023',
    status: 'Drafts',
    vat: true
  },
  {
    invoiceId: '000116',
    billedTo: 'ItSolutions LTD',
    invoiceDate: '12/02/2023',
    status: 'Paid',
    vat: true
  },
  {
    invoiceId: '000117',
    billedTo: 'Toprecruters LTD',
    invoiceDate: '12/02/2023',
    status: 'Not paid',
    vat: true
  },
  {
    invoiceId: '000119',
    billedTo: 'St. Sofia school LTD',
    invoiceDate: '12/03/2023',
    status: 'Paid',
    vat: true
  },
  {
    invoiceId: '000120',
    billedTo: 'BGoil LTD',
    invoiceDate: '12/04/2023',
    status: 'Not paid',
    vat: true
  },
  {
    invoiceId: '000121',
    billedTo: 'Company LTD',
    invoiceDate: '12/04/2023',
    status: 'Paid',
    vat: true
  },
  {
    invoiceId: '000122',
    billedTo: 'ETLL LTD',
    invoiceDate: '12/04/2023',
    status: 'Drafts',
    vat: true
  },
  {
    invoiceId: '000315',
    billedTo: 'Happy Pets LTD',
    invoiceDate: '12/01/2023',
    status: 'Drafts',
    vat: true
  },
  {
    invoiceId: '002119',
    billedTo: 'St. Sofia school LTD',
    invoiceDate: '12/03/2023',
    status: 'Paid',
    vat: true
  },
  {
    invoiceId: '010120',
    billedTo: 'BGoil LTD',
    invoiceDate: '12/04/2023',
    status: 'Not paid',
    vat: true
  },
  {
    invoiceId: '030121',
    billedTo: 'Company LTD',
    invoiceDate: '12/04/2023',
    status: 'Paid',
    vat: true
  },
  {
    invoiceId: '100122',
    billedTo: 'ETLL LTD',
    invoiceDate: '12/04/2023',
    status: 'Drafts',
    vat: true
  },
  {
    invoiceId: '090315',
    billedTo: 'Happy Pets LTD',
    invoiceDate: '12/01/2023',
    status: 'Drafts',
    vat: true
  }
];

const Invoices = () => {
  const [filter, setFilter] = useState<string>('All');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(invoicesData.length / 10)
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;

  const handlePageChange = (page: number) => {
    navigate(`/invoices?page=${page}`);
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page, totalPages]);

  return (
    <div className="container text-primary flex flex-col gap-3">
      <div className="p-3 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {fillterData.map(data => {
              return (
                <div
                  key={data.id}
                  className={`p-2 rounded-md cursor-pointer ${
                    filter === data.name ? 'bg-alice_blue' : ''
                  }`}
                  onClick={() => {
                    setFilter(data.name);
                  }}
                >
                  <p className="text-[14px]">{data.name}</p>
                </div>
              );
            })}
          </div>
          <Link to={'/invoices/new'} className="primary-button">
            <IoIosAddCircle />
            <p>Create a new invoice</p>
          </Link>
        </div>
        <div className="mt-5 flex gap-5 select-style">
          <Select
            placeholder="All contractors"
            className="w-1/5"
            options={[
              { value: '1', label: 'Contractors 1' },
              { value: '2', label: 'Contractors 2' },
              { value: '3', label: 'Contractors 3' },
              { value: '4', label: 'Contractors 4' }
            ]}
          />
          <Select
            placeholder="VAT"
            className="w-1/5"
            options={[
              { value: '1', label: 'VAT 1' },
              { value: '2', label: 'VAT 2' },
              { value: '3', label: 'VAT 3' },
              { value: '4', label: 'VAT 4' }
            ]}
          />
          <div className="w-1/5 relative">
            <DatePicker
              selected={fromDate}
              onChange={(date: any) => setFromDate(date)}
              className="h-[38px] bg-alice_blue px-2 rounded-md w-full text-sm text-[#333333] placeholder:text-[#333333] outline-none"
              placeholderText="From"
            />
            <div className="absolute right-2 top-[10px]">
              <IoIosArrowDown className="text-[18px]" />
            </div>
          </div>
          <div className="w-1/5 relative">
            <DatePicker
              selected={toDate}
              onChange={(date: any) => setToDate(date)}
              className="h-[38px] bg-alice_blue px-2 rounded-md w-full text-sm text-[#333333] placeholder:text-[#333333] outline-none"
              placeholderText="To"
            />
            <div className="absolute right-2 top-[10px]">
              <IoIosArrowDown className="text-[18px]" />
            </div>
          </div>
          <Select
            placeholder="All statuses"
            className="w-1/5"
            options={[
              { value: '1', label: 'Statuse 1' },
              { value: '2', label: 'Statuse 2' },
              { value: '3', label: 'Statuse 3' },
              { value: '4', label: 'Statuse 4' }
            ]}
          />
          <div className="rounded-md p-2 bg-alice_blue flex gap-1 items-center">
            <p className="text-sm font-semibold">More</p>
            <FaFilter className="text-sm" />
          </div>
        </div>
      </div>
      <div className="p-3 bg-white rounded-xl">
        <div className="invoice-table-container">
          <table className="w-full invoice-table">
            <thead>
              <tr>
                <th className="w-[50px]">
                  <input type="checkbox" className="invoiceCheckbox" />
                </th>
                <th>Invoice ID</th>
                <th>Billed to</th>
                <th>Invoice Date</th>
                <th>Status</th>
                <th className="w-[80px]">VAT</th>
                <th className="w-[180px]">Export</th>
              </tr>
            </thead>
            <tbody className="hidden-scrollbar">
              {invoicesData.map(data => {
                return (
                  <tr key={data.invoiceId}>
                    <td className="w-[50px]">
                      <input type="checkbox" className="invoiceCheckbox" />
                    </td>
                    <td className="!font-bold">{data.invoiceId}</td>
                    <td>{data.billedTo}</td>
                    <td>{data.invoiceDate}</td>
                    <td>
                      <InvoiceStatusItem status={data.status} />
                    </td>
                    <td className="w-[80px]">
                      {data.vat ? (
                        <FaCheck className="text-primary opacity-50" />
                      ) : (
                        <IoCloseOutline className="text-red-600 opacity-50 text-xl" />
                      )}
                    </td>
                    <td className="w-[180px]">
                      <div className="flex gap-4 items-center">
                        <FaDownload className="cursor-pointer" />
                        <FaFilePdf className="cursor-pointer" />
                        <FaPrint className="cursor-pointer" />
                        <TbMailFilled className="cursor-pointer" />
                        <FaEye className="cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3 bg-white rounded-xl flex justify-between items-center">
        <div className="flex gap-2 items-center text-sm text-primary font-medium">
          <p>Show:</p>
          <Select
            className="select-style select-item-per-page"
            placeholder="10"
            options={[
              { value: 10, label: 10 },
              { value: 20, label: 20 },
              { value: 30, label: 30 },
              { value: 40, label: 40 }
            ]}
            onChange={(e: any) =>
              setTotalPages(Math.ceil(invoicesData.length / e.value))
            }
          />
          <p>per page</p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Invoices;
