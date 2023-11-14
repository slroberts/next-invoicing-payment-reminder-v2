import { useState } from 'react';

const useModal = (initialState: boolean): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return [isOpen, openModal, closeModal];
};

export default useModal;
