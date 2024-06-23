import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMoneyBillWave, FaRegCalendarAlt } from 'react-icons/fa';
import { HiReceiptTax } from 'react-icons/hi';
import { FaPercent } from 'react-icons/fa6';
import { Invoice, InvoiceItem } from 'types/Invoices.type';
import { IoIosAddCircle } from 'react-icons/io';
import AddInvoiceItemPopup from 'components/AddInvoiceItemPopup';
import { useInvoices } from 'contexts/InvoicesContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';

const InvoicesAdd = () => {
  const { invoiceItems, addInvoice, updateInvoiceItem } = useInvoices();
  const [invoiceDate, setInvoiceDate] = useState<Date>();
  const [invoiceItemSelect, setInvoiceItemSelect] = useState<InvoiceItem[]>([]);
  const [dueDate, setDueDate] = useState<Date>();
  const [showInvoicePopup, setShowInvoicePopup] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showSubmitDraftModal, setShowSubmitDraftModal] =
    useState<boolean>(false);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    trigger,
    clearErrors,
    formState: { errors }
  } = useForm<any>({
    mode: 'onChange'
  });

  const handleCheckAll = (checked: boolean) => {
    const checkboxes = document.querySelectorAll('.invoiceCheckbox');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = checked;
    });

    if (checked) {
      setInvoiceItemSelect(invoiceItems);
    } else {
      setInvoiceItemSelect([]);
    }
  };

  const onSubmit = (data: Invoice) => {
    if (!data.status || !invoiceDate || !dueDate) {
      if (!data.status) {
        setError('status', {
          type: 'required',
          message: 'Please select status'
        });
        toast.error('Please select status', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }

      if (!invoiceDate) {
        setError('invoiceDate', {
          type: 'required',
          message: 'Please select status'
        });
        toast.error('Please select invoice date', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }

      if (!dueDate) {
        setError('dueDate', {
          type: 'required',
          message: 'Please select due date'
        });
        toast.error('Please select due date', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }

      setShowSubmitModal(false);
      return;
    }

    const invoiceData = {
      invoiceId: data.invoiceId,
      billedTo: data.billedTo,
      invoiceDate: moment(invoiceDate).format('DD/MM/YYYY'),
      dueDate: moment(dueDate).format('DD/MM/YYYY'),
      status: data.status,
      vat: data.vat,
      invoiceItems: invoiceItemSelect,
      description: data.description
    };

    addInvoice(invoiceData);
    setShowSubmitModal(false);
    navigate('/invoices');
    updateInvoiceItem([]);
    toast.success('Invoice added successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const onError = (errors: any) => {
    const status = getValues('status');
    if (!status && !errors.status) {
      setError('status', {
        type: 'required',
        message: 'Please select status'
      });
      toast.error('Please select status', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    if (!invoiceDate && !errors.invoiceDate) {
      setError('invoiceDate', {
        type: 'required',
        message: 'Please select status'
      });
      toast.error('Please select invoice date', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    if (!dueDate && !errors.dueDate) {
      setError('dueDate', {
        type: 'required',
        message: 'Please select status'
      });
      toast.error('Please select due date', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    for (const key in errors) {
      const messageError = `${errors[key].message}`;
      toast.error(messageError || 'Có lỗi, vui lòng kiểm tra lại!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    setShowSubmitModal(false);
  };

  const handleChooseInvoiceItem = (item: InvoiceItem) => {
    const index = invoiceItemSelect?.findIndex(
      (invoiceItem: InvoiceItem) => invoiceItem.id === item.id
    );
    if (index === -1) {
      setInvoiceItemSelect([...invoiceItemSelect, item]);
    } else {
      const _invoiceItemSelect = [...invoiceItemSelect];
      _invoiceItemSelect.splice(index, 1);
      setInvoiceItemSelect(_invoiceItemSelect);
    }
  };

  useEffect(() => {
    const totalTax = invoiceItemSelect.reduce((acc, item) => acc + item.tax, 0);
    const totalAmount = invoiceItemSelect.reduce(
      (acc, item) => acc + item.caculatedPrice,
      0
    );
    setTotalTax(totalTax);
    setTotalAmount(totalAmount);
  }, [invoiceItemSelect]);

  return (
    <div className="container text-primary flex flex-col gap-3 relative">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="p-5 bg-white rounded-xl flex gap-5 flex-wrap select-style"
        noValidate
      >
        <div className="w-[calc(33.33%-13.67px)]">
          <input
            type="number"
            className="invoice-input w-full placeholder:text-[#474646] placeholder:opacity-80"
            placeholder="Document number"
            {...register('invoiceId', {
              required: 'Please enter document number',
              onChange: () => {
                trigger('invoiceId');
              }
            })}
          />
          <span className="text-red-error text-xs">
            {errors?.invoiceId?.message as string}
          </span>
        </div>
        <div className="w-[calc(33.33%-13.67px)]">
          <input
            type="text"
            className="invoice-input w-full placeholder:text-[#474646] placeholder:opacity-80"
            placeholder="Billed to"
            {...register('billedTo', {
              required: 'Please enter billed to',
              setValueAs: (value: string) => value?.trim(),
              onChange: () => {
                trigger('billedTo');
              }
            })}
          />
          <span className="text-red-error text-xs">
            {errors?.billedTo?.message as string}
          </span>
        </div>
        <div className="w-[calc(33.33%-13.67px)]">
          <input
            type="number"
            className="invoice-input w-full placeholder:text-[#474646] placeholder:opacity-80"
            placeholder="VAT"
            {...register('vat', {
              required: 'Please enter vat',
              onChange: () => {
                trigger('vat');
              }
            })}
          />
          <span className="text-red-error text-xs">
            {errors?.vat?.message as string}
          </span>
        </div>

        <div className="w-[calc(33.33%-13.67px)]">
          <Select
            placeholder="Status"
            options={[
              { value: 'Paid', label: 'Paid' },
              { value: 'Not Paid', label: 'Not Paid' },
              { value: 'Late', label: 'Late' },
              { value: 'Draft', label: 'Draft' }
            ]}
            onChange={(e: any) => {
              setValue('status', e.value);
              trigger('status');
              clearErrors('status');
            }}
          />
          <span className="text-red-error text-xs">
            {errors?.status?.message as string}
          </span>
        </div>
        <div className="w-[calc(33.33%-13.67px)]">
          <div className="relative">
            <DatePicker
              selected={invoiceDate}
              onChange={(date: any) => {
                setInvoiceDate(date);
                setValue('invoiceDate', date);
              }}
              className="h-[38px] bg-alice_blue px-2 rounded-md w-full text-sm text-[#333333] placeholder:text-[#333333] placeholder:opacity-80 outline-none"
              placeholderText="Invoice date"
            />
            <div className="absolute right-2 top-[12px]">
              <FaRegCalendarAlt className="text-[14px] text-primary" />
            </div>
          </div>
          <span className="text-red-error text-xs">
            {errors?.invoiceDate?.message as string}
          </span>
        </div>
        <div className="w-[calc(33.33%-13.67px)]">
          <div className="relative">
            <DatePicker
              selected={dueDate}
              onChange={(date: any) => {
                setDueDate(date);
                setValue('dueDate', date);
                clearErrors('dueDate');
              }}
              className="h-[38px] bg-alice_blue px-2 rounded-md w-full text-sm text-[#333333] placeholder:text-[#333333] placeholder:opacity-80 outline-none"
              placeholderText="Due date"
            />
            <div className="absolute right-2 top-[12px]">
              <FaRegCalendarAlt className="text-[14px] text-primary" />
            </div>
          </div>
          <span className="text-red-error text-xs">
            {errors?.dueDate?.message as string}
          </span>
        </div>
        <div className="w-full">
          <textarea
            className="invoice-input w-full !h-[120px] resize-none placeholder:text-[#474646] placeholder:opacity-80"
            placeholder="Description"
            {...register('description', {
              required: 'Please enter description',
              onChange: () => {
                trigger('description');
              }
            })}
          />
          <span className="text-red-error text-xs">
            {errors?.description?.message as string}
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl flex justify-between fixed bottom-8 right-5 left-[calc(19vw+20px)]">
          <div className="flex text-sm items-center">
            <div className="pr-5 flex gap-3 h-fit py-1">
              <div className="flex items-center gap-[2px]">
                <HiReceiptTax />
                <p>Tax Base</p>
              </div>
              <p>{totalTax} BGN</p>
            </div>
            <div className="px-5 border-r-2 border-l-2 border-solid border-primary flex gap-3 h-fit py-1">
              <div className="flex items-center gap-[2px]">
                <FaPercent />
                VAT
              </div>
              <p>{getValues('vat') ? getValues('vat') : 0} BGN</p>
            </div>
            <div className="pl-5 flex gap-3 h-fit py-1">
              <div className="flex items-center gap-[2px] font-extrabold">
                <FaMoneyBillWave />
                Total
              </div>
              <p className="font-extrabold">{totalAmount} BGN</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="primary-button min-w-[130px] font-semibold"
              onClick={() => {
                setShowSubmitModal(true);
              }}
            >
              Save
            </button>
            <Link
              to={'/invoices'}
              className="min-w-[100px] bg-white text-primary text-sm font-semibold hover:bg-alice_blue p-2 rounded-lg text-center"
            >
              Cancel
            </Link>
          </div>
        </div>
        <Modal
          title="Save Invoice"
          description="Are you sure you want to save this invoice?"
          isShowPopup={showSubmitModal}
          onClose={() => {
            setShowSubmitModal(false);
          }}
          handleSubmit={() => {
            handleSubmit(onSubmit, onError)();
          }}
        />
        <Modal
          title="Save Invoice"
          description="Are you sure you want to save draft this invoice?"
          isShowPopup={showSubmitModal}
          onClose={() => {
            setShowSubmitModal(false);
          }}
          handleSubmit={() => {
            handleSubmit(onSubmit, onError)();
          }}
        />
      </form>
      <div className="p-3 bg-white rounded-xl">
        <button
          type="button"
          className="primary-button mb-5 mt-2"
          onClick={() => {
            setShowInvoicePopup(true);
          }}
        >
          <IoIosAddCircle />
          <p>Add invoice item</p>
        </button>
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
              {invoiceItems?.map((item: InvoiceItem, index: number) => {
                return (
                  <tr key={index}>
                    <td className="w-[50px]">
                      <input
                        type="checkbox"
                        className="invoiceCheckbox"
                        onChange={() => {
                          handleChooseInvoiceItem(item);
                        }}
                      />
                    </td>
                    <td className="w-[34vw]">{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.unitPrice} BGN</td>
                    <td>{item.caculatedPrice} BGN</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AddInvoiceItemPopup
        title={'Invoice item'}
        isShowPopup={showInvoicePopup}
        onClose={() => {
          setShowInvoicePopup(false);
        }}
      />
    </div>
  );
};

export default InvoicesAdd;
