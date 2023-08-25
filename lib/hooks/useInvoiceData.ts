import { useEffect, useState } from 'react';
import {
  UserProps,
  ClientProps,
  InvoiceProps,
  ItemProps,
} from '../interfaces/interfaces';

function useInvoiceData(
  userId: string | null | undefined,
  invoiceId: string | null | undefined,
  clientId: string | null | undefined
) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
  const [client, setClient] = useState<ClientProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendPaymentConfirmation = async ({
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
      const response = await fetch('/api/sendPaymentConfirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, content }),
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
    if (userId && invoiceId && clientId) {
      fetch(
        `/api/webInvoice?userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setUser(data.user);
          setInvoice(data.invoice);
          setClient(data.client);

          if (
            data.invoice.paymentStatus !== 'PAID' &&
            window.location.href.includes('/pay/success')
          ) {
            sendPaymentConfirmation({
              user: data.user,
              client: data.client,
              invoice: data.invoice,
              items: data.invoice.items,
            });

            setInvoice((prevInvoice: any) => ({
              ...prevInvoice,
              paymentStatus: 'PAID',
            }));
          }
        })

        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [userId, invoiceId, clientId]);

  return { user, invoice, client, isLoading, isEmailSent, errorMessage };
}

export default useInvoiceData;
