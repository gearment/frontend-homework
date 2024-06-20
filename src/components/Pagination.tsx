import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === currentPage}
          className={`text-sm rounded-md w-[30px] h-[32px] ${
            i === currentPage
              ? 'bg-alice_blue'
              : 'border border-solid border-primary'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        <IoIosArrowDown className="text-[18px] rotate-90" />
      </button>
      {renderPageNumbers()}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <IoIosArrowDown className="text-[18px] -rotate-90" />
      </button>
    </div>
  );
};

export default Pagination;
