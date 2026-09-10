import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import ProductSection from '../components/ProductSection';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import Solutions from '../components/Solutions';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import DemoModal from '../components/DemoModal';
import AuthModal from '../components/AuthModal';
import SalesModal from '../components/SalesModal';
import BackToTop from '../components/BackToTop';

const LandingPage = ({ onNavigateDashboard }) => {
  const { isAuthenticated } = useAuth();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  const openLogin = () => {
    if (isAuthenticated && onNavigateDashboard) {
      onNavigateDashboard();
    } else {
      setAuthModal({ isOpen: true, mode: 'login' });
    }
  };

  const openSignUp = () => {
    if (isAuthenticated && onNavigateDashboard) {
      onNavigateDashboard();
    } else {
      setAuthModal({ isOpen: true, mode: 'signup' });
    }
  };

  const closeAuth = () => setAuthModal({ isOpen: false, mode: 'login' });

  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);

  const openSales = () => setIsSalesOpen(true);
  const closeSales = () => setIsSalesOpen(false);

  return (
    <div className="app-root no-overflow" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenLogin={openLogin} onOpenSignUp={openSignUp} />
      
      <main style={{ flex: 1 }}>
        <Hero onOpenSignUp={openSignUp} onOpenDemo={openDemo} />
        <TrustedBy />
        <Features />
        <ProductSection onOpenSignUp={openSignUp} />
        <HowItWorks />
        <Stats />
        <Solutions onOpenSignUp={openSignUp} />
        <Testimonials />
        <Pricing onOpenSignUp={openSignUp} onOpenSales={openSales} />
        <FAQ />
        <FinalCTA onOpenSignUp={openSignUp} onOpenSales={openSales} />
      </main>

      <Footer />
      <BackToTop />

      {/* Interactive Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={closeDemo} onOpenSignUp={openSignUp} />
      <AuthModal isOpen={authModal.isOpen} initialMode={authModal.mode} onClose={closeAuth} onSuccess={onNavigateDashboard} />
      <SalesModal isOpen={isSalesOpen} onClose={closeSales} />
    </div>
  );
};

export default LandingPage;
