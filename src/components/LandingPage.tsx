import React, { useEffect, useState } from 'react';
import { Network, Layers, Globe, ArrowRightLeft, ShieldCheck, CheckCircle } from 'lucide-react';
import { NetworkAnimation } from './NetworkAnimation';
import type { UnitData } from '../data/unitsData';
import jspmLogo from '../assets/jspm-logo.png';
import jscoeLogo from '../assets/jscoe-logo.png';

interface LandingPageProps {
  units: UnitData[];
  onSelectUnit: (unitId: number) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ units, onSelectUnit }) => {
  const [unitProgress, setUnitProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    // Load progress from localStorage
    const progressMap: Record<number, number> = {};
    units.forEach((unit) => {
      const saved = localStorage.getItem(`cns_unit_${unit.id}_progress`);
      progressMap[unit.id] = saved ? parseInt(saved, 10) : 0;
    });
    setUnitProgress(progressMap);
  }, [units]);

  // Map icon strings to Lucide components
  const getIcon = (iconName: string, color: string) => {
    const props = { size: 28, strokeWidth: 2, style: { color } };
    switch (iconName) {
      case 'Network':
        return <Network {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft {...props} />;
      case 'Shield':
        return <ShieldCheck {...props} />;
      default:
        return <Network {...props} />;
    }
  };

  return (
    <div className="landing-container animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'var(--color-light-gray)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Animated Floating Particles */}
      <div className="bg-dots" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(var(--color-sky-blue) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
        opacity: 0.05,
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <header style={{
        padding: '0.8rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
        borderBottom: '1px solid rgba(79, 157, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Left Side: Logos & App Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <img src={jspmLogo} alt="JSPM Logo" style={{ height: '40px', objectFit: 'contain' }} />
          <img src={jscoeLogo} alt="JSCOE Logo" style={{ height: '40px', objectFit: 'contain' }} />
          <div style={{
            width: '1px',
            height: '30px',
            backgroundColor: 'var(--color-border)',
            margin: '0 0.2rem'
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: 'var(--color-navy)',
              letterSpacing: '-0.5px',
              lineHeight: '1.2'
            }}>EduCNS</span>
            <span style={{
              fontSize: '0.65rem',
              color: 'var(--color-text-light)',
              fontWeight: 600,
              letterSpacing: '0.3px'
            }}>COMPUTER NETWORKS & SECURITY</span>
          </div>
        </div>
        
        {/* Right Side: College Name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
          <span style={{
            fontSize: '0.88rem',
            fontWeight: 800,
            color: 'var(--color-navy)',
            letterSpacing: '0.2px'
          }}>
            JSPM's Jayawantrao Sawant College Of Engineering
          </span>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--color-sky-blue)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginTop: '0.1rem'
          }}>
            Department of Computer Engineering
          </span>
        </div>
      </header>

      {/* Hero Content Section */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '1.2rem',
        padding: '0.6rem 2rem',
        zIndex: 1,
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        {/* Split Section */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '2rem',
          margin: '0.5rem 0'
        }} className="hero-split-row">
          
          {/* Hero text (Left side) */}
          <div style={{
            flex: '1.2 1 350px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <span style={{
              color: 'var(--color-sky-blue)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 800,
              fontSize: '0.8rem'
            }}>Active Interactive Learning</span>
            
            <h1 style={{
              fontSize: '2.0rem',
              lineHeight: '1.2',
              color: 'var(--color-navy)',
              margin: 0
            }}>
              Computer Networks <br />
              <span style={{ color: 'var(--color-sky-blue)' }}>& Security (CNS)</span>
            </h1>

            <h2 style={{
              fontSize: '0.98rem',
              fontWeight: 600,
              color: 'var(--color-text-dark)',
              lineHeight: '1.4',
              margin: 0
            }}>
              Learn Computer Networks through Interactive Quizzes, Visual Activities, and Smart Learning.
            </h2>

            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-light)',
              lineHeight: '1.5',
              margin: 0
            }}>
              This platform helps students understand every CNS unit using interactive quizzes, drag-and-drop exercises, matching activities, and concept-based learning instead of traditional PDFs.
            </p>
          </div>

          {/* Network SVG (Right side) */}
          <div style={{
            flex: '1 1 300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <NetworkAnimation />
          </div>

        </div>

        {/* Unit Cards Row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem' }}>
          <h3 style={{ fontSize: '0.88rem', color: 'var(--color-navy)', letterSpacing: '0.5px' }}>COURSE UNITS</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.8rem',
            width: '100%'
          }} className="units-row">
            {units.map((unit) => {
              const progress = unitProgress[unit.id] || 0;
              const isCompleted = progress === 100;
              return (
                <div
                  key={unit.id}
                  className="premium-card"
                  onClick={() => onSelectUnit(unit.id)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid rgba(79, 157, 255, 0.1)',
                    position: 'relative',
                    minHeight: '190px'
                  }}
                >
                  {isCompleted && (
                    <div style={{
                      position: 'absolute',
                      top: '0.8rem',
                      right: '0.8rem',
                      color: 'var(--color-correct)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}>
                      <CheckCircle size={18} fill="var(--color-soft-green)" />
                    </div>
                  )}

                  {/* Icon & Title */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: unit.color + '15', // 15% opacity of themed color
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getIcon(unit.icon, unit.color)}
                    </div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--color-text-light)',
                      textTransform: 'uppercase'
                    }}>
                      Unit {unit.id}
                    </span>
                    <h4 style={{
                      fontSize: '0.82rem',
                      lineHeight: '1.3',
                      color: 'var(--color-navy)',
                      height: '2.2rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {unit.title}
                    </h4>
                  </div>

                  {/* Progress and Button */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {/* Progress indicator */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span style={{ color: 'var(--color-text-light)' }}>Progress</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{progress}%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: 'var(--color-light-gray)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${progress}%`,
                          height: '100%',
                          backgroundColor: progress === 100 ? 'var(--color-correct)' : 'var(--color-sky-blue)',
                          borderRadius: '3px',
                          transition: 'width 0.8s ease-out'
                        }}></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', width: '100%' }}>
                      <button
                        className="btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectUnit(unit.id);
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.8rem',
                          borderRadius: '8px',
                          justifyContent: 'center',
                          flex: 1
                        }}
                      >
                        {progress > 0 ? 'Continue' : 'Start Learning'}
                      </button>

                      {progress > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Are you sure you want to reset your progress for Unit ${unit.id}?`)) {
                              localStorage.removeItem(`cns_unit_${unit.id}_progress`);
                              localStorage.removeItem(`cns_unit_${unit.id}_score`);
                              setUnitProgress(prev => ({
                                ...prev,
                                [unit.id]: 0
                              }));
                            }
                          }}
                          title="Reset Progress"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.5rem',
                            border: '1.5px solid var(--color-border)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-light)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            width: '36px',
                            height: '36px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-incorrect)';
                            e.currentTarget.style.color = 'var(--color-incorrect)';
                            e.currentTarget.style.backgroundColor = '#FDF3F2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                            e.currentTarget.style.color = 'var(--color-text-light)';
                            e.currentTarget.style.backgroundColor = 'var(--color-white)';
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M3 3v5h5"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer / Info */}
      <footer style={{
        padding: '0.4rem 2rem',
        textAlign: 'center',
        fontSize: '0.72rem',
        color: 'var(--color-text-light)',
        borderTop: '1px solid rgba(79, 157, 255, 0.05)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1
      }}>
        Designed for college CNS curricula • Interactive Concept Labs © {new Date().getFullYear()}
      </footer>

      <style>{`
        body {
          overflow-y: auto !important;
        }
        .landing-container {
          min-height: 100vh;
          overflow-y: auto !important;
        }
        @media (min-width: 992px) {
          .hero-split-row {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 2rem !important;
          }
          .units-row {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
        @media (max-width: 991px) {
          .hero-split-row {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .units-row {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
};
