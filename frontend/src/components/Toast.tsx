'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Handle animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      const closeTimer = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(closeTimer);
    }, 4700);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <FiAlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'info':
      default:
        return <FiInfo className="h-5 w-5 text-primary-400" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-800/30 border-green-700/50';
      case 'error':
        return 'bg-red-800/30 border-red-700/50';
      case 'warning':
        return 'bg-amber-800/30 border-amber-700/50';
      case 'info':
      default:
        return 'bg-primary-800/30 border-primary-700/50';
    }
  };

  return (
    <div
      className={`${getBgColor()} ${
        isVisible ? 'animate-slide-in-left' : 'animate-slide-out-right'
      } rounded-lg border shadow-lg p-4 min-w-[300px] max-w-md backdrop-blur-sm flex items-start gap-3`}
      role="alert"
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1 text-white">{message}</div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-dark-400 hover:text-white transition-colors p-1"
        aria-label="Close notification"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <>
      {children}
      {isMounted && createPortal(<div id="toast-root" className="fixed top-4 right-4 z-50 space-y-2" />, document.body)}
    </>
  );
};
