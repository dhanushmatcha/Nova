import React from 'react';
import { statsData } from '../data/landingData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';

const StatCard = ({ stat, isVisible }) => {
  const animatedValue = useCounter(stat.rawVal, isVisible, 2000);

  // Format counter value
  const formattedVal = stat.rawVal % 1 !== 0 
    ? animatedValue.toFixed(1) 
    : Math.floor(animatedValue);

  return (
    <div className="glass-card" style={{
      padding: '2.5rem 1.5rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: 800,
        lineHeight: 1,
        marginBottom: '0.75rem',
        letterSpacing: '-0.03em'
      }}>
        <span className="gradient-text">
          {formattedVal}
          {stat.suffix}
        </span>
      </div>
      <p style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }}>
        {stat.label}
      </p>
    </div>
  );
};

const Stats = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="section-padding" style={{
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {statsData.map((stat) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
