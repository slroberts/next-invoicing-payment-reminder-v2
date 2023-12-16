'use client';
import { FC, RefObject, useState } from 'react';
import { IClient } from '@/lib/interfaces/interfaces';
import { editClient } from '@/lib/api';
import { formatPhoneNumber } from '@/lib/utils';
import useError from '@/hooks/useError';
import useLoading from '@/hooks/useLoading';
import useModal from '@/hooks/useModal';
import FormModal from '@/components/forms/FormModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Edit3 } from 'react-feather';

interface EditClientProps {
  client: IClient;
  label: string;
  modalRef?: RefObject<HTMLDivElement>;
}

const EditClientForm: FC<EditClientProps> = ({
  client: initialClient,
  label,
  modalRef,
}) => {
  const [client, setClient] = useState(initialClient);

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
      await editClient(client.id!, {
        name: client.name,
        address: client.address,
        email: client.email,
        phoneNumber: client.phoneNumber,
      });

      closeModal();
      location.reload();
    } catch (error) {
      setError('Error editing client. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!client) {
    return <LoadingSpinner />;
  }

  const fields = [
    {
      name: 'name',
      label: 'Client Name',
      type: 'text',
      placeholder: 'ex. Company or Client Name',
      value: client.name || '',
      setValue: (value: string) => setClient({ ...client, name: value }),
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'ex. 123 Street, City, State, 12345',
      value: client.address || '',
      setValue: (value: string) => setClient({ ...client, address: value }),
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'ex. name@company.com',
      value: client.email || '',
      setValue: (value: string) => setClient({ ...client, email: value }),
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'ex. 000-000-0000',
      value: formatPhoneNumber(client.phoneNumber || ''),
      setValue: (value: string) => setClient({ ...client, phoneNumber: value }),
    },
  ];

  return (
    <div>
      <div
        id='edit-client'
        className='hover:cursor-pointer'
        onClick={openModal}
      >
        <div className='flex w-max items-center transition-opacity hover:opacity-70'>
          <Edit3 className='w-[1.25rem] h-[1.25rem] text-blue-600' />
          <span className='ml-[.45rem]'>{label}</span>
        </div>
      </div>

      <FormModal
        label='Edit Client'
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

export default EditClientForm;
