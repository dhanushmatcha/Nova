import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: 'var(--accent-gradient)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
        cursor: 'pointer',
        zIndex: 90,
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        animation: 'fadeInUp 0.3s ease forwards'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) translateY(0)')}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
