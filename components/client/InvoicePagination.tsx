import { FC } from 'react';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'react-feather';

interface IInvoicePaginationProps {
  currentPage: number;
  lastPage: number;
  toFirstPage: () => void;
  prevPage: () => void;
  nextPage: () => void;
  toLastPage: () => void;
}

const InvoicePagination: FC<IInvoicePaginationProps> = ({
  currentPage,
  lastPage,
  toFirstPage,
  prevPage,
  nextPage,
  toLastPage,
}) => {
  return (
    <>
      <div className='mx-4 text-slate-300'>
        Page {currentPage} of {lastPage}
      </div>
      <button
        onClick={toFirstPage}
        disabled={currentPage === 1}
        className={`text-slate-300 disabled:text-slate-700`}
      >
        <ChevronsLeft />
      </button>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`text-slate-300 disabled:text-slate-700`}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextPage}
        disabled={currentPage === lastPage}
        className={`text-slate-300 disabled:text-slate-700`}
      >
        <ChevronRight />
      </button>
      <button
        onClick={toLastPage}
        disabled={currentPage === lastPage}
        className={`text-slate-300 disabled:text-slate-700`}
      >
        <ChevronsRight />
      </button>
    </>
  );
};

export default InvoicePagination;
