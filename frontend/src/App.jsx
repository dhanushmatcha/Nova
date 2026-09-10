import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function MainRouter() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login' | 'register' | 'dashboard'
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated and trying to view auth pages
  if (isAuthenticated && (currentView === 'login' || currentView === 'register')) {
    return <DashboardPage onNavigateHome={() => setCurrentView('landing')} />;
  }

  if (currentView === 'login') {
    return (
      <LoginPage
        onNavigateRegister={() => setCurrentView('register')}
        onNavigateDashboard={() => setCurrentView('dashboard')}
        onNavigateHome={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterPage
        onNavigateLogin={() => setCurrentView('login')}
        onNavigateDashboard={() => setCurrentView('dashboard')}
        onNavigateHome={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <ProtectedRoute onRequireAuth={() => setCurrentView('login')}>
        <DashboardPage onNavigateHome={() => setCurrentView('landing')} />
      </ProtectedRoute>
    );
  }

  return (
    <LandingPage
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateLogin={() => setCurrentView('login')}
      onNavigateRegister={() => setCurrentView('register')}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
