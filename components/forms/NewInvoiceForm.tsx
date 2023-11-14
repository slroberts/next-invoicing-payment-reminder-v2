'use client';
import { FC, useState, RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { createNewInvoice } from '@/lib/api';
import { IClient } from '@/lib/interfaces/interfaces';
import useError from '@/hooks/useError';
import useLoading from '@/hooks/useLoading';
import useModal from '@/hooks/useModal';
import FormModal from '@/components/forms/FormModal';
import { FilePlus } from 'react-feather';

interface NewInvoiceFormProps {
  client: IClient;
  label: string;
  modalRef?: RefObject<HTMLDivElement>;
  className?: string;
}

const NewInvoiceForm: FC<NewInvoiceFormProps> = ({
  client,
  label,
  modalRef,
  className,
}) => {
  const router = useRouter();
  const clientId = client.id;
  const [due, setDue] = useState('');
  const [isOpen, openModal, closeModal] = useModal(false);
  const [isLoading, setIsLoading] = useLoading(false);
  const [error, setError] = useError('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!due) {
      setError('Please enter a due date.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newInvoice = await createNewInvoice({
        due,
        clientId: clientId as string,
      });
      closeModal();
      router.replace(`/dashboard/client/invoice/${newInvoice.id}`);
    } catch (error) {
      setError('Error creating invoice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'due',
      label: 'Due Date',
      type: 'date',
      placeholder: '',
      value: due,
      setValue: (value: string) => setDue(value),
    },
  ];

  return (
    <div>
      <div className='hover:cursor-pointer' onClick={openModal}>
        <div className='flex w-max items-center transition-opacity hover:opacity-70'>
          <FilePlus className='w-[1.35rem] h-[1.35rem] text-blue-600' />
          <span className={`ml-1 ${className}`}>{label}</span>
        </div>
      </div>

      <FormModal
        label='Create Invoice'
        fields={fields}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
        isOpen={isOpen}
        onClose={closeModal}
        modalRef={modalRef}
      />
    </div>
  );
};

export default NewInvoiceForm;
