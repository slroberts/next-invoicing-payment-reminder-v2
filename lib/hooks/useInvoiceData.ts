import { useEffect, useState } from 'react';
import { IUser, IClient, IInvoice, IItem } from '../interfaces/interfaces';

function useInvoiceData(
  userId: string | null | undefined,
  invoiceId: string | null | undefined,
  clientId: string | null | undefined
) {
  const [user, setUser] = useState<IUser | null>(null);
  const [invoice, setInvoice] = useState<IInvoice | null>(null);
  const [client, setClient] = useState<IClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendPaymentConfirmation = async (
    user: IUser,
    client: IClient,
    invoice: IInvoice,
    items: IItem
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/sendPaymentConfirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailData: { user, client },
          emailContent: { invoice, items },
        }),
      });

      if (response.ok) {
        setIsEmailSent(true);
      } else {
        setErrorMessage('Failed to send email. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('Error sending email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/webInvoice?userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data.user);
        setInvoice(data.invoice);
        setClient(data.client);

        if (
          data.invoice.paymentStatus !== 'PAID' &&
          window.location.href.includes('/pay/success') &&
          !isEmailSent // Check if the email has not been sent already
        ) {
          sendPaymentConfirmation(
            data.user,
            data.client,
            data.invoice,
            data.invoice.items
          );
          setInvoice((prevInvoice: any) => ({
            ...prevInvoice,
            paymentStatus: 'PAID',
          }));
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('Error fetching data. Please try again later.');
      }
    };

    if (userId && invoiceId && clientId) {
      fetchData();
    }
  }, [userId, invoiceId, clientId, isEmailSent]);

  return { user, invoice, client, isLoading, isEmailSent, errorMessage };
}

export default useInvoiceData;
