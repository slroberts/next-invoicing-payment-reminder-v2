'use client';
import { deleteClient } from '@/lib/api';
import { ClientProps } from '@/lib/interfaces/interfaces';
import { useState, useRef, useEffect, FC } from 'react';
import { MoreVertical, Trash2 } from 'react-feather';
import NewInvoiceForm from './NewInvoiceForm';
import EditClientForm from './EditClientForm';

const MoreDropDown: FC<ClientProps> = ({ client }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<any>(null);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const dropdownElement = dropdownRef.current;
    const modalElement = modalRef.current?.portal?.content;

    if (
      dropdownElement &&
      !dropdownElement.contains(event.target as Node) &&
      (!modalElement || !modalElement.contains(event.target as Node))
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteClient = async () => {
    try {
      if (client?.id) {
        await deleteClient(client.id);
        location.reload();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div id='more-dropdown'>
      <button onClick={toggleDropdown}>
        <MoreVertical className='text-slate-500' />
      </button>
      <div ref={dropdownRef}>
        {isOpen && (
          <div className='absolute -ml-14 bg-white p-2 divide divide-y border-solid border-slate-200 shadow-md rounded-sm'>
            {/* Dropdown Content */}
            <div id='new-invoice' className='py-2 scale-90'>
              <NewInvoiceForm
                client={client}
                label='New Invoice'
                modalRef={modalRef}
              />
            </div>
            <div id='edit-client' className='py-2 scale-90'>
              <EditClientForm
                client={client}
                label='Edit Client'
                modalRef={modalRef}
              />
            </div>
            <div
              id='delete-client'
              onClick={handleDeleteClient}
              className='py-2 scale-90 flex w-max items-center hover:cursor-pointer  transition-opacity hover:opacity-70'
            >
              <Trash2 className='w-[1.35rem] h-[1.35rem] text-blue-600' />
              <span className='ml-1'>Delete Client</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreDropDown;
