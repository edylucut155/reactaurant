import React, { useState, createContext, ReactNode, useContext } from 'react';
import { createPortal } from 'react-dom';
import '../lib/toast/Toast.css';

import { Toast } from '../lib/toast/Toast';

export enum ToastVariants{
  SUCCESS = "success",
  ERROR = "error"
}

type ToastType = {
    id: string,
    message: string,
    variant: ToastVariants
}

export const ToastContext = createContext({enqueueToast:(content:ToastType) => {}});

export const ToastProvider = (props : {children: ReactNode}) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const enqueueToast : (content: ToastType ) => void  = (content) =>
      setToasts((currentToasts: ToastType[]) => [
        ...currentToasts,
        content,
      ]);

    const close = (id: string) =>
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      );
  
    return (
      <ToastContext.Provider value={{enqueueToast}}>
        {props.children}
  
        {createPortal(
          <div className="toasts-wrapper">
            {toasts.map((toast) => (
              <Toast key={toast.id} close={() => close(toast.id)} {...toast}>
                {toast.message}
              </Toast>
            ))}
          </div>,
          document.body
        )}
      </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);