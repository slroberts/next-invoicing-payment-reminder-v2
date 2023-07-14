import { FormProps } from '@/lib/interfaces/interfaces';
import { FC } from 'react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

const FormModal: FC<FormProps> = ({
  label,
  fields,
  onSubmit,
  isLoading,
  error,
  onClose,
  isOpen,
  modalRef,
}) => {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <Modal modalRef={modalRef} isOpen={isOpen} onClose={onClose}>
      <h1 className='text-xl font-semibold'>{label}</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <form
        className='flex flex-col gap-4 text-base mt-4'
        onSubmit={handleFormSubmit}
      >
        {fields.map((field) => (
          <div key={field.label}>
            <div className='text-sm mb-2 ml-2 text-blue-600 font-semibold'>
              {field.label}
            </div>
            <Input
              name={field.name}
              required
              type={field.type}
              className='py-2'
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.setValue(e.target.value)
              }
            />
          </div>
        ))}
        <div>
          <Button className='float-right mt-2' disabled={isLoading}>
            {isLoading ? 'Adding...' : label}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
