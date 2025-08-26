'use client';

import { useState } from 'react';
import { FiFileText, FiMenu, FiX, FiGithub } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="bg-dark-900/95 backdrop-blur-md border-b border-dark-800 py-3 sticky top-0 z-30 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors group"
            onClick={closeMenu}
            prefetch={true}
          >
            <div className="bg-gradient-to-r from-primary-500 to-sky-500 p-2 rounded-lg group-hover:shadow-glow transition-all">
              <FiFileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">OCR System</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                prefetch={true}
                className={`transition-colors hover:text-primary-400 relative py-1 ${
                  pathname === link.href 
                    ? 'text-primary-400 font-medium' 
                    : 'text-dark-300'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* GitHub Link */}
            <a
              href="https://github.com/vaibhavchauhan-15/OCR-System---Image-to-Text-Generator-"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2"
            >
              <FiGithub className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark-300 hover:text-white p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 bg-dark-950/95 z-40 md:hidden transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20 px-6 flex flex-col`}
      >
        <nav className="flex flex-col space-y-6 items-center text-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              prefetch={true}
              className={`text-2xl font-medium transition-colors ${
                pathname === link.href 
                  ? 'text-primary-400' 
                  : 'text-white hover:text-primary-400'
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-6 flex flex-col space-y-4 w-full">            
            {/* GitHub Link */}
            <a
              href="https://github.com/vaibhavchauhan-15/OCR-System---Image-to-Text-Generator-"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center justify-center gap-2"
              onClick={closeMenu}
            >
              <FiGithub className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
