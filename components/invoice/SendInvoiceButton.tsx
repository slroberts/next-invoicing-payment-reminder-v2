'use client';
import { useState } from 'react';
import { IClient, IInvoice, IItem, IUser } from '@/lib/interfaces/interfaces';
import Button from '@/components/ui/Button';

const SendInvoiceButton = ({
  user,
  client,
  invoice,
  items,
}: {
  user: IUser;
  client: IClient;
  invoice: IInvoice;
  items: IItem[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendInvoice = async () => {
    const emailData = {
      user,
      client,
    };

    const emailContent = {
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
        body: JSON.stringify({ emailData, emailContent }),
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
    <div className='flex flex-wrap-reverse gap-6 sm:gap-0'>
      {errorMessage && (
        <p className=' mr-4 py-2 px-6 bg-red-50 text-red-500 border border-red-200'>
          {errorMessage}
        </p>
      )}
      <Button
        onClick={sendInvoice}
        className='text-base md:text-lg'
        disabled={isLoading || isEmailSent}
      >
        {isLoading ? 'Sending...' : isEmailSent ? 'Email Sent' : 'Send Invoice'}
      </Button>
    </div>
  );
};

export default SendInvoiceButton;
