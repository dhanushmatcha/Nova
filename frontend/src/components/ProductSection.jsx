import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Layers, Cpu, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProductSection = ({ onOpenSignUp }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('planning');

  const tabPreviews = {
    planning: {
      title: 'AI Backlog Prioritization',
      detail: 'NOVA analyzes customer feedback, team velocity, and technical dependencies to automatically sort sprint items by business impact.',
      statLabel: 'Sprint Accuracy',
      statVal: '96.2%'
    },
    automation: {
      title: 'No-Code Workflow Engine',
      detail: 'Set automated triggers across Slack, GitHub, and Jira so status changes, code reviews, and deployments run on auto-pilot.',
      statLabel: 'Weekly Time Saved',
      statVal: '14.5 hrs/user'
    },
    collaboration: {
      title: 'Unified Workspace Context',
      detail: 'Eliminate context switching. Every doc, ticket, wireframe, and thread lives in a single live update stream.',
      statLabel: 'Context Alignment',
      statVal: '100% Sync'
    }
  };

  return (
    <section id="product" className="section-padding" style={{ position: 'relative', background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Visual Product Mockup */}
          <div style={{ position: 'relative' }}>
            <div className="glow-orb glow-orb-violet" style={{ width: '300px', height: '300px', top: '10%', left: '0%' }} />

            <div className="glass-card" style={{ padding: '1.75rem', position: 'relative', zIndex: 1 }}>
              {/* Tab Selector Buttons */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                background: 'var(--bg-primary)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <button
                  onClick={() => setActiveTab('planning')}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    background: activeTab === 'planning' ? 'var(--accent-violet)' : 'transparent',
                    color: activeTab === 'planning' ? '#FFF' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Sparkles size={14} /> Planning
                </button>

                <button
                  onClick={() => setActiveTab('automation')}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    background: activeTab === 'automation' ? 'var(--accent-violet)' : 'transparent',
                    color: activeTab === 'automation' ? '#FFF' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Cpu size={14} /> Automation
                </button>

                <button
                  onClick={() => setActiveTab('collaboration')}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    background: activeTab === 'collaboration' ? 'var(--accent-violet)' : 'transparent',
                    color: activeTab === 'collaboration' ? '#FFF' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <MessageSquare size={14} /> Sync
                </button>
              </div>

              {/* Display Area for Active Feature */}
              <div style={{
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge" style={{ fontSize: '0.7rem' }}>
                    LIVE PREVIEW
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {tabPreviews[activeTab].statLabel}: {tabPreviews[activeTab].statVal}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {tabPreviews[activeTab].title}
                </h4>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {tabPreviews[activeTab].detail}
                </p>

                {/* Visual Progress / Activity Indicator Bar */}
                <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      <span>AI Model Execution</span>
                      <span style={{ color: 'var(--accent-violet-light)' }}>Active</span>
                    </div>
                    <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '88%', background: 'var(--accent-gradient)', borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span className="badge">ONE WORKSPACE. INFINITE POSSIBILITIES.</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              letterSpacing: '-0.025em'
            }}>
              Your team's work, <span className="gradient-text">intelligently connected.</span>
            </h2>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '2rem'
            }}>
              NOVA replaces scattered project management boards, isolated chat channels, and manual status spreadsheets with a unified intelligent operational core.
            </p>

            {/* 3 Key Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--accent-violet-light)', marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Plan projects with AI-powered insights
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Spot bottlenecks before they delay launches using predictive milestone analytics.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--accent-violet-light)', marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Automate repetitive workflows
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Let intelligent bots auto-assign tickets, trigger build notifications, and draft sprint summaries.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--accent-violet-light)', marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Keep every conversation and task connected
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Maintain seamless alignment across cross-functional product, design, and engineering teams.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenSignUp}
              className="btn btn-primary"
              style={{ padding: '0.9rem 2rem' }}
            >
              Explore NOVA <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
