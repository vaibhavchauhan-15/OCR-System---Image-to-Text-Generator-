'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

interface BackToTopProps {
  showAt?: number;
  className?: string;
}

const BackToTop = ({ showAt = 400, className = '' }: BackToTopProps) => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > showAt) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 bg-primary-600 text-white rounded-full shadow-lg 
        transition-all duration-300 hover:bg-primary-700 hover:shadow-glow focus:outline-none 
        focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-dark-900
        animate-fade-in z-50 ${className}`}
      aria-label="Back to top"
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
