import { FC, RefObject } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#modal');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalRef?: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

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
    >
      <div ref={modalRef}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
