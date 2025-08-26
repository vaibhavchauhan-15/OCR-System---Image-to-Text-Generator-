import React from 'react';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'success' | 'warning' | 'error';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = '',
  size = 'md',
  color = 'white',
  text,
  fullScreen = false,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'h-4 w-4';
      case 'sm':
        return 'h-5 w-5';
      case 'md':
        return 'h-6 w-6';
      case 'lg':
        return 'h-8 w-8';
      case 'xl':
        return 'h-12 w-12';
      default:
        return 'h-6 w-6';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary-500';
      case 'white':
        return 'text-white';
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-amber-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-dark-900 dark:text-white';
    }
  };

  const spinner = (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-full' : ''}`}>
      <div className={`flex flex-col items-center space-y-2 ${fullScreen ? 'animate-pulse-subtle' : ''}`}>
        <svg
          className={`animate-spin ${getSizeClasses()} ${getColorClasses()} ${className}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {text && <p className="text-sm text-gray-600 dark:text-dark-400">{text}</p>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-200/80 dark:bg-dark-900/80 backdrop-blur-sm flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
