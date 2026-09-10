import React from 'react';
import { Sparkles, Linkedin, Twitter, Github } from 'lucide-react';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Integrations', href: '#product' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Changelog', href: '#' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Startups', href: '#solutions' },
      { name: 'Product Teams', href: '#solutions' },
      { name: 'Marketing', href: '#solutions' },
      { name: 'Enterprise', href: '#solutions' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ]
  }
];

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                <Sparkles size={18} />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.35rem',
                color: 'var(--text-primary)'
              }}>
                NOVA
              </span>
            </a>

            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              maxWidth: '280px'
            }}>
              NOVA is an AI-powered productivity platform helping modern teams plan, automate, and collaborate without the busywork.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <a
                href="#"
                aria-label="LinkedIn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-violet-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#"
                aria-label="Twitter / X"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-violet-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-violet-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
                letterSpacing: '0.05em'
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        transition: 'color var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.target.style.color = 'var(--accent-violet-light)')}
                      onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 NOVA Platforms, Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit' }}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
