'use client';
import { useState, useRef, useEffect, ReactNode, FC, RefObject } from 'react';
import { MoreVertical } from 'react-feather';

interface MoreDropDownProps {
  children: ReactNode;
  className?: string;
  modalRef?: RefObject<HTMLDivElement>;
}

const MoreDropDown: FC<MoreDropDownProps> = ({
  children,
  className,
  modalRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        (!modalRef ||
          (modalRef && !modalRef.current?.contains(event.target as Node)))
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
  }, [isOpen, modalRef]);

  return (
    <div id='more-dropdown'>
      <button onClick={toggleDropdown}>
        <MoreVertical className='text-slate-300' />
      </button>
      <div ref={dropdownRef} className='relative'>
        {isOpen && (
          <div
            className={`absolute right-0 bg-white p-2 divide divide-y border-solid border-slate-200 shadow-md rounded-sm ${className}`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreDropDown;
