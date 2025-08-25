import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-dark-400 text-sm">
              © {new Date().getFullYear()} OCR System. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2">
              <Link href="/" className="text-dark-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/features" className="text-dark-400 hover:text-white transition-colors text-sm">
                Features
              </Link>
              <Link href="/about" className="text-dark-400 hover:text-white transition-colors text-sm">
                About
              </Link>
            </div>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/vaibhavchauhan-15/OCR-System---Image-to-Text-Generator-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/vaibhavchauhan15"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/vaibhavchauhan15"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:vaibhavchauhan12353@gmail.com"
              className="text-dark-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <FiMail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
