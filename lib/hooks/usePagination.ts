import { useState, useEffect, useRef } from 'react';
import { IInvoice } from '../interfaces/interfaces';
import useSortTableData from './useSortTableData';

const usePagination = (
  initialItemsPerPage: number,
  initialInvoices: IInvoice[]
) => {
  const { sortedData: sortedInvoices, sortDataBy } =
    useSortTableData(initialInvoices);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [selectedItemsPerPage, setSelectedItemsPerPage] =
    useState(itemsPerPage);
  const lastPage = Math.ceil(sortedInvoices.length / itemsPerPage);

  const indexOfLastInvoice = currentPage * itemsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
  const currentInvoices = sortedInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const popUpRef = useRef<HTMLDivElement | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    const maxPage = Math.ceil(sortedInvoices.length / itemsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }

    const handleClickOutside = (event: MouseEvent) => {
      // Ensure that the event target is an HTMLElement
      const target = event.target as HTMLElement;

      if (
        popUpRef.current &&
        (!target.classList || !target.classList.contains('popup-option')) &&
        !popUpRef.current.contains(target)
      ) {
        setIsPopUpOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentPage, itemsPerPage, sortedInvoices]);

  const handleOptionClick = (option: number) => {
    setItemsPerPage(option);
    setSelectedItemsPerPage(option);
    setCurrentPage(1);
    setIsPopUpOpen(false);
  };

  const togglePopUp = () => {
    setIsPopUpOpen((prevIsPopUpOpen) => !prevIsPopUpOpen);
  };

  const toFirstPage = () => {
    setCurrentPage(1);
  };

  const toLastPage = () => {
    setCurrentPage(lastPage);
  };

  const nextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
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
  };
};

export default usePagination;
