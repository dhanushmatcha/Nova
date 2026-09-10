import React, { useState } from 'react';
import { api } from '../services/api';
import { ArrowRight, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FinalCTA = ({ onOpenSignUp, onOpenSales }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // null | 'success' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setNewsletterStatus('error');
      setFeedbackMsg('Please enter a valid email address.');
      return;
    }

    try {
      const res = await api.subscribeNewsletter({ email });
      if (res.success) {
        setNewsletterStatus('success');
        setFeedbackMsg(res.message || 'Successfully subscribed to NOVA updates!');
        setEmail('');
      } else {
        setNewsletterStatus('error');
        setFeedbackMsg(res.message || 'Subscription failed.');
      }
    } catch (err) {
      setNewsletterStatus('error');
      setFeedbackMsg(err.message || 'Error connecting to newsletter service.');
    }
  };

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(139, 92, 246, 0.3)'
          }}
        >
          {/* Ambient Glows */}
          <div className="glow-orb glow-orb-violet" style={{ width: '400px', height: '400px', top: '-50%', left: '30%', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                <Sparkles size={14} /> GET STARTED TODAY
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: '#FFFFFF',
              letterSpacing: '-0.025em'
            }}>
              Ready to work smarter?
            </h2>

            <p style={{
              fontSize: '1.15rem',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto'
            }}>
              Join thousands of teams using NOVA to turn busywork into meaningful progress.
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <button
                onClick={onOpenSignUp}
                className="btn"
                style={{
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontWeight: 700,
                  padding: '0.95rem 2.25rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                Start for free <ArrowRight size={18} />
              </button>

              <button
                onClick={onOpenSales}
                className="btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '0.95rem 2.25rem'
                }}
              >
                Talk to sales
              </button>
            </div>

            {/* Newsletter Input */}
            <div style={{
              maxWidth: '480px',
              margin: '0 auto',
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(10px)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterStatus) setNewsletterStatus(null);
                  }}
                  placeholder="Enter your work email for product updates..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: '0.75rem 1rem',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Subscribe <Send size={14} />
                </button>
              </form>
            </div>

            {/* Feedback Message */}
            {newsletterStatus && (
              <div style={{
                marginTop: '1rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: newsletterStatus === 'success' ? '#34D399' : '#F87171'
              }}>
                {newsletterStatus === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {feedbackMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
