import { useInvoices } from 'contexts/InvoicesContext';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { InvoiceItem } from 'types/Invoices.type';

type AddInvoiceItemPopupProp = {
  title: string;
  isShowPopup: boolean;
  onClose: () => void;
};

const AddInvoiceItemPopup = ({
  title,
  isShowPopup,
  onClose
}: AddInvoiceItemPopupProp) => {
  const { addInvoiceItem } = useInvoices();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors }
  } = useForm<any>({
    mode: 'onChange'
  });

  const onSubmit = (data: InvoiceItem) => {
    addInvoiceItem({
      id: Math.random().toString(36),
      name: data.name,
      quantity: Number(data.quantity),
      unit: data.unit,
      unitPrice: Number(data.unitPrice),
      caculatedPrice: Number(data.caculatedPrice),
      tax: Number(data.tax)
    });
    onClose();
    reset();
  };

  const onError = (errors: any) => {
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
  };

  return (
    <>
      {isShowPopup && (
        <div className="modal">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="bg-white max-w-[60vw] w-full h-[30vw] rounded-md p-5 flex flex-col gap-5"
            noValidate
          >
            <h2 className="text-2xl font-semibold text-center">{title}</h2>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="form-group w-1/2">
                  <label htmlFor="name" className="required">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="invoice-input"
                    placeholder="Billed to"
                    {...register('name', {
                      required: 'Please enter name of item',
                      setValueAs: (value: string) => value?.trim(),
                      onChange: () => {
                        trigger('name');
                      }
                    })}
                  />
                  <span className="text-red-error text-xs">
                    {errors?.name?.message as string}
                  </span>
                </div>
                <div className="form-group w-1/2">
                  <label htmlFor="quantity" className="required">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="invoice-input"
                    placeholder="Quantity"
                    {...register('quantity', {
                      required: 'Please enter quantity',
                      onChange: () => {
                        trigger('quantity');
                      }
                    })}
                  />
                  <span className="text-red-error text-xs">
                    {errors?.quantity?.message as string}
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="form-group w-1/2">
                  <label htmlFor="unit" className="required">
                    Unit
                  </label>
                  <input
                    type="text"
                    id="unit"
                    className="invoice-input"
                    placeholder="Unit"
                    {...register('unit', {
                      required: 'Please enter unit',
                      setValueAs: (value: string) => value?.trim(),
                      onChange: () => {
                        trigger('unit');
                      }
                    })}
                  />
                  <span className="text-red-error text-xs">
                    {errors?.unit?.message as string}
                  </span>
                </div>
                <div className="form-group w-1/2">
                  <label htmlFor="price" className="required">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="invoice-input"
                    placeholder="Price"
                    {...register('unitPrice', {
                      required: 'Please enter price',
                      onChange: () => {
                        trigger('unitPrice');
                        setValue(
                          'caculatedPrice',
                          parseFloat(getValues('quantity') || 0) *
                            parseFloat(getValues('unitPrice') || 0)
                        );
                      }
                    })}
                  />
                  <span className="text-red-error text-xs">
                    {errors?.price?.message as string}
                  </span>
                </div>
              </div>
              <div className="form-group w-[calc(50%-10px)]">
                <label htmlFor="tax" className="required">
                  Tax
                </label>
                <input
                  type="number"
                  id="tax"
                  className="invoice-input"
                  placeholder="Tax"
                  {...register('tax', {
                    required: 'Please enter tax',
                    onChange: () => {
                      trigger('tax');
                    }
                  })}
                />
                <span className="text-red-error text-xs">
                  {errors?.tax?.message as string}
                </span>
              </div>
            </div>
            <div className="flex justify-between flex-1 items-end">
              <div className="flex gap-3 h-fit py-1 font-extrabold">
                <div className="flex items-center gap-[6px] text-base">
                  <FaMoneyBillWave />
                  Total:
                </div>
                <p className="font-medium text-xl">
                  {getValues('caculatedPrice') || 0} BGN
                </p>
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="primary-button min-w-[130px] font-semibold"
                >
                  Save
                </button>
                <button
                  className="min-w-[100px] bg-white text-primary text-sm font-semibold hover:bg-alice_blue p-2 rounded-lg"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddInvoiceItemPopup;
