// components/Modal.tsx
import React from 'react';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Ngăn chặn sự kiện click từ children thả xuống
    e.stopPropagation();
    onClose();
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Ngăn chặn sự kiện click thả xuống từ container
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={handleContainerClick}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;