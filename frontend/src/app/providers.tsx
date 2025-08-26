'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Toast, ToastProvider } from '../components/Toast';

// Context for global state management
interface GlobalContextType {
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  showNotification: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useGlobal = () => useContext(GlobalContext);

export function Providers({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>>([]);

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 5000);
  };

  // Handle client-side only code
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Add route change listener to show loading state
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);
    const handleRouteChangeError = () => setIsLoading(false);
    
    window.addEventListener('beforeunload', handleRouteChangeStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
    };
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR
    return <>{children}</>;
  }

  return (
    <ToastProvider>
      <GlobalContext.Provider value={{ showNotification, isLoading, setIsLoading }}>
        {children}
        
        {/* Notification system */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <Toast
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => 
                setNotifications((prev) => 
                  prev.filter((n) => n.id !== notification.id)
                )
              }
            />
          ))}
        </div>
        
        {/* Global loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-dark-900/80 z-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        )}
      </GlobalContext.Provider>
    </ToastProvider>
  );
}
