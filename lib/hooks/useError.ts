import { useState } from 'react';

const useError = (initialError: string): [string, (error: string) => void] => {
  const [error, setError] = useState(initialError);

  const handleError = (newError: string) => {
    setError(newError);
  };

  return [error, handleError];
};

export default useError;
