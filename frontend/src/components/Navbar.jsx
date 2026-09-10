import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { navLinks } from '../data/landingData';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onOpenLogin, onOpenSignUp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: isScrolled
          ? 'var(--bg-glass)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.2)' : 'none'
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <a href="#" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
          }}>
            <Sparkles size={20} />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.4rem',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)'
          }}>
            NOVA
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <ul style={{ display: 'flex', gap: '1.75rem', listStyle: 'none' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: '0.925rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onOpenLogin}
            className="btn btn-outline"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem' }}
          >
            Log in
          </button>

          <button
            onClick={onOpenSignUp}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
          >
            Get Started <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="mobile-toggle-wrapper" style={{ display: 'none' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              marginRight: '0.5rem'
            }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-panel"
            style={{
              padding: '0.5rem',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            height: 'calc(100vh - var(--nav-height))',
            background: 'var(--bg-primary)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            animation: 'fadeInUp 0.3s ease forwards',
            zIndex: 99
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                    padding: '0.5rem 0'
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Log in
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSignUp();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Get Started <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Responsive Breakpoint Styles */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle-wrapper {
            display: flex !important;
            align-items: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
