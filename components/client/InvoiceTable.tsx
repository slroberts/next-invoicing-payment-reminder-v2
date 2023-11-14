'use client';
import { IInvoice } from '@/lib/interfaces/interfaces';
import usePagination from '@/hooks/usePagination';
import TableHeadings from '@/components/client/TableHeadings';
import TableRows from '@/components/client/TableRows';
import RowsPerPageDropdown from '@/components/client/RowsPerPageDropdown';
import InvoicePagination from '@/components/client/InvoicePagination';

const InvoiceTable = ({ invoices = [] }: { invoices: IInvoice[] }) => {
  const {
    currentPage,
    itemsPerPage,
    selectedItemsPerPage,
    currentInvoices,
    lastPage,
    sortDataBy,
    togglePopUp,
    popUpRef,
    isPopUpOpen,
    handleOptionClick,
    toFirstPage,
    toLastPage,
    nextPage,
    prevPage,
  } = usePagination(5, invoices);

  return (
    <>
      <div className='mt-4 w-full min-w-full divide-y divide-slate-700 border border-collapse border-slate-700'>
        <div className='hidden md:flex'>
          <TableHeadings sortDataBy={sortDataBy} />
        </div>
        <TableRows invoices={currentInvoices} />
      </div>
      <div className='w-full flex justify-end items-center py-4 text-slate-600'>
        <RowsPerPageDropdown
          popUpRef={popUpRef}
          togglePopUp={togglePopUp}
          itemsPerPage={itemsPerPage}
          isPopUpOpen={isPopUpOpen}
          selectedItemsPerPage={selectedItemsPerPage}
          handleOptionClick={handleOptionClick}
        />

        <InvoicePagination
          currentPage={currentPage}
          lastPage={lastPage}
          toFirstPage={toFirstPage}
          prevPage={prevPage}
          nextPage={nextPage}
          toLastPage={toLastPage}
        />
      </div>
    </>
  );
};

export default InvoiceTable;
