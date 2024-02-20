import React from "react";

import success from '../../assets/success.png';
import error from '../../assets/error.svg';

import './styles.css'


interface ModalProps {
  isOpen: boolean;
  onCloseHandler?: () => void;
  isSuccess: boolean;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onCloseHandler, isSuccess, message}) => {
  return (
    <div className={`${isOpen ? "show" : ""} modalOverlay`}>
      <div className='modal'>
        <div className="modalMessage">
          <img
            src={isSuccess ? success : error}
            alt={isSuccess ? "success" : "error"} 
          />
          <p>{message}</p>
        </div>
        <button type="button" className="modalButton" onClick={onCloseHandler}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
