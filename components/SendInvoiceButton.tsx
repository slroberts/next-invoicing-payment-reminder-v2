'use client';
import { SendButtonProps } from '@/lib/interfaces/interfaces';
import { FC, useState } from 'react';
import Button from './Button';

const SendInvoiceButton: FC<SendButtonProps> = ({
  user,
  client,
  invoice,
  items,
  subTotal,
  salesTax,
  total,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendInvoice = async () => {
    const data = {
      user,
      client,
    };

    const content = {
      invoice,
      items,
      subTotal,
      salesTax,
      total,
    };

    setIsLoading(true);

    try {
      const response = await fetch('/api/sendPDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, content }),
      });

      if (response.ok) {
        setIsEmailSent(true);
        location.reload();
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={sendInvoice}
      className='text-sm md:text-base'
      disabled={isLoading || isEmailSent}
    >
      {isLoading ? 'Sending...' : isEmailSent ? 'Email Sent' : 'Send Invoice'}
    </Button>
  );
};

export default SendInvoiceButton;
