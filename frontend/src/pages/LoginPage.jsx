import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const LoginPage = ({ onNavigateRegister, onNavigateDashboard, onNavigateHome }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('dhanu@example.com');
  const [password, setPassword] = useState('StrongPassword123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login({ email, password });
    setIsSubmitting(false);

    if (res.success) {
      if (onNavigateDashboard) onNavigateDashboard();
    } else {
      setError(res.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      <div className="glow-orb glow-orb-violet" style={{ width: '400px', height: '400px', top: '10%', left: '20%' }} />

      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '2.5rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={onNavigateHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF'
            }}>
              <Sparkles size={22} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              NOVA
            </span>
          </button>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Sign in to access your AI productivity workspace.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#F87171',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                placeholder="name@company.com"
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
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--accent-violet-light)' }}>Forgot password?</a>
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
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In to Workspace'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)'
        }}>
          Don't have an account?{' '}
          <button
            onClick={onNavigateRegister}
            style={{ color: 'var(--accent-violet-light)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Sign up free
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
