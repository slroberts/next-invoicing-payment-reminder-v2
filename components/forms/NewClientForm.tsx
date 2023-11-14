'use client';
import { FC, useState } from 'react';
import { IClient } from '@/lib/interfaces/interfaces';
import { createNewClient } from '@/lib/api';
import { formatPhoneNumber } from '@/lib/utils';
import useError from '@/hooks/useError';
import useLoading from '@/hooks/useLoading';
import useModal from '@/hooks/useModal';
import FormModal from '@/components/forms/FormModal';
import { Plus } from 'react-feather';

interface NewClientFormProps {
  client?: IClient;
}

const NewClientForm: FC<NewClientFormProps> = () => {
  const [client, setClient] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  const [isOpen, openModal, closeModal] = useModal(false);
  const [isLoading, setIsLoading] = useLoading(false);
  const [error, setError] = useError('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!client) {
      setError('Please enter client fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await createNewClient({
        name: client.name,
        address: client.address,
        email: client.email,
        phoneNumber: client.phoneNumber,
      });
      closeModal();
      location.reload();
    } catch (error) {
      setError('Error adding client. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Client Name',
      type: 'text',
      placeholder: 'ex. Company or Client Name',
      value: client.name,
      setValue: (value: string) => setClient({ ...client, name: value }),
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'ex. 123 Street, City, State, 12345',
      value: client.address,
      setValue: (value: string) => setClient({ ...client, address: value }),
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'ex. name@company.com',
      value: client.email,
      setValue: (value: string) => setClient({ ...client, email: value }),
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'ex. 000-000-0000',
      value: formatPhoneNumber(client.phoneNumber),
      setValue: (value: string) => setClient({ ...client, phoneNumber: value }),
    },
  ];

  return (
    <>
      <div className='cursor-pointer' onClick={openModal}>
        <div className='flex gap-2 justify-between items-center'>
          <h2 className='text-white text-lg font-medium'>Add client</h2>
          <div className='text-white'>
            <Plus />
          </div>
        </div>
        <p className='text-slate-200 text-sm mb-4'>
          Add a client to create an invoice
        </p>
      </div>

      <FormModal
        label='Add Client'
        fields={fields}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default NewClientForm;
