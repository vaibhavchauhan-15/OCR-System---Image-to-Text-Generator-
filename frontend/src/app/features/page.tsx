import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiCheckCircle, FiImage, FiFileText, FiGlobe, FiDatabase, FiCpu } from 'react-icons/fi';

// Add metadata export for better SEO
export const metadata = {
  title: 'Features | OCR System - Image to Text Generator',
  description: 'Explore the powerful features of our OCR system for accurate text extraction from images',
};

// Mark the page as static with no data revalidation needed
export const dynamic = 'force-static';
export const revalidate = false;

const FeaturePage = () => {
  const features = [
    {
      icon: <FiImage className="h-10 w-10 text-primary-500" />,
      title: 'Advanced Image Processing',
      description: 'Supports various image formats and performs preprocessing to enhance image quality for better text extraction.'
    },
    {
      icon: <FiFileText className="h-10 w-10 text-primary-500" />,
      title: 'High Accuracy OCR',
      description: 'Utilizes state-of-the-art OCR engines to accurately extract text from images, even with complex layouts.'
    },
    {
      icon: <FiGlobe className="h-10 w-10 text-primary-500" />,
      title: 'Multilingual Support',
      description: 'Extract text in multiple languages with specialized language models for optimal recognition.'
    },
    {
      icon: <FiDatabase className="h-10 w-10 text-primary-500" />,
      title: 'Structured Data Extraction',
      description: 'Extract structured data like tables, forms, and lists with their formatting preserved.'
    },
    {
      icon: <FiCpu className="h-10 w-10 text-primary-500" />,
      title: 'AI-Powered Enhancement',
      description: 'Advanced AI algorithms improve text extraction by correcting recognition errors and optimizing results.'
    },
    {
      icon: <FiCheckCircle className="h-10 w-10 text-primary-500" />,
      title: 'Easy to Use Interface',
      description: 'User-friendly interface with drag-and-drop functionality and instant previews for quick results.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-950 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
                Powerful Features
              </h1>
              <p className="text-xl text-gray-600 dark:text-dark-300 max-w-3xl mx-auto">
                Our OCR system offers state-of-the-art capabilities to extract text from images with high accuracy and flexibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg p-8 transition-all duration-300 hover:border-primary-500 hover:shadow-glow"
                >
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-dark-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gray-100 dark:bg-dark-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-dark-300 max-w-3xl mx-auto">
                Our image-to-text conversion process is simple, fast, and accurate.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-500">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Upload Your Image</h3>
                    <p className="text-gray-600 dark:text-dark-300">
                      Simply drag and drop or select an image file from your device. We support various formats including PNG, JPG, JPEG, GIF, BMP, and WEBP.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-500">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Advanced Processing</h3>
                    <p className="text-gray-600 dark:text-dark-300">
                      Our system automatically enhances your image quality, corrects distortions, and optimizes it for the best text recognition results.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-500">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Text Extraction</h3>
                    <p className="text-gray-600 dark:text-dark-300">
                      Our AI-powered OCR engine analyzes the image and extracts all text content with high accuracy, maintaining the original formatting where possible.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-500">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Get Results Instantly</h3>
                    <p className="text-gray-600 dark:text-dark-300">
                      View the extracted text immediately on the screen. Copy it to your clipboard or download it as a text file for further use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Extract Text from Images?</h2>
              <p className="text-xl text-gray-600 dark:text-dark-300 mb-8 max-w-2xl mx-auto">
                Try our OCR system now and experience the power of AI-driven text extraction.
              </p>
              <a
                href="/"
                className="btn btn-primary btn-lg"
              >
                Try It Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturePage;
