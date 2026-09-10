import React from 'react';

const SectionHeading = ({
  badgeText,
  title,
  highlightWord,
  subtitle,
  centered = true
}) => {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''}`} style={{
      textAlign: centered ? 'center' : 'left',
      marginBottom: '3.5rem',
      maxWidth: centered ? '720px' : '100%',
      margin: centered ? '0 auto 3.5rem auto' : '0 0 3.5rem 0'
    }}>
      {badgeText && (
        <div style={{ marginBottom: '1rem' }}>
          <span className="badge">{badgeText}</span>
        </div>
      )}
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
        fontWeight: 800,
        marginBottom: '1rem',
        letterSpacing: '-0.025em'
      }}>
        {highlightWord ? (
          <>
            {title.split(highlightWord)[0]}
            <span className="gradient-text">{highlightWord}</span>
            {title.split(highlightWord)[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '640px',
          margin: centered ? '0 auto' : '0'
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
