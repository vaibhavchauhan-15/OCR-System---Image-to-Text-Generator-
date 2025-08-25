'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiCopy, FiDownload, FiImage, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [structuredData, setStructuredData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ocrInfo, setOcrInfo] = useState<any>(null);
  const [language, setLanguage] = useState<string>('en');
  const [enhanceImage, setEnhanceImage] = useState<boolean>(true);
  const [structuredOutput, setStructuredOutput] = useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'],
    },
    maxSize: 10485760, // 10MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // Clean up previous preview URL to avoid memory leaks
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setError(null);
        
        // Create preview
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        
        // Reset results
        setExtractedText('');
        setStructuredData(null);
        setOcrInfo(null);
      }
    },
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setError('File is too large. Maximum size is 10MB.');
      } else {
        setError('Invalid file. Please upload an image file.');
      }
    },
  });

  const extractText = async () => {
    if (!file) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);
      formData.append('enhance_image', enhanceImage.toString());
      formData.append('structured_output', structuredOutput.toString());

      const response = await axios.post(`${API_URL}/extract`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setExtractedText(response.data.text);
      setStructuredData(response.data.structured_data);
      setOcrInfo({
        confidence: (response.data.confidence * 100).toFixed(2),
        engine: response.data.engine_used,
        processingTime: response.data.processing_time.toFixed(2),
        wordCount: response.data.word_count,
      });
    } catch (err: any) {
      console.error('Error extracting text:', err);
      setError(err.response?.data?.detail || 'Failed to extract text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
  };

  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAsJSON = () => {
    const data = {
      text: extractedText,
      structured_data: structuredData,
      metadata: ocrInfo,
    };
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'ocr-result.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Clean up URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Extract Text from Images with AI
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Settings */}
          <div className="space-y-6">
            {/* File Upload Zone */}
            <div 
              {...getRootProps()} 
              className="card p-8 border-2 border-dashed border-dark-600 hover:border-primary-500 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="text-center">
                  <div className="relative w-full h-64 mx-auto mb-4">
                    <Image 
                      src={preview} 
                      alt="Preview" 
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <p className="text-dark-300">Click or drag to replace</p>
                </div>
              ) : (
                <div className="text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-dark-400 mb-4" />
                  <p className="text-lg font-medium text-white mb-1">Drop your image here</p>
                  <p className="text-dark-400">or click to browse</p>
                  <p className="text-dark-500 mt-2 text-sm">
                    Supports PNG, JPG, JPEG, GIF, BMP, WEBP up to 10MB
                  </p>
                </div>
              )}
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded flex items-center">
                <FiAlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Settings */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4 text-white">Settings</h2>
              
              <div className="space-y-4">
                {/* Language Selection */}
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-dark-300 mb-1">
                    Language
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input w-full p-2"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="auto">Auto Detect</option>
                  </select>
                </div>
                
                {/* Image Enhancement */}
                <div className="flex items-center">
                  <input
                    id="enhance-image"
                    type="checkbox"
                    checked={enhanceImage}
                    onChange={(e) => setEnhanceImage(e.target.checked)}
                    className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 bg-dark-700 border-dark-600"
                  />
                  <label htmlFor="enhance-image" className="ml-2 block text-sm text-dark-300">
                    Apply image enhancement (recommended)
                  </label>
                </div>
                
                {/* Structured Output */}
                <div className="flex items-center">
                  <input
                    id="structured-output"
                    type="checkbox"
                    checked={structuredOutput}
                    onChange={(e) => setStructuredOutput(e.target.checked)}
                    className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 bg-dark-700 border-dark-600"
                  />
                  <label htmlFor="structured-output" className="ml-2 block text-sm text-dark-300">
                    Extract structured data (for invoices, receipts, etc.)
                  </label>
                </div>
              </div>
              
              {/* Extract Button */}
              <button
                onClick={extractText}
                disabled={!file || isLoading}
                className={`btn btn-primary w-full mt-6 flex items-center justify-center ${
                  !file || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2" /> Processing...
                  </>
                ) : (
                  <>
                    <FiImage className="mr-2" /> Extract Text
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Extracted Text */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Extracted Text</h2>
                {extractedText && (
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="btn btn-secondary p-2"
                      title="Copy to clipboard"
                    >
                      {copySuccess ? <FiCheckCircle className="h-5 w-5 text-green-500" /> : <FiCopy className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={downloadAsText}
                      className="btn btn-secondary p-2"
                      title="Download as text file"
                    >
                      <FiDownload className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              
              {extractedText ? (
                <div className="bg-dark-900 rounded-md p-4 max-h-80 overflow-y-auto">
                  <pre className="text-white whitespace-pre-wrap font-mono text-sm">{extractedText}</pre>
                </div>
              ) : (
                <div className="bg-dark-900 rounded-md p-6 text-center text-dark-400">
                  {isLoading ? (
                    <LoadingSpinner className="mx-auto h-8 w-8 mb-2" />
                  ) : (
                    <p>Extract text from an image to see results here</p>
                  )}
                </div>
              )}
            </div>
            
            {/* OCR Information */}
            {ocrInfo && (
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-4 text-white">OCR Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-dark-400 text-sm">Confidence</p>
                    <p className="text-white text-lg font-medium">{ocrInfo.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">Engine</p>
                    <p className="text-white text-lg font-medium">{ocrInfo.engine}</p>
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">Processing Time</p>
                    <p className="text-white text-lg font-medium">{ocrInfo.processingTime}s</p>
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">Word Count</p>
                    <p className="text-white text-lg font-medium">{ocrInfo.wordCount}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Structured Data */}
            {structuredData && Object.keys(structuredData.key_value_pairs).length > 0 && (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Structured Data</h2>
                  <button
                    onClick={downloadAsJSON}
                    className="btn btn-secondary p-2"
                    title="Download as JSON"
                  >
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
                <div className="bg-dark-900 rounded-md p-4 max-h-80 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="pb-2 text-dark-300 font-medium">Key</th>
                        <th className="pb-2 text-dark-300 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                      {Object.entries(structuredData.key_value_pairs).map(([key, value]) => (
                        <tr key={key}>
                          <td className="py-2 pr-4 text-white font-medium">{key}</td>
                          <td className="py-2 text-dark-200">
                            {typeof value === 'object' && value !== null 
                              ? (JSON.stringify(value)) 
                              : value as string}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Learn More Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">Discover More</h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Learn about our advanced features and the developer behind this project
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-8 transition-all duration-300 hover:border-primary-500 hover:shadow-glow">
            <h3 className="text-xl font-bold mb-3">Powerful Features</h3>
            <p className="text-dark-300 mb-6">
              Explore the advanced OCR capabilities that make our system stand out,
              including image enhancement, multi-language support, and structured data extraction.
            </p>
            <a href="/features" className="btn btn-primary">
              View Features
            </a>
          </div>
          
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-8 transition-all duration-300 hover:border-primary-500 hover:shadow-glow">
            <h3 className="text-xl font-bold mb-3">About the Developer</h3>
            <p className="text-dark-300 mb-6">
              Learn more about Vaibhav Chauhan, the Full-Stack Developer, Data Analyst, and Open Source Contributor
              behind this OCR system.
            </p>
            <a href="/about" className="btn btn-primary">
              Meet the Developer
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
