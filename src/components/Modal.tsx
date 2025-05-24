import React from 'react';
import { useEffect } from 'react';

type ModalProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
  dataStr?:any;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, dataStr }) => {
  
  if (!dataStr) {    
    // console.log("--");
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    // <div className={`{ className } fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/30`} onClick={onClose}>
    //   <div className="bg-white rounded-lg shadow-lg w-100 p-6 relative">
    //     <h2 className="text-xl text-gray-800 font-semibold mb-4">{title}</h2>
    //     <button
    //       className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    //       title="Close"
    //       onClick={onClose}
    //     >
    //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    //       </svg>
    //     </button>
    //     <div>{children}</div>
    //   </div>
    // </div>
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/30 px-4 sm:px-0`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-xl text-gray-800 font-semibold mb-4">{title}</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          title="Close"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>{children}</div>
      </div>
    </div>

  );
};


export default Modal;
