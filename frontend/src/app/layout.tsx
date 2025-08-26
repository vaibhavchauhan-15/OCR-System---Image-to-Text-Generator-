import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from './providers';
import Script from 'next/script';

// Font configuration
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
});

// Metadata for SEO
export const metadata = {
  title: 'OCR System - Image to Text Generator',
  description: 'Extract text from images with high accuracy using AI-powered OCR technology',
  keywords: 'OCR, image to text, text extraction, AI, optical character recognition',
  metadataBase: new URL('https://ocr-system.com'),
  openGraph: {
    title: 'OCR System - Image to Text Generator',
    description: 'Extract text from images with high accuracy using AI-powered OCR technology',
    type: 'website',
    locale: 'en_US',
    url: 'https://ocr-system.com',
    siteName: 'OCR System',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OCR System - Image to Text Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCR System - Image to Text Generator',
    description: 'Extract text from images with high accuracy using AI-powered OCR technology',
    creator: '@vaibhavchauhan15',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable} min-h-screen bg-white dark:bg-gradient-to-b dark:from-dark-900 dark:to-dark-950`}>
        <Providers>
          {/* Skip to content link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:p-4 focus:bg-primary-600 focus:text-white focus:z-50"
          >
            Skip to content
          </a>
          
          {/* Main content */}
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          
          {/* Analytics */}
          <Script 
            strategy="afterInteractive" 
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" 
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXX');
            `}
          </Script>
        </Providers>
      </body>
    </html>
  );
}
