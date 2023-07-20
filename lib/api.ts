import {
  ClientProps,
  InvoiceProps,
  ItemProps,
  UserProps,
} from './interfaces/interfaces';

const fetcher = async <T>({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: string;
  body?: T;
  json: boolean;
}): Promise<any> => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('API Error');
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = async (user: UserProps): Promise<any> => {
  return fetcher<UserProps>({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const login = async (user: UserProps): Promise<any> => {
  return fetcher<UserProps>({
    url: '/api/login',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const createNewClient = async (client: ClientProps): Promise<any> => {
  return fetcher<ClientProps>({
    url: '/api/client/addClient',
    method: 'POST',
    body: client,
    json: true,
  });
};

export const deleteClient = async (clientId: string): Promise<any> => {
  return fetcher<void>({
    url: `/api/client/${clientId}`,
    method: 'DELETE',
    json: true,
  });
};

export const createNewInvoice = async (invoice: InvoiceProps): Promise<any> => {
  return fetcher<InvoiceProps>({
    url: '/api/invoice/addInvoice',
    method: 'POST',
    body: invoice,
    json: true,
  });
};

export const deleteInvoice = async (invoiceId: string): Promise<any> => {
  return fetcher<void>({
    url: `/api/invoice/${invoiceId}`,
    method: 'DELETE',
    json: true,
  });
};

export const createNewItem = async (item: ItemProps): Promise<any> => {
  return fetcher<ItemProps>({
    url: '/api/item/addItem',
    method: 'POST',
    body: item,
    json: true,
  });
};

export const deleteItem = async (itemId: string): Promise<any> => {
  return fetcher<void>({
    url: `/api/item/${itemId}`,
    method: 'DELETE',
    json: true,
  });
};
