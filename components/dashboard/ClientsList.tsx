'use client';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { IClient } from '@/lib/interfaces/interfaces';
import { deleteClient } from '@/lib/api';
import Link from 'next/link';
import NewClientForm from '@/components/forms/NewClientForm';
import Input from '@/components/ui/Input';
import ClientCard from '@/components/dashboard/ClientCard';
import MoreDropDown from '@/components/shared/MoreDropDown';
import NewInvoiceForm from '@/components/forms/NewInvoiceForm';
import EditClientForm from '@/components/forms/EditClientForm';
import { Trash2 } from 'react-feather';

interface ClientsListProps {
  clients: IClient[];
}

const ClientsList: FC<ClientsListProps> = ({ clients }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClient = async (clientId: string) => {
    try {
      if (clientId) {
        await deleteClient(clientId);
        location.reload();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className='w-full lg:w-3/12 flex flex-col'>
      <div className='bg-blue-600 rounded-t-lg pt-6 pl-6 pr-6'>
        <NewClientForm />
      </div>

      {clients.length > 0 && (
        <div className='bg-slate-900 p-6'>
          <Input
            type='text'
            name='search'
            value={searchQuery}
            onChange={handleSearchChange}
            className={'py-2 bg-slate-950 border-none text-white text-sm'}
            placeholder='Search clients ex: Test Company'
          />
        </div>
      )}

      <div className='max-h-[28.75rem] h-full bg-slate-900 rounded-b-lg divide divide-y divide-slate-950 overflow-y-scroll'>
        {filteredClients.map((client) => (
          <div key={client.id}>
            <div className='float-right mt-4 mr-3'>
              <MoreDropDown modalRef={modalRef}>
                <div className='py-2 scale-90'>
                  <NewInvoiceForm
                    client={client}
                    label='New Invoice'
                    modalRef={modalRef}
                  />
                </div>
                <div className='py-2 scale-90'>
                  <EditClientForm
                    client={client}
                    label='Edit Client'
                    modalRef={modalRef}
                  />
                </div>
                <div
                  id='delete-client'
                  onClick={() => handleDeleteClient(client.id as string)}
                  className='py-2 scale-90 flex w-max items-center hover:cursor-pointer  transition-opacity hover:opacity-70'
                >
                  <Trash2 className='w-[1.35rem] h-[1.35rem] text-blue-600' />
                  <span className='ml-1'>Delete Client</span>
                </div>
              </MoreDropDown>
            </div>
            <div className='px-6 py-4' role='link' tabIndex={0}>
              <Link id='delete-client' href={`/dashboard/client/${client.id}`}>
                <ClientCard client={client} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsList;
