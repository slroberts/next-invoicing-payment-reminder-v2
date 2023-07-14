import { ModalProps } from '@/lib/interfaces/interfaces';
import { FC } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#modal');

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, modalRef }) => {
  const handleModalClose = () => {
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      overlayClassName='bg-[rgba(0,0,0,.75)] flex justify-center items-center fixed top-0 left-0 h-screen w-screen'
      className='w-10/12 md:w-7/12 lg:w-5/12 bg-white rounded-md p-8'
      ref={modalRef}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
