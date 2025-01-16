import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, ExternalLink, Sun, Moon } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Custom cursor animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated text split effect
  const AnimatedText = ({ text, className }) => {
    return (
      <div className="overflow-hidden">
        <div className="flex flex-wrap">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={`inline-block transform transition-transform duration-700 ${className}`}
              style={{
                transitionDelay: `${index * 50}ms`,
                transform: isLoading ? 'translateY(100%)' : 'translateY(0)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    } transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <AnimatedText 
            text="Loading..." 
            className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} 
          />
        </div>
      </div>
    </div>
  );

  // Custom Cursor
  const CustomCursor = () => (
    <div
      ref={cursorRef}
      className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference
        transition-transform duration-300 ease-out ${isHovered ? 'scale-150' : 'scale-100'}`}
      style={{
        background: 'white',
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
        transform: `translate(${isHovered ? '5px, 5px' : '0, 0'}) scale(${isHovered ? 1.5 : 1})`,
      }}
    />
  );

  // Accent Animation Component
  const AccentShape = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: isDarkMode ? 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)' : 
                                 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, rgba(79,70,229,0) 70%)',
          width: '40vw',
          height: '40vw',
          transition: 'all 0.3s ease-out',
        }}
      />
    </div>
  );

  const [typedText, setTypedText] = useState('');
  const fullText = "Full Stack Developer & UI/UX Designer";
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[textIndex]);
        setTextIndex(textIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [textIndex]);

  // Interactive Navigation Menu
  const NavigationMenu = () => (
    <div className={`fixed top-0 left-0 w-full h-full z-40 transition-all duration-500 ${
      isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
    } ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="space-y-8">
          {['home', 'about', 'projects', 'contact'].map((item) => (
            <div key={item} className="overflow-hidden">
              <button
                onClick={() => {
                  setActiveSection(item);
                  setIsMenuOpen(false);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`text-4xl font-bold capitalize transform transition-all duration-300 ${
                  activeSection === item
                    ? isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } hover:scale-110 hover:translate-x-4`}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <LoadingScreen />
      <CustomCursor />
      <AccentShape />
      
      {/* Navigation */}
      <nav className={`fixed w-full shadow-sm z-50 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span 
                className={`text-2xl font-bold transition-all duration-300 ${
                  isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                } hover:scale-105 transform`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Portfolio
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <NavigationMenu />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <section 
            className={`min-h-screen flex items-center justify-center transition-all duration-1000 ${
              isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-indigo-50 to-white'
            }`}
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <div className="text-center px-4 relative z-10">
              <div className="mb-6">
                <AnimatedText 
                  text="Hassan" 
                  className={`text-6xl md:text-8xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                />
                <AnimatedText 
                  text="Zaib" 
                  className={`text-6xl md:text-8xl font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                />
              </div>
              
              <div className="overflow-hidden mb-8">
                <p className={`text-xl md:text-2xl font-light ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                {['GitHub', 'LinkedIn', 'Contact'].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`px-6 py-3 rounded-full border-2 transition-all duration-300 transform hover:scale-105 hover:rotate-3 ${
                      isDarkMode 
                        ? 'border-gray-700 text-gray-300 hover:border-indigo-400 hover:text-indigo-400' 
                        : 'border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600'
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Add other sections here... */}
      </main>
    </div>
  );
};

export default Portfolio;
