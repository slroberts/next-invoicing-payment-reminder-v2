import { IClient, IInvoice, IItem, IUser } from './interfaces/interfaces';

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

export const register = async (user: IUser): Promise<any> => {
  return fetcher<IUser>({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const login = async (user: IUser): Promise<any> => {
  return fetcher<IUser>({
    url: '/api/login',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const createNewClient = async (client: IClient): Promise<any> => {
  return fetcher<IClient>({
    url: '/api/client/addClient',
    method: 'POST',
    body: client,
    json: true,
  });
};

interface IClientUpdate {
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
}

export const editClient = async (
  clientId: string,
  updateData: IClientUpdate
): Promise<any> => {
  return fetcher<IClientUpdate>({
    url: `/api/client/${clientId}`,
    method: 'PUT',
    body: updateData,
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

interface INewInvoice {
  due: string;
  clientId: string;
}

export const createNewInvoice = async (invoice: INewInvoice): Promise<any> => {
  return fetcher<INewInvoice>({
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

export const updateTotalOnInvoice = async (
  invoiceId: string,
  subTotal: number,
  salesTax: number,
  total: number
): Promise<any> => {
  return fetcher({
    url: `/api/invoice/updateTotalOnInvoice`,
    method: 'PUT',
    body: { invoiceId, subTotal, salesTax, total },
    json: true,
  });
};

export const createNewItem = async (item: IItem): Promise<any> => {
  return fetcher<IItem>({
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
