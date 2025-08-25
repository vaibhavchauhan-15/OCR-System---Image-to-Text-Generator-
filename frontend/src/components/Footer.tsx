import React from 'react';
import { FiGithub } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-dark-400 text-sm">
              © {new Date().getFullYear()} OCR System. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/yourusername/ocr-system"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              <FiGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
