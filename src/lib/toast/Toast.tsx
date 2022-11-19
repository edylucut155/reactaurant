import React, {FC, ReactNode} from 'react';
import { useTimeout } from '../../hooks/UseTimeout';
import { ToastVariants } from '../../contexts/ToastContext';
import "./Toast.css"

type ToastProps = {
  close: ()=> void,
  children: ReactNode,
  variant:ToastVariants
}

export const Toast: FC<ToastProps> = (props) => {
  useTimeout(props.close, 5000);

  return (
    <div className={`toast toast-${props.variant}`}>
      <div className="toast-text">{props.children}</div>
      <button onClick={props.close} className="toast-close-btn">
        x
      </button>
    </div>
  );
};
