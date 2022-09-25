import React from 'react';
import './modal.scss';

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

function Modal({ children, onClose }:  ModalProps) {
  return (
    <>
      <div className="modal" onClick={onClose} />
      <div className="modal__content">
        {children}
      </div>
    </>
  );
}

export default Modal;