import React from 'react';
import { trustedCompanies } from '../data/landingData';

const TrustedBy = () => {
  return (
    <section style={{
      padding: '2.5rem 0 4rem 0',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          marginBottom: '2rem'
        }}>
          Trusted by ambitious teams
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'clamp(2rem, 5vw, 4.5rem)'
        }}>
          {trustedCompanies.map((company) => (
            <div
              key={company.name}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
                opacity: 0.7,
                transition: 'all var(--transition-fast)',
                userSelect: 'none',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1';
                e.target.style.color = 'var(--accent-violet-light)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0.7';
                e.target.style.color = 'var(--text-secondary)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {company.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
