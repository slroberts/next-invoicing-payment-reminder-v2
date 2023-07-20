'use client';
import useError from '@/hooks/useError';
import useLoading from '@/hooks/useLoading';
import useModal from '@/hooks/useModal';
import { createNewItem } from '@/lib/api';
import { ItemProps } from '@/lib/interfaces/interfaces';
import { FC, useState } from 'react';
import { PlusCircle } from 'react-feather';
import FormModal from './FormModal';

const NewItemForm: FC<ItemProps> = ({ invoice, label }) => {
  const invoiceId = invoice?.id!;
  const [item, setItem] = useState({
    name: '',
    price: '',
    hours: '',
  });
  const [isOpen, openModal, closeModal] = useModal(false);
  const [isLoading, setIsLoading] = useLoading(false);
  const [error, setError] = useError('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item.name || !item.price || !item.hours) {
      setError('Please enter all item fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await createNewItem({
        name: item.name,
        price: Number(item.price),
        hours: Number(item.hours),
        invoiceId,
      });
      closeModal();
      location.reload();
    } catch (error) {
      setError('Error adding item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'ex. Item Name',
      value: item.name,
      setValue: (value: string) => setItem({ ...item, name: value }),
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      placeholder: 'ex. 0.00',
      value: item.price,
      setValue: (value: string) => setItem({ ...item, price: value }),
    },
    {
      name: 'hours',
      label: 'Hours',
      type: 'text',
      placeholder: 'ex. 0, 0.0 or 0.00',
      value: item.hours,
      setValue: (value: string) => setItem({ ...item, hours: value }),
    },
  ];

  return (
    <div>
      <div className='hover:cursor-pointer mb-4' onClick={openModal}>
        <div className='flex w-max items-center transition-opacity hover:opacity-70'>
          <PlusCircle className='w-[1.35rem] h-[1.35rem] text-blue-600' />
          <span className='ml-1'>{label}</span>
        </div>
      </div>

      <FormModal
        label='Add Item'
        fields={fields}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default NewItemForm;
