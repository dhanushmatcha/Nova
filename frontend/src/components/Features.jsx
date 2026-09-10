import React from 'react';
import {
  Bot,
  Kanban,
  Zap,
  Users,
  BarChart3,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import SectionHeading from './Common/SectionHeading';
import { features } from '../data/landingData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
  Bot: Bot,
  Kanban: Kanban,
  Zap: Zap,
  Users: Users,
  BarChart3: BarChart3,
  ShieldCheck: ShieldCheck
};

const Features = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="features" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading
          badgeText="PLATFORM CAPABILITIES"
          title="Everything your team needs to move faster"
          highlightWord="move faster"
          subtitle="NOVA unifies planning, automation, collaboration, and intelligence into a single seamless workspace built for modern software teams."
        />

        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {features.map((feature) => {
            const IconComponent = iconMap[feature.iconName] || Bot;
            return (
              <div
                key={feature.id}
                className="glass-card"
                style={{
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  {/* Icon & Category Tag Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-violet-light)',
                      transition: 'transform var(--transition-fast)'
                    }}>
                      <IconComponent size={24} />
                    </div>

                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-tertiary)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Detail / Learn More Link */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--accent-violet-light)',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  Explore feature <ArrowUpRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
