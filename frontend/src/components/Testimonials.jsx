import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from './Common/SectionHeading';
import { testimonials } from '../data/landingData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Testimonials = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding" style={{ position: 'relative', background: 'rgba(15, 23, 42, 0.3)' }}>
      <div className="container">
        <SectionHeading
          badgeText="CUSTOMER STORIES"
          title="Loved by modern product teams"
          highlightWord="modern product teams"
          subtitle="Discover how leading startups and high-growth organizations use NOVA to ship faster and collaborate smarter."
        />

        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
        >
          {/* Desktop Grid Layout */}
          <div className="testimonials-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="glass-card"
                style={{
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '3px', color: '#F59E0B' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={28} style={{ color: 'rgba(139, 92, 246, 0.3)' }} />
                  </div>

                  {/* Quote Text */}
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    marginBottom: '1.75rem'
                  }}>
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#FFF',
                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {t.role}, <span style={{ color: 'var(--accent-violet-light)' }}>{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel View for Mobile Screens */}
          <div className="testimonials-carousel" style={{ display: 'none', flexDirection: 'column', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: '2rem 1.5rem', width: '100%', maxWidth: '500px' }}>
              <div style={{ display: 'flex', gap: '3px', color: '#F59E0B', marginBottom: '1rem' }}>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                "{testimonials[currentIndex].quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#FFF'
                }}>
                  {testimonials[currentIndex].initials}
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{testimonials[currentIndex].name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                style={{
                  padding: '0.6rem',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)'
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <div style={{ display: 'flex', gap: '6px' }}>
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    style={{
                      width: idx === currentIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: idx === currentIndex ? 'var(--accent-violet)' : 'var(--border-medium)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                style={{
                  padding: '0.6rem',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            display: none !important;
          }
          .testimonials-carousel {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
