import React from 'react';
import { Link, Target, Cpu, TrendingUp } from 'lucide-react';
import SectionHeading from './Common/SectionHeading';
import { howItWorksSteps } from '../data/landingData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
  Link: Link,
  Target: Target,
  Cpu: Cpu,
  TrendingUp: TrendingUp
};

const HowItWorks = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading
          badgeText="SIMPLE PROCESS"
          title="From idea to impact in minutes"
          highlightWord="impact in minutes"
          subtitle="Get started in less than five minutes and transform how your team plans, executes, and delivers software."
        />

        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            position: 'relative'
          }}
        >
          {howItWorksSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || Link;
            return (
              <div
                key={step.number}
                className="glass-card"
                style={{
                  padding: '2.25rem 1.75rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                {/* Step Number Badge & Icon Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: 0.9
                  }}>
                    {step.number}
                  </span>

                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-violet-light)'
                  }}>
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Step Title & Description */}
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {step.description}
                  </p>
                </div>

                {/* Subtle Step Divider / Step Connector */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="step-connector" style={{
                    position: 'absolute',
                    right: '-1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '2rem',
                    height: '2px',
                    background: 'var(--border-medium)',
                    zIndex: 2
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .step-connector {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
