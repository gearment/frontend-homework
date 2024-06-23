import React from 'react';

type ModalProps = {
  title: string;
  description: string;
  isShowPopup: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const Modal = ({
  title,
  isShowPopup,
  description,
  onClose,
  handleSubmit
}: ModalProps) => {
  return (
    <>
      {isShowPopup && (
        <div className="modal">
          <div className="bg-white max-w-[32vw] w-full h-[12vw] rounded-md p-5 flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-center">{title}</h2>
            <p className="text-center">{description}</p>
            <div className="flex items-end justify-end gap-2 flex-1">
              <button
                type="submit"
                className="primary-button min-w-[130px] font-semibold"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                className="min-w-[100px] bg-white text-primary text-sm font-semibold hover:bg-alice_blue p-2 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
