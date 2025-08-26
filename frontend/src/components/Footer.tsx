'use client';

import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
  ];

  const socialLinks = [
    {
      href: 'https://github.com/vaibhavchauhan-15/OCR-System---Image-to-Text-Generator-',
      label: 'GitHub',
      icon: <FiGithub className="h-5 w-5" />,
    },
    {
      href: 'https://linkedin.com/in/vaibhavchauhan15',
      label: 'LinkedIn',
      icon: <FiLinkedin className="h-5 w-5" />,
    },
    {
      href: 'https://twitter.com/vaibhavchauhan15',
      label: 'Twitter',
      icon: <FiTwitter className="h-5 w-5" />,
    },
    {
      href: 'mailto:vaibhavchauhan12353@gmail.com',
      label: 'Email',
      icon: <FiMail className="h-5 w-5" />,
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-dark-950 border-t border-gray-200 dark:border-dark-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-dark-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <div className="bg-gradient-to-r from-primary-500 to-sky-500 p-2 rounded-lg">
                <span className="text-white text-lg font-bold">OCR</span>
              </div>
              <span className="text-xl font-bold">OCR System</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-dark-400 max-w-md">
              Extract text from images with high accuracy using our AI-powered OCR technology. 
              Support for multiple languages, structured data extraction, and more.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2 hover:bg-gray-200 dark:hover:bg-dark-800 rounded-full"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-600 dark:text-dark-400">
              <li>
                <a 
                  href="mailto:vaibhavchauhan12353@gmail.com" 
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  vaibhavchauhan12353@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/vaibhavchauhan-15" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  @vaibhavchauhan-15
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-dark-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-dark-400 text-sm">
              © {new Date().getFullYear()} OCR System. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-primary-600 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 z-30 ${
          showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="h-6 w-6" />
      </button>
    </footer>
  );
};

export default Footer;
