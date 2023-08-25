'use client';
import { useState } from 'react';
import Button from './Button';
import {
  ClientProps,
  InvoiceProps,
  ItemProps,
  UserProps,
} from '@/lib/interfaces/interfaces';

const SendInvoiceButton = ({
  user,
  client,
  invoice,
  items,
}: {
  user: UserProps;
  client: ClientProps;
  invoice: InvoiceProps;
  items: ItemProps;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendInvoice = async () => {
    const data = {
      user,
      client,
    };

    const content = {
      invoice,
      items,
    };

    setIsLoading(true);

    try {
      const response = await fetch('/api/sendInvoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, content }),
      });

      if (response.ok) {
        setIsEmailSent(true);
        location.reload();
      } else {
        setErrorMessage('Failed to send email. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('Error sending email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <Button
        onClick={sendInvoice}
        className='text-sm md:text-base'
        disabled={isLoading || isEmailSent}
      >
        {isLoading ? 'Sending...' : isEmailSent ? 'Email Sent' : 'Send Invoice'}
      </Button>
    </>
  );
};

export default SendInvoiceButton;
