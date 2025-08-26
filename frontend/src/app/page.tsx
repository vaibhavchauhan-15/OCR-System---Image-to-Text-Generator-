'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiCopy, FiDownload, FiImage, FiCheckCircle, FiAlertCircle, FiSettings, FiFileText, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useGlobal } from './providers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Home() {
  const { showNotification, setIsLoading: setGlobalLoading } = useGlobal();
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
  const [showSettings, setShowSettings] = useState<boolean>(false);

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
      showNotification('Please upload an image first.', 'warning');
      return;
    }

    setIsLoading(true);
    setGlobalLoading(true);
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
      showNotification('Text extracted successfully!', 'success');
    } catch (err: any) {
      console.error('Error extracting text:', err);
      const errorMessage = err.response?.data?.detail || 'Failed to extract text. Please try again.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
      setGlobalLoading(false);
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-16 border-b border-dark-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 animate-slide-in-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-sky-500 bg-clip-text text-transparent">
                Extract Text from Images with AI
              </h1>
              <p className="text-lg text-dark-200 mb-6">
                Transform images into editable text with our advanced OCR technology. Perfect for digitizing documents,
                extracting information from receipts, or making printed text searchable.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-primary flex items-center"
                >
                  Get Started <FiArrowRight className="ml-2" />
                </button>
                <a href="/features" className="btn btn-secondary flex items-center">
                  Explore Features <FiFileText className="ml-2" />
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center animate-slide-in-right">
              <div className="video-container relative w-full max-w-md h-64 md:h-80 overflow-hidden rounded-lg border border-dark-700 bg-gradient-to-b from-dark-800/70 to-dark-900/90">
                <video
                  src="/notes.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="drop-shadow-glow animate-float w-full h-full object-contain mix-blend-screen opacity-90 filter brightness-125 contrast-110"
                  style={{ 
                    animation: "subtle-pulse 4s infinite ease-in-out",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section id="upload-section" className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary-400 to-sky-500 bg-clip-text text-transparent">
              Upload an Image to Extract Text
            </h2>
            <p className="text-center text-dark-300 mt-2 max-w-2xl mx-auto">
              Our powerful OCR engine supports multiple languages and can extract both plain text and structured data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Settings */}
            <div className="space-y-6 animate-slide-in-left">
              {/* File Upload Zone */}
              <div 
                {...getRootProps()} 
                className="card p-8 border-2 border-dashed border-dark-600 hover:border-primary-500 transition-colors cursor-pointer hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 rounded-lg bg-dark-900/50"
              >
                <input {...getInputProps()} />
                {preview ? (
                  <div className="text-center">
                    <div className="relative w-full h-64 mx-auto mb-4">
                      <Image 
                        src={preview} 
                        alt="Preview" 
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ objectFit: 'contain' }}
                        className="animate-fade-in rounded-md"
                      />
                    </div>
                    <p className="text-dark-300">Click or drag to replace</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-dark-400 mb-4 animate-pulse" />
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
                <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg flex items-center animate-slide-up">
                  <FiAlertCircle className="h-5 w-5 mr-2" />
                  <span>{error}</span>
                </div>
              )}
              
              {/* Settings */}
              <div className="card p-6 rounded-lg bg-dark-900/70 border border-dark-800 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <FiSettings className="mr-2 text-primary-400" /> OCR Settings
                  </h2>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-dark-400 hover:text-white transition-colors"
                  >
                    {showSettings ? 'Hide' : 'Show'} Options
                  </button>
                </div>
                
                {showSettings && (
                  <div className="space-y-4 animate-slide-up">
                    {/* Language Selection */}
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-dark-300 mb-1">
                        Language
                      </label>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full p-2 bg-dark-800 border border-dark-700 rounded-md text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
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
                )}
                
                {/* Extract Button */}
                <button
                  onClick={extractText}
                  disabled={!file || isLoading}
                  className={`btn mt-6 w-full flex items-center justify-center text-white font-medium rounded-md px-4 py-3 ${
                    !file || isLoading 
                      ? 'bg-dark-700 opacity-50 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary-600 to-sky-600 hover:from-primary-500 hover:to-sky-500 transform hover:-translate-y-1 shadow-lg hover:shadow-primary-500/20 transition-all duration-300'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner className="mr-2" /> Processing Image...
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
            <div className="space-y-6 animate-slide-in-right">
              {/* Extracted Text */}
              <div className="card p-6 rounded-lg bg-dark-900/70 border border-dark-800 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <FiFileText className="mr-2 text-primary-400" /> Extracted Text
                  </h2>
                  {extractedText && (
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 rounded-md bg-dark-800 hover:bg-dark-700 text-white transition-colors relative"
                        title="Copy to clipboard"
                      >
                        {copySuccess ? <FiCheckCircle className="h-5 w-5 text-green-500" /> : <FiCopy className="h-5 w-5" />}
                        {copySuccess && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-900 text-white text-xs px-2 py-1 rounded animate-fade-in">
                            Copied!
                          </span>
                        )}
                      </button>
                      <button
                        onClick={downloadAsText}
                        className="p-2 rounded-md bg-dark-800 hover:bg-dark-700 text-white transition-colors"
                        title="Download as text file"
                      >
                        <FiDownload className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                {extractedText ? (
                  <div className="bg-dark-950 rounded-md p-4 max-h-96 overflow-y-auto animate-fade-in border border-dark-800">
                    <pre className="text-white whitespace-pre-wrap font-mono text-sm">{extractedText}</pre>
                  </div>
                ) : (
                  <div className="bg-dark-950 rounded-md p-8 text-center text-dark-400 border border-dark-800 h-48 flex items-center justify-center">
                    {isLoading ? (
                      <div className="flex flex-col items-center">
                        <LoadingSpinner className="mx-auto h-8 w-8 mb-2" />
                        <p>Processing your image...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FiFileText className="h-10 w-10 mb-2 opacity-40" />
                        <p>Upload and process an image to see the extracted text here</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* OCR Information */}
              {ocrInfo && (
                <div className="card p-6 rounded-lg bg-dark-900/70 border border-dark-800 shadow-md animate-slide-up">
                  <h2 className="text-xl font-bold mb-4 text-white">OCR Information</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-dark-950 rounded-lg p-3 border border-dark-800 animate-fade-in animate-delay-100">
                      <p className="text-dark-400 text-sm">Confidence</p>
                      <p className="text-white text-lg font-medium">{ocrInfo.confidence}%</p>
                    </div>
                    <div className="bg-dark-950 rounded-lg p-3 border border-dark-800 animate-fade-in animate-delay-200">
                      <p className="text-dark-400 text-sm">Engine</p>
                      <p className="text-white text-lg font-medium">{ocrInfo.engine}</p>
                    </div>
                    <div className="bg-dark-950 rounded-lg p-3 border border-dark-800 animate-fade-in animate-delay-300">
                      <p className="text-dark-400 text-sm">Processing Time</p>
                      <p className="text-white text-lg font-medium">{ocrInfo.processingTime}s</p>
                    </div>
                    <div className="bg-dark-950 rounded-lg p-3 border border-dark-800 animate-fade-in animate-delay-400">
                      <p className="text-dark-400 text-sm">Word Count</p>
                      <p className="text-white text-lg font-medium">{ocrInfo.wordCount}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Structured Data */}
              {structuredData && Object.keys(structuredData.key_value_pairs).length > 0 && (
                <div className="card p-6 rounded-lg bg-dark-900/70 border border-dark-800 shadow-md animate-slide-up">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Structured Data</h2>
                    <button
                      onClick={downloadAsJSON}
                      className="p-2 rounded-md bg-dark-800 hover:bg-dark-700 text-white transition-colors"
                      title="Download as JSON"
                    >
                      <FiDownload className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="bg-dark-950 rounded-md p-4 max-h-96 overflow-y-auto animate-fade-in border border-dark-800">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-2 text-dark-300 font-medium">Key</th>
                          <th className="pb-2 text-dark-300 font-medium">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-800">
                        {Object.entries(structuredData.key_value_pairs).map(([key, value], index) => (
                          <tr key={key} className="animate-fade-in" style={{ animationDelay: `${100 * index}ms` }}>
                            <td className="py-3 pr-4 text-primary-400 font-medium">{key}</td>
                            <td className="py-3 text-white">
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
      </section>
      
      {/* Features Highlight Section */}
      <section className="py-16 bg-gradient-to-b from-dark-950 to-dark-900 border-t border-dark-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-sky-500 text-transparent bg-clip-text">
              Advanced OCR Features
            </h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Our cutting-edge technology offers multiple features to make your text extraction experience seamless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-900 border border-dark-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 animate-slide-in-left animate-delay-100">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-glow">
                <FiImage className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Image Enhancement</h3>
              <p className="text-dark-300">
                Our AI-powered preprocessing improves image quality to ensure the highest accuracy text extraction possible.
              </p>
            </div>
            
            <div className="bg-dark-900 border border-dark-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 animate-slide-in-left">
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-glow">
                <FiFileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Multi-language Support</h3>
              <p className="text-dark-300">
                Extract text from images in multiple languages including English, Hindi, Spanish, French, German, and more.
              </p>
            </div>
            
            <div className="bg-dark-900 border border-dark-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 animate-slide-in-right animate-delay-100">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-glow">
                <FiSettings className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Structured Data Extraction</h3>
              <p className="text-dark-300">
                Perfect for invoices and forms, our OCR system can identify key-value pairs and organize data intelligently.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a href="/features" className="btn btn-primary inline-flex items-center">
              Explore All Features <FiArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 animate-slide-in-left">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-sky-500 text-transparent bg-clip-text">
                About the Developer
              </h2>
              <p className="text-dark-300 mb-6">
                This OCR system was developed by Vaibhav Chauhan, a Full-Stack Developer, Data Analyst, and Open Source Contributor 
                passionate about creating accessible technology solutions.
              </p>
              <a href="/about" className="btn btn-secondary inline-flex items-center">
                Learn More <FiArrowRight className="ml-2" />
              </a>
            </div>
            <div className="md:w-1/2 flex justify-center animate-slide-in-right">
              <div className="relative w-full max-w-md bg-dark-900 border border-dark-800 rounded-lg p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-sky-500 flex items-center justify-center text-white text-2xl font-bold">
                    VC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Vaibhav Chauhan</h3>
                    <p className="text-dark-300">Full-Stack Developer</p>
                  </div>
                </div>
                <p className="text-dark-300 italic">
                  "I built this OCR system to make text extraction accessible to everyone. The technology should work for you, not the other way around."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
