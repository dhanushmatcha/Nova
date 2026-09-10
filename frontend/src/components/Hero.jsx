import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Bot,
  Kanban,
  Zap,
  BarChart3,
  Search,
  Plus,
  TrendingUp,
  Clock,
  UserCheck,
  ChevronRight,
  Send
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = ({ onOpenSignUp, onOpenDemo }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        paddingTop: 'calc(var(--nav-height) + 3rem)',
        paddingBottom: '5rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Glow Orbs */}
      <div
        className="glow-orb glow-orb-violet"
        style={{ width: '500px', height: '500px', top: '-100px', left: '20%' }}
      />
      <div
        className="glow-orb glow-orb-cyan"
        style={{ width: '400px', height: '400px', top: '100px', right: '15%' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
          style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}
        >
          {/* Eyebrow Badge */}
          <div style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
            <div className="badge">
              <Sparkles size={14} /> AI-POWERED WORKSPACE
            </div>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem'
            }}
          >
            Build Better.{' '}
            <span className="gradient-text">Work Smarter.</span>
          </h1>

          {/* Supporting Description */}
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.6
            }}
          >
            Turn ideas into impact with NOVA — an AI-powered workspace that helps modern teams plan, automate, and collaborate without the busywork.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}
          >
            <button
              onClick={onOpenSignUp}
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '0.95rem 2rem' }}
            >
              Start for free <ArrowRight size={18} />
            </button>
            <button
              onClick={onOpenDemo}
              className="btn btn-secondary"
              style={{ fontSize: '1rem', padding: '0.95rem 2rem' }}
            >
              <Play size={16} fill="currentColor" /> See how it works
            </button>
          </div>

          {/* Trust Note */}
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
            No credit card required • Free 14-day trial
          </p>
        </div>

        {/* Sophisticated Pure CSS SaaS Product Dashboard Mockup */}
        <div className="hero-dashboard-wrapper">

          {/* Floating AI Notification Card */}
          <div className="floating-ai-badge">
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF'
            }}>
              <Bot size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-violet-light)' }}>NOVA AI ASSISTANT</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>Generated Q3 Sprint Roadmap</div>
            </div>
          </div>

          {/* Main Dashboard Window */}
          <div className="dashboard-window">
            {/* Top Bar Header */}
            <div className="dashboard-header">
              <div className="window-dots">
                <div className="window-dot window-dot-red" />
                <div className="window-dot window-dot-yellow" />
                <div className="window-dot window-dot-green" />
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '0.25rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Search size={12} /> app.nova.ai/workspace/q3-sprint
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#8B5CF6' }} />
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#06B6D4' }} />
              </div>
            </div>

            {/* Dashboard Workspace Grid */}
            <div className="dashboard-body">
              {/* Left Sidebar */}
              <div className="dashboard-sidebar">
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  WORKSPACE
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div className="dashboard-nav-item active">
                    <Kanban size={16} /> Product Roadmap
                  </div>
                  <div className="dashboard-nav-item">
                    <Bot size={16} /> AI Automation Rules
                  </div>
                  <div className="dashboard-nav-item">
                    <BarChart3 size={16} /> Team Analytics
                  </div>
                  <div className="dashboard-nav-item">
                    <Zap size={16} /> Integrations (12)
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ACTIVE TEAM</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--accent-violet)',
                      color: '#FFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      NX
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Nova Core Team</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--success)' }}>● 8 members online</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Main Dashboard Content */}
              <div className="dashboard-content-area">
                {/* Metric Summary Cards Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                  <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      Sprint Velocity <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>+42.8%</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--success)' }}>↑ 18 tasks automated</div>
                  </div>

                  <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      AI Hours Saved <Clock size={14} style={{ color: 'var(--accent-violet)' }} />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>148.5 hrs</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-violet-light)' }}>Target: 160 hrs/mo</div>
                  </div>

                  <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      Workflow Health <UserCheck size={14} style={{ color: 'var(--accent-cyan)' }} />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>98.4%</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>0 bottlenecks detected</div>
                  </div>
                </div>

                {/* Interactive Simulated AI Task Execution List */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={16} style={{ color: 'var(--accent-violet)' }} /> Live AI Tasks & Workflow Automation
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                      Auto-Pilot Active
                    </span>
                  </div>

                  {/* Task Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Auto-summarize customer feedback from Intercom & Slack</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed 2m ago</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-violet)' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Generate Figma UI component specifications & API stubs</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-violet-light)' }}>Processing (82%)</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Schedule release sync & assign reviewer based on git blame</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Queued</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Assistant & Action Panel */}
              <div className="dashboard-right-panel">
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bot size={16} style={{ color: 'var(--accent-violet)' }} /> NOVA Copilot
                </div>

                <div style={{
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.5,
                  color: 'var(--text-secondary)'
                }}>
                  <p style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    💡 Intelligent Suggestion:
                  </p>
                  "Sprint #44 has 3 unassigned blocking PRs. Would you like me to auto-assign based on team bandwidth?"
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      padding: '0.35rem 0.75rem',
                      background: 'var(--accent-violet)',
                      color: '#FFF',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      Apply Fix
                    </button>
                    <button style={{
                      padding: '0.35rem 0.75rem',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem'
                    }}>
                      Dismiss
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <input
                      type="text"
                      placeholder="Ask NOVA anything..."
                      readOnly
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.8125rem',
                        width: '100%',
                        outline: 'none'
                      }}
                    />
                    <Send size={14} style={{ color: 'var(--accent-violet-light)' }} />
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

export default Hero;
