import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import SectionHeading from './Common/SectionHeading';
import { faqData } from '../data/landingData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FAQ = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section-padding" style={{ position: 'relative', background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <SectionHeading
          badgeText="GOT QUESTIONS?"
          title="Frequently asked questions"
          highlightWord="asked questions"
          subtitle="Everything you need to know about NOVA's AI productivity platform, trial policy, and security."
        />

        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            const faqId = `faq-content-${index}`;

            return (
              <div
                key={faq.question}
                className="glass-card"
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: isOpen
                    ? '1px solid var(--accent-violet)'
                    : '1px solid var(--border-subtle)'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    background: isOpen ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: isOpen ? 'var(--accent-violet-light)' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <HelpCircle size={18} style={{ color: isOpen ? 'var(--accent-violet)' : 'var(--text-muted)', flexShrink: 0 }} />
                    {faq.question}
                  </span>

                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--accent-violet)' : 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? '#FFF' : 'var(--text-secondary)',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={faqId}
                    style={{
                      padding: '0 1.5rem 1.5rem 3.15rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.975rem',
                      lineHeight: 1.65,
                      animation: 'fadeInUp 0.3s ease forwards'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
