'use client';
import { FC, useCallback } from 'react';
import { deleteItem, deleteInvoice } from '@/lib/api';
import { Trash2 } from 'react-feather';

interface DeleteButtonProps {
  item?: { id: string };
  invoice?: { id: string };
}

const DeleteButton: FC<DeleteButtonProps> = ({ item, invoice }) => {
  const handleDelete = useCallback(async () => {
    try {
      if (item?.id) {
        await deleteItem(item.id);
        location.reload();
      } else if (invoice?.id) {
        await deleteInvoice(invoice.id);
        location.reload();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  }, [item?.id, invoice?.id]);

  return (
    <div
      id='delete-button'
      className='flex cursor-pointer text-sm transition-opacity hover:opacity-70'
      onClick={handleDelete}
    >
      <Trash2 className='text-blue-600 w-[1.35rem] h-[1.35rem]' />
    </div>
  );
};

export default DeleteButton;
