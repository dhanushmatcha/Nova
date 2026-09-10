import React, { useState } from 'react';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeading from './Common/SectionHeading';
import { pricingPlans } from '../data/landingData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Pricing = ({ onOpenSignUp, onOpenSales }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading
          badgeText="TRANSPARENT PRICING"
          title="Simple pricing that scales with you"
          highlightWord="scales with you"
          subtitle="Choose the plan that best fits your team's size and stage. Upgrade or cancel anytime with no questions asked."
        />

        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
        >
          {/* Monthly / Annual Billing Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3.5rem'
          }}>
            <span style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: !isAnnual ? 'var(--text-primary)' : 'var(--text-muted)'
            }}>
              Monthly Billing
            </span>

            {/* Switch Control Button */}
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Toggle annual or monthly pricing"
              style={{
                width: '60px',
                height: '32px',
                borderRadius: 'var(--radius-full)',
                background: isAnnual ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                position: 'relative',
                padding: '3px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#FFFFFF',
                position: 'absolute',
                top: '3px',
                left: isAnnual ? '31px' : '3px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
              }} />
            </button>

            <span style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: isAnnual ? 'var(--text-primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Annual Billing
              <span className="badge" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                Save 20%
              </span>
            </span>
          </div>

          {/* Pricing Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}>
            {pricingPlans.map((plan) => {
              const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  className="glass-card"
                  style={{
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    border: plan.isPopular
                      ? '2px solid var(--accent-violet)'
                      : '1px solid var(--border-subtle)',
                    boxShadow: plan.isPopular
                      ? '0 0 40px rgba(139, 92, 246, 0.3)'
                      : 'var(--shadow-md)',
                    transform: plan.isPopular ? 'scale(1.03)' : 'scale(1)',
                    zIndex: plan.isPopular ? 2 : 1
                  }}
                >
                  {/* Popular Badge */}
                  {plan.isPopular && (
                    <div style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--accent-gradient)',
                      color: '#FFF',
                      padding: '0.35rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      <Sparkles size={12} /> {plan.badgeText}
                    </div>
                  )}

                  <div>
                    {/* Plan Name & Description */}
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', minHeight: '40px' }}>
                      {plan.description}
                    </p>

                    {/* Price Header */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.75rem' }}>
                      <span style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: 'var(--text-primary)' }}>
                        ${currentPrice}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {plan.monthlyPrice === 0 ? '' : `/ user / month ${isAnnual ? 'billed annually' : ''}`}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={plan.id === 'business' ? onOpenSales : onOpenSignUp}
                      className={plan.isPopular ? 'btn btn-primary' : 'btn btn-secondary'}
                      style={{ width: '100%', marginBottom: '2rem', padding: '0.85rem 1.5rem' }}
                    >
                      {plan.cta} <ArrowRight size={16} />
                    </button>

                    {/* Features List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                        WHAT'S INCLUDED:
                      </span>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'rgba(139, 92, 246, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent-violet-light)',
                            flexShrink: 0
                          }}>
                            <Check size={12} />
                          </div>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
