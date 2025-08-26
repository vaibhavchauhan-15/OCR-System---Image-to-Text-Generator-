import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiGithub, FiLinkedin, FiMail, FiGlobe, FiTwitter, FiInstagram } from 'react-icons/fi';

// Add metadata export for better SEO
export const metadata = {
  title: 'About | OCR System - Image to Text Generator',
  description: 'Learn about the developer behind the OCR system and other projects',
};

// Mark the page as static with no data revalidation needed
export const dynamic = 'force-static';
export const revalidate = false;

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-950 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
                About The Developer
              </h1>
              <p className="text-xl text-gray-600 dark:text-dark-300 max-w-3xl mx-auto">
                Learn more about the creator behind this OCR system
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg p-8 sticky top-8">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-primary-500">
                      <Image 
                        src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif" 
                        alt="Vaibhav Chauhan" 
                        fill
                        className="object-cover"
                        priority
                        loading="eager"
                      />
                    </div>
                    <h2 className="text-2xl font-bold">Vaibhav Chauhan</h2>
                    <p className="text-primary-400 mb-2">Full-Stack Developer | Data Analyst | Open Source Contributor</p>
                    <p className="text-gray-500 dark:text-dark-300 text-sm mb-4">Vadodara, Gujarat, India 🇮🇳</p>
                    
                    <div className="flex space-x-4 mb-6">
                      <a 
                        href="https://github.com/vaibhavchauhan-15" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-dark-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="GitHub"
                      >
                        <FiGithub className="h-6 w-6" />
                      </a>
                      <a 
                        href="https://linkedin.com/in/vaibhavchauhan15" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-dark-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <FiLinkedin className="h-6 w-6" />
                      </a>
                      <a 
                        href="mailto:vaibhavchauhan12353@gmail.com" 
                        className="text-gray-500 dark:text-dark-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="Email"
                      >
                        <FiMail className="h-6 w-6" />
                      </a>
                      <a 
                        href="https://www.vaibhavchauhan.tech" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-dark-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="Portfolio"
                      >
                        <FiGlobe className="h-6 w-6" />
                      </a>
                    </div>
                    
                    <a 
                      href="https://www.vaibhavchauhan.tech" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full"
                    >
                      View Full Portfolio
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-dark-800 pt-6">
                    <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'MongoDB', 'Express', 'Next.js', 'TailwindCSS', 'Docker'].map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-200 dark:bg-dark-800 rounded-full text-xs font-medium text-gray-700 dark:text-dark-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="space-y-12">
                  <div className="bg-dark-900 border border-dark-800 rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-6">About Me</h3>
                    <div className="prose prose-dark max-w-none">
                      <p className="text-dark-300 mb-4">
                        I'm Vaibhav Chauhan, a passionate Full-Stack Developer with expertise in MERN stack, Data Analytics, 
                        and AI/ML integration. My journey in tech has been driven by a desire to transform data chaos into 
                        elegant narratives and build scalable web solutions that solve real-world problems.
                      </p>
                      <p className="text-dark-300 mb-4">
                        With a strong background in both development and data science, I bring a unique perspective to 
                        projects that require both technical expertise and analytical thinking. I'm particularly 
                        interested in the intersection of AI and web technologies, which led to the creation of 
                        this OCR system.
                      </p>
                      <p className="text-dark-300">
                        When I'm not coding, you'll find me contributing to open-source projects, mentoring aspiring 
                        developers, or exploring the latest advancements in technology. I believe in building applications 
                        that are not only functional but also accessible and user-friendly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-dark-900 border border-dark-800 rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-6">Featured Projects</h3>
                    <div className="space-y-8">
                      <div className="border border-dark-800 rounded-lg p-6 transition-all duration-300 hover:border-primary-500">
                        <h4 className="text-xl font-semibold mb-2">IndicLaw AI</h4>
                        <p className="text-sm text-primary-400 mb-3">Multilingual Legal Assistant</p>
                        <p className="text-dark-300 text-sm mb-4">
                          A multilingual legal assistant supporting 5+ Indian languages with PDF/DOCX summarization capabilities and accurate legal Q&A functionality.
                          Built with MERN stack, OpenAI GPT-3.5, IndicNLP, and Firebase.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">MERN</span>
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">OpenAI</span>
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">IndicNLP</span>
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">Firebase</span>
                        </div>
                      </div>
                      
                      <div className="border border-dark-800 rounded-lg p-6 transition-all duration-300 hover:border-primary-500">
                        <h4 className="text-xl font-semibold mb-2">Real Estate Management System</h4>
                        <p className="text-sm text-primary-400 mb-3">Full-Stack MERN Platform</p>
                        <p className="text-dark-300 text-sm mb-4">
                          A comprehensive platform for real estate management featuring role-based authentication, real-time chat, 
                          and property listings. Optimized for performance with 25% load speed improvement and PWA support.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">MongoDB</span>
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">Express</span>
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">React</span>
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">Node.js</span>
                          <span className="px-2 py-1 bg-dark-800 rounded-full text-xs font-medium text-dark-300">Socket.io</span>
                        </div>
                        <a 
                          href="https://realestate-mern-vaibhav.vercel.app" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-400 text-sm hover:underline"
                        >
                          View Live Demo →
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-900 border border-dark-800 rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-6">Certifications & Achievements</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-500/20 text-primary-500 mr-3 mt-0.5">🏆</span>
                        <div>
                          <h4 className="font-semibold">AI/ML Hackathon Finalist</h4>
                          <p className="text-dark-300 text-sm">Parul University x myOnsite Healthcare (2024)</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-500/20 text-primary-500 mr-3 mt-0.5">🥇</span>
                        <div>
                          <h4 className="font-semibold">1st Place - National Python Programming Championship</h4>
                          <p className="text-dark-300 text-sm">2023</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-500/20 text-primary-500 mr-3 mt-0.5">📜</span>
                        <div>
                          <h4 className="font-semibold">Power BI Professional Certification</h4>
                          <p className="text-dark-300 text-sm">PwC Forage</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-500/20 text-primary-500 mr-3 mt-0.5">🚀</span>
                        <div>
                          <h4 className="font-semibold">Open Source Contributor</h4>
                          <p className="text-dark-300 text-sm">15+ repositories, 100+ contributions</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-900 border border-dark-800 rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-6">Contact Me</h3>
                    <p className="text-dark-300 mb-6">
                      I'm always open to new opportunities, collaborations, or just a friendly chat about technology. 
                      Feel free to reach out through any of the channels below:
                    </p>
                    <div className="space-y-4">
                      <a 
                        href="mailto:vaibhavchauhan12353@gmail.com" 
                        className="flex items-center group"
                      >
                        <FiMail className="h-5 w-5 mr-3 text-primary-400" />
                        <span className="text-dark-300 group-hover:text-white transition-colors">vaibhavchauhan12353@gmail.com</span>
                      </a>
                      <a 
                        href="https://linkedin.com/in/vaibhavchauhan15" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center group"
                      >
                        <FiLinkedin className="h-5 w-5 mr-3 text-primary-400" />
                        <span className="text-dark-300 group-hover:text-white transition-colors">linkedin.com/in/vaibhavchauhan15</span>
                      </a>
                      <a 
                        href="https://github.com/vaibhavchauhan-15" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center group"
                      >
                        <FiGithub className="h-5 w-5 mr-3 text-primary-400" />
                        <span className="text-dark-300 group-hover:text-white transition-colors">github.com/vaibhavchauhan-15</span>
                      </a>
                      <a 
                        href="https://twitter.com/vaibhavchauhan15" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center group"
                      >
                        <FiTwitter className="h-5 w-5 mr-3 text-primary-400" />
                        <span className="text-dark-300 group-hover:text-white transition-colors">twitter.com/vaibhavchauhan15</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-dark-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Amazing Together!</h2>
            <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
              I'm always looking for new challenges and opportunities to collaborate on innovative projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:vaibhavchauhan12353@gmail.com"
                className="btn btn-primary"
              >
                Get In Touch
              </a>
              <a
                href="https://www.vaibhavchauhan.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
