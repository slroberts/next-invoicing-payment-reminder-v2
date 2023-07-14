import { useState } from 'react';

const useLoading = (
  initialState: boolean
): [boolean, (isLoading: boolean) => void] => {
  const [isLoading, setIsLoading] = useState(initialState);

  const setLoading = (newLoading: boolean) => {
    setIsLoading(newLoading);
  };

  return [isLoading, setLoading];
};

export default useLoading;
