import React, { useState } from 'react';
import { Rocket, Layers, Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from './Common/SectionHeading';
import { solutionsData } from '../data/landingData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
  Rocket: Rocket,
  Layers: Layers,
  Sparkles: Sparkles,
  Building2: Building2
};

const Solutions = ({ onOpenSignUp }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeSolutionId, setActiveSolutionId] = useState('startups');

  const activeSolution = solutionsData.find(s => s.id === activeSolutionId) || solutionsData[0];
  const ActiveIcon = iconMap[activeSolution.icon] || Rocket;

  return (
    <section id="solutions" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading
          badgeText="TAILORED WORKFLOWS"
          title="Built for every kind of team"
          highlightWord="every kind of team"
          subtitle="Whether you're a 5-person startup or an enterprise organization, NOVA scales to your unique workflow demands."
        />

        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
        >
          {/* Solution Tabs Header Nav */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {solutionsData.map((sol) => {
              const Icon = iconMap[sol.icon] || Rocket;
              const isActive = sol.id === activeSolutionId;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveSolutionId(sol.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    background: isActive ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-subtle)',
                    boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Icon size={18} /> {sol.title}
                </button>
              );
            })}
          </div>

          {/* Active Solution Feature Showcase Panel */}
          <div className="glass-card" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Left Details */}
              <div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-violet-light)',
                  marginBottom: '1.5rem'
                }}>
                  <ActiveIcon size={28} />
                </div>

                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {activeSolution.title} Solution
                </h3>

                <p style={{ fontSize: '1.1rem', color: 'var(--accent-violet-light)', fontWeight: 600, marginBottom: '1rem' }}>
                  "{activeSolution.subtitle}"
                </p>

                <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
                  {activeSolution.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  {activeSolution.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.925rem', fontWeight: 500, color: 'var(--text-primary)' }}>{pt}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onOpenSignUp}
                  className="btn btn-primary"
                  style={{ padding: '0.8rem 1.75rem' }}
                >
                  Deploy for {activeSolution.title} <ArrowRight size={16} />
                </button>
              </div>

              {/* Right Visual Graphic */}
              <div style={{
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--border-medium)',
                position: 'relative',
                boxShadow: 'var(--shadow-md)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  WORKFLOW PRESET
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <ActiveIcon size={20} style={{ color: 'var(--accent-violet)' }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{activeSolution.title} Auto-Pilot</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Configured for instant activation</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>Enabled</span>
                  </div>

                  <div style={{
                    padding: '1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Primary Trigger:
                    </p>
                    New release tag merged into main branch → Notify team on Slack & generate release notes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
