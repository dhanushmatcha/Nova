import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Sparkles,
  Bot,
  ArrowRight,
  Shield,
  Video,
  Monitor
} from 'lucide-react';

const videoSteps = {
  1: {
    title: 'AI Workspace Triage & Backlog Sorting',
    time: 0,
    badge: 'STEP 01 — TRIAGE ENGINE',
    codeSnippet: 'nova.ai.triage({ repo: "core-platform", prioritizeBy: "impact" })',
    detail: 'AI automatically triages incoming bugs, feature requests, and code reviews.'
  },
  2: {
    title: 'No-Code Workflow Automation Engine',
    time: 5,
    badge: 'STEP 02 — WORKFLOW ENGINE',
    codeSnippet: 'on("pr_approved").trigger("deploy_staging").notify("#slack")',
    detail: 'Triggers multi-service deployments and team notifications automatically.'
  },
  3: {
    title: 'Predictive Velocity & Bottleneck Analytics',
    time: 10,
    badge: 'STEP 03 — PREDICTIVE METRICS',
    codeSnippet: 'analytics.predictBottlenecks({ confidenceThreshold: 0.95 })',
    detail: 'Surfaces capacity risks and projects release dates with 95%+ confidence.'
  }
};

const DemoModal = ({ isOpen, onClose, onOpenSignUp }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [useIframe, setUseIframe] = useState(true); // default to embed iframe for guaranteed playback
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef(null);

  // Close on Escape key & Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setIsPlaying(true);
    } else {
      document.body.style.overflow = '';
      setIsPlaying(false);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStepInfo = videoSteps[activeStep];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(9, 13, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeInUp 0.25s ease forwards'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '860px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 50px rgba(139,92,246,0.3)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.15rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              boxShadow: '0 0 15px rgba(139,92,246,0.4)'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 id="demo-modal-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                NOVA Interactive Platform Walkthrough
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Product Tour & Automated AI Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Real Video Player Container */}
        <div style={{ padding: '1.5rem' }}>

          {/* Player Container */}
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            background: '#090D16',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            boxShadow: '0 12px 35px rgba(0,0,0,0.6)'
          }}>

            {useIframe ? (
              /* Guaranteed Playable Video Stream Iframe */
              <iframe
                title="NOVA Product Demo Video"
                src="https://www.youtube-nocookie.com/embed/9No-FiEInLA?autoplay=1&mute=0&controls=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            ) : (
              /* HTML5 Video Tag */
              <video
                ref={videoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                controls
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            )}

            {/* Top Bar Overlay */}
            <div style={{
              position: 'relative',
              zIndex: 5,
              padding: '0.85rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              background: 'linear-gradient(180deg, rgba(9,13,22,0.85) 0%, rgba(9,13,22,0) 100%)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(139, 92, 246, 0.3)',
                border: '1px solid rgba(139, 92, 246, 0.6)',
                color: '#A78BFA',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.05em'
              }}>
                <Bot size={13} /> {currentStepInfo.badge}
              </div>

              <div style={{ pointerEvents: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setUseIframe(!useIframe)}
                  style={{
                    fontSize: '0.7rem',
                    color: '#A78BFA',
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  {useIframe ? <Video size={12} /> : <Monitor size={12} />} Switch Video Player
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Feature Steps Jump Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {Object.keys(videoSteps).map((stepNumStr) => {
              const stepNum = Number(stepNumStr);
              const step = videoSteps[stepNum];
              const isActive = activeStep === stepNum;

              return (
                <button
                  key={stepNum}
                  onClick={() => setActiveStep(stepNum)}
                  style={{
                    padding: '0.85rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-primary)',
                    border: isActive ? '2px solid var(--accent-violet)' : '1px solid var(--border-subtle)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 15px rgba(139, 92, 246, 0.2)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: isActive ? 'var(--accent-violet-light)' : 'var(--text-muted)' }}>
                    STEP 0{stepNum}
                  </div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                    {step.title.split('&')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} style={{ color: 'var(--success)' }} /> SOC-2 Type II Enterprise Security Standard
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenSignUp();
              }}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.875rem' }}
            >
              Start Free Trial Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
