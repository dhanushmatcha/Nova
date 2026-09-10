import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, ArrowRight, Lock, Mail, User, Building, CheckCircle2, AlertCircle } from 'lucide-react';

const AuthModal = ({ isOpen, initialMode = 'login', onClose, onSuccess }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setIsSubmitted(false);
    setErrorMsg('');
  }, [initialMode, isOpen]);

  // Lock body scroll & Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    let res;
    if (mode === 'login') {
      res = await login({ email, password });
    } else {
      res = await register({ name: fullName || 'New User', email, password, company: companyName });
    }

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }, 1000);
    } else {
      setErrorMsg(res.message || 'Authentication request failed.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
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
          maxWidth: '460px',
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
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF'
            }}>
              <Sparkles size={16} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              NOVA
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.75rem' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--success)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {mode === 'login' ? 'Welcome Back!' : 'Account Created!'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Authenticated via REST API & JWT session initialized.
              </p>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              <div style={{
                display: 'flex',
                background: 'var(--bg-primary)',
                padding: '0.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-subtle)'
              }}>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(''); }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    background: mode === 'login' ? 'var(--accent-violet)' : 'transparent',
                    color: mode === 'login' ? '#FFF' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMsg(''); }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    background: mode === 'signup' ? 'var(--accent-violet)' : 'transparent',
                    color: mode === 'signup' ? '#FFF' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Sign Up Free
                </button>
              </div>

              <h2 id="auth-modal-title" style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                {mode === 'login' ? 'Sign in to NOVA' : 'Start your 14-day free trial'}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                {mode === 'login' ? 'Enter credentials to authenticate via Express REST API.' : 'No credit card required. Instant account setup.'}
              </p>

              {errorMsg && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#F87171',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertCircle size={15} /> {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mode === 'signup' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Full Name
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Sarah Chen"
                          style={{
                            width: '100%',
                            padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-medium)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Company Name
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Building size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Vertex Technologies"
                          style={{
                            width: '100%',
                            padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-medium)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Work Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@vertex.io"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-medium)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Password
                    </label>
                    {mode === 'login' && (
                      <a href="#" style={{ fontSize: '0.75rem', color: 'var(--accent-violet-light)' }}>
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-medium)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}
                >
                  {isSubmitting ? 'Authenticating...' : mode === 'login' ? 'Sign In to Workspace' : 'Create Free Account'} <ArrowRight size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
