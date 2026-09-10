import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, onRequireAuth }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Sparkles size={24} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <Loader2 size={18} className="animate-spin" /> Verifying workspace authentication...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (onRequireAuth) {
      onRequireAuth();
    }
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF',
          marginBottom: '1.25rem'
        }}>
          <Sparkles size={28} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Authentication Required
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '440px' }}>
          Please log in or create a free NOVA account to access your team dashboard and workspaces.
        </p>
        <button
          onClick={() => onRequireAuth && onRequireAuth()}
          className="btn btn-primary"
          style={{ padding: '0.8rem 1.75rem' }}
        >
          Sign In to Workspace
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
