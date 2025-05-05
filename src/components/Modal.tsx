import React from 'react';

type ModalProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={`{ className } fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/30`}>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl text-gray-800 font-semibold mb-4">{title}</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
