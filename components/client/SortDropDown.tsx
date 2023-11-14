'use client';
import React, { useState, useRef, useEffect, FC } from 'react';
import { IInvoice } from '@/lib/interfaces/interfaces';
import SortOption from '@/components/client/SortOption';
import { ArrowDown, ArrowUp } from 'react-feather';
import { ChevronDown, ChevronUp } from 'react-feather';

interface SortDropDownProps {
  data: { label: string; value: keyof IInvoice };
  sortDataBy: (value: keyof IInvoice, direction: 'asc' | 'desc') => void;
}

const SortDropDown: FC<SortDropDownProps> = ({ data, sortDataBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleSortDirection = (direction: 'asc' | 'desc') => {
    setSortDirection(direction);
    sortDataBy(data.value, direction);
    closeDropdown();
  };

  const renderSortDirectionIcons = () => (
    <>
      {sortDirection === 'asc' ? (
        <>
          <ArrowUp className='w-3 h-3' />
          <ChevronDown className='w-3 h-3' />
        </>
      ) : sortDirection === 'desc' ? (
        <>
          <ArrowDown className='w-3 h-3' />
          <ChevronUp className='w-3 h-3' />
        </>
      ) : (
        <>
          <ChevronUp className='w-3 h-3' />
          <ChevronDown className='w-3 h-3 -mt-1' />
        </>
      )}
    </>
  );

  return (
    <div id='more-dropdown'>
      <button onClick={toggleDropdown}>
        <div>{renderSortDirectionIcons()}</div>
      </button>
      <div ref={dropdownRef}>
        {isOpen && (
          <div className='absolute bg-white -ml-11 divide divide-y border-solid border-slate-200 shadow-md rounded-sm'>
            <SortOption
              direction='asc'
              onClick={() => toggleSortDirection('asc')}
              icon={<ArrowUp />}
            />
            <SortOption
              direction='desc'
              onClick={() => toggleSortDirection('desc')}
              icon={<ArrowDown />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropDown;
