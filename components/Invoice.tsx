'use client';
import {
  ClientProps,
  InvoiceProps,
  ItemProps,
  UserProps,
} from '@/lib/interfaces/interfaces';
import { calculateSubTotal, capitalizeWords } from '@/lib/utils';
import ClientInfo from './ClientInfo';
import InvoiceDetails from './InvoiceDetails';
import NewItemForm from './NewItemForm';
import SendInvoiceButton from './SendInvoiceButton';
import { FC, useEffect, useState } from 'react';
import DeleteButton from './DeleteButton';
import { updateTotalOnInvoice } from '@/lib/api';

interface WebInvoiceProps {
  user?: UserProps;
  invoice?: InvoiceProps;
  client?: ClientProps;
}

const Invoice: FC<WebInvoiceProps> = ({ user, invoice = {}, client }) => {
  const [localInvoice, setLocalInvoice] = useState<InvoiceProps>(invoice);

  const { items = [], id: invoiceId, status } = localInvoice;
  const subTotal = parseFloat(calculateSubTotal(items).toFixed(2));
  const salesTax = parseFloat((subTotal * 0.04).toFixed(2));
  const total = parseFloat((subTotal + salesTax).toFixed(2));

  useEffect(() => {
    const updateInvoice = async () => {
      if (invoiceId) {
        try {
          const updatedInvoice = await updateTotalOnInvoice(
            invoiceId,
            subTotal,
            salesTax,
            total
          );
          setLocalInvoice((prevState) => ({ ...prevState, ...updatedInvoice }));
        } catch (error) {
          console.error('Error updating:', error);
        }
      }
    };

    updateInvoice();
  }, [subTotal, salesTax, total, invoiceId]);

  useEffect(() => {
    setLocalInvoice(invoice);
  }, [invoice]);

  const renderInvoiceItems = (items: ItemProps[]) => {
    return (
      <div className='bg-white divide-y divide-slate-200 font-semibold'>
        {items.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-5 md:grid-cols-12 text-sm'
          >
            <div className='md:col-span-3 px-6 py-4'>
              {capitalizeWords(item.name!)}
            </div>
            <div className='md:col-span-3 px-6 py-4'>
              ${item.price!.toFixed(2)}
            </div>
            <div className='md:col-span-3 px-6 py-4'>
              {item.hours!.toFixed(2)}
            </div>
            <div className='md:col-span-2 px-6 py-4'>
              ${(item.price! * item.hours!).toFixed(2)}
            </div>
            <div className='px-6 py-4 ml-[5vw] sm:ml-[7vw] md:ml-[-1vw] lg:ml-[1vw]'>
              {localInvoice?.status !== 'SENT' ? (
                <DeleteButton item={item} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='flex gap-6 flex-col'>
      <div className='font-semibold -mb-2 text-blue-600'>Billed To</div>
      {client && <ClientInfo client={client} />}
      <hr />
      <div className='font-semibold -mb-2 text-blue-600'>Invoice Details</div>
      {localInvoice && <InvoiceDetails invoice={localInvoice} />}

      {localInvoice?.status !== 'SENT' && (
        <div className='-mb-6'>
          <hr className='mb-6' />
          {localInvoice && (
            <NewItemForm
              invoiceId={localInvoice.id}
              label='Add Line Item'
              id={''}
            />
          )}
        </div>
      )}

      <div className='w-full min-w-full divide-y divide-slate-200 bg-slate-100 border-collapse border'>
        <div className='grid grid-cols-5 md:grid-cols-12'>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Item Name
          </div>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Price
          </div>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Hours
          </div>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Total
          </div>
        </div>

        {localInvoice && renderInvoiceItems(localInvoice.items)}

        <div className='grid grid-cols-5 md:grid-cols-12 py-4 text-sm font-semibold bg-slate-200'>
          <div className='px-6 col-span-2'>Sub Total</div>
          <div className='px-6 col-start-4 md:col-start-10'>${subTotal}</div>
        </div>
        <div className='grid grid-cols-5 md:grid-cols-12 py-4 text-sm border-b font-semibold bg-slate-300'>
          <div className='px-6 col-span-2'>Tax (4%)</div>
          <div className='px-6 col-start-4 md:col-start-10'>${salesTax}</div>
        </div>
        <div className='grid grid-cols-5 md:grid-cols-12 py-4 border-b font-semibold text-lg text-white bg-slate-500'>
          <div className='px-6'>Total</div>
          <div className='px-6 col-start-4 md:col-start-10'>${total}</div>
        </div>
      </div>
      {user?.stripeAccountId &&
        client &&
        localInvoice &&
        items &&
        invoice?.status !== 'SENT' &&
        items?.length !== 0 && (
          <div className='mt-2 flex justify-end'>
            <SendInvoiceButton
              user={user}
              client={client}
              invoice={localInvoice}
              items={items}
            />
          </div>
        )}
    </div>
  );
};

export default Invoice;
