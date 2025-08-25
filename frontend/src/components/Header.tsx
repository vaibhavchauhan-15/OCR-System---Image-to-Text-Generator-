import React from 'react';
import { FiFileText } from 'react-icons/fi';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-900 border-b border-dark-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors">
            <FiFileText className="h-6 w-6" />
            <span className="text-xl font-bold">OCR System</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-dark-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#features" className="text-dark-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#about" className="text-dark-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>
          
          <div>
            <a
              href="https://github.com/vaibhavchauhan-15/OCR-System---Image-to-Text-Generator-"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
