'use client';
import { FC, useEffect, useState } from 'react';
import { IClient, IInvoice, IItem, IUser } from '@/lib/interfaces/interfaces';
import { calculateSubTotal } from '@/lib/utils';
import { updateTotalOnInvoice } from '@/lib/api';
import ClientInfo from '@/components/shared/ClientInfo';
import InvoiceDetails from '@/components/invoice/InvoiceDetails';
import NewItemForm from '@/components/forms/NewItemForm';
import InvoiceItemsHeadings from '@/components/invoice/InvoiceItemsHeadings';
import InvoiceItems from '@/components/invoice/InvoiceItems';
import InvoiceTotal from '@/components/invoice/InvoiceTotal';
import SendInvoiceButton from '@/components/invoice/SendInvoiceButton';

interface InvoiceProps {
  invoice: IInvoice;
  client: IClient;
  user?: IUser;
  items?: IItem[];
}

const Invoice: FC<InvoiceProps> = ({ user, invoice, client }) => {
  const [localInvoice, setLocalInvoice] = useState<IInvoice>(invoice);

  const { items = [], id: invoiceId } = localInvoice;
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

  return (
    <div className='flex gap-6 flex-col'>
      <div className='font-semibold -mb-2 text-blue-600'>Billed To</div>
      <ClientInfo client={client} />

      <div className='font-semibold -mb-2 text-blue-600'>Invoice Details</div>
      <InvoiceDetails invoice={localInvoice} />

      <hr className='my-4 border-[.0125rem] border-slate-700' />

      {localInvoice.status !== 'SENT' && (
        <NewItemForm invoiceId={localInvoice.id} label='Add Line Item' />
      )}

      <div className='w-full min-w-full divide-y divide-slate-800 border border-collapse border-slate-700'>
        <InvoiceItemsHeadings />
        <InvoiceItems invoice={localInvoice} />
        <InvoiceTotal subTotal={subTotal} salesTax={salesTax} total={total} />
      </div>

      {user?.stripeAccountId &&
        client &&
        localInvoice &&
        items &&
        invoice.status !== 'SENT' &&
        items.length !== 0 && (
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
