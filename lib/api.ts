import { UserProps } from './interfaces/interfaces';

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
