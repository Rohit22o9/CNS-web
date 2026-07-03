import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Network, Layers, Globe, Shield, ListChecks } from 'lucide-react';
import type { UnitData } from '../data/unitsData';
import { QuizController } from './QuizController';
import { CompletionScreen } from './CompletionScreen';

interface UnitPageProps {
  unit: UnitData;
  onBackToHome: () => void;
  onSelectUnit: (unitId: number) => void;
  hasNextUnit: boolean;
}

export const UnitPage: React.FC<UnitPageProps> = ({
  unit,
  onBackToHome,
  onSelectUnit,
  hasNextUnit
}) => {
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [initialStep, setInitialStep] = useState<number>(0);
  const [finalScore, setFinalScore] = useState<number>(0);

  // Reset states when switching units
  useEffect(() => {
    setQuizCompleted(false);
    setFinalScore(0);
    setStarted(false);
    setInitialStep(0);
  }, [unit]);

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setQuizCompleted(true);
  };

  const handleRetry = () => {
    setQuizCompleted(false);
    setFinalScore(0);
    setStarted(false);
    setInitialStep(0);
  };

  const handleNextUnit = () => {
    if (hasNextUnit) {
      onSelectUnit(unit.id + 1);
    }
  };

  const startQuizAtStep = (step: number) => {
    setInitialStep(step);
    setStarted(true);
  };

  // Helper to fetch unit-specific icons
  const getUnitIcon = (iconName: string, color: string) => {
    const props = { size: 36, strokeWidth: 2.5, style: { color } };
    switch (iconName) {
      case 'Network':
        return <Network {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'Shield':
        return <Shield {...props} />;
      default:
        return <Network {...props} />;
    }
  };

  const maxPossibleScore = 170; // 17 activities * 10 marks max

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-light-gray)' }}>
      {quizCompleted ? (
        <CompletionScreen
          unitId={unit.id}
          unitTitle={unit.title}
          score={finalScore}
          maxScore={maxPossibleScore}
          onRetry={handleRetry}
          onNextUnit={hasNextUnit ? handleNextUnit : null}
          onHome={onBackToHome}
        />
      ) : !started ? (
        /* Unit Welcome Dashboard / Intro Screen */
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem 1.5rem'
        }} className="animate-fade-in">
          
          <div className="quiz-card" style={{
            maxWidth: '720px',
            width: '100%',
            backgroundColor: 'var(--color-white)',
            borderRadius: '28px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-medium)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem'
          }}>
            {/* Header / Intro info */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                backgroundColor: unit.color + '15', // 15% opacity of unit theme color
                padding: '0.8rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-soft)'
              }}>
                {getUnitIcon(unit.icon, unit.color)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{
                  color: 'var(--color-sky-blue)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Interactive Study Module • Unit {unit.id}
                </span>
                <h1 style={{ fontSize: '1.45rem', color: 'var(--color-navy)', lineHeight: '1.3', margin: 0 }}>
                  {unit.title}
                </h1>
              </div>
            </div>

            {/* Description Text */}
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--color-text-dark)',
              lineHeight: '1.6',
              margin: 0,
              backgroundColor: 'var(--color-soft-blue)',
              padding: '1.1rem 1.4rem',
              borderRadius: '16px',
              borderLeft: '5px solid var(--color-sky-blue)'
            }}>
              {unit.description} This learning session replaces static PDF reading with active visual exercises to help you master core computer networks and security concepts.
            </p>

            {/* Steps / Activities Roadmap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h3 style={{
                fontSize: '0.9rem',
                color: 'var(--color-navy)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <ListChecks size={18} color="var(--color-sky-blue)" /> Learning Path Activities
              </h3>

              <div className="roadmap-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '0.8rem'
              }}>
                <div onClick={() => startQuizAtStep(0)} className="activity-card">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sky-blue)', backgroundColor: 'var(--color-white)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>A</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>Multiple Choice Questions</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>4 Conceptual exercises • +40 Marks</span>
                  </div>
                </div>

                <div onClick={() => startQuizAtStep(4)} className="activity-card">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sky-blue)', backgroundColor: 'var(--color-white)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>B</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>Fill in the Blanks</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>4 Text terminologies (with hints) • +40 Marks</span>
                  </div>
                </div>

                <div onClick={() => startQuizAtStep(8)} className="activity-card">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sky-blue)', backgroundColor: 'var(--color-white)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>C</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>Drag & Drop to Text</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>2 Snappable template paragraphs • +20 Marks</span>
                  </div>
                </div>

                <div onClick={() => startQuizAtStep(10)} className="activity-card">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sky-blue)', backgroundColor: 'var(--color-white)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>D</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>Drag & Drop to Image</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>2 Interactive topology layout maps • +20 Marks</span>
                  </div>
                </div>

                <div onClick={() => startQuizAtStep(12)} className="activity-card">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sky-blue)', backgroundColor: 'var(--color-white)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>E</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>Match the Pairs Matrix</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>4 Interactive line connection nodes • +10 Marks</span>
                  </div>
                </div>

                <div onClick={() => startQuizAtStep(13)} className="activity-card">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sky-blue)', backgroundColor: 'var(--color-white)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>F</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>Applied Numerical & Concepts</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>4 Calculator problems (with formulas) • +40 Marks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grading Details */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.8rem 1.2rem',
              border: '1px dashed var(--color-border)',
              borderRadius: '16px',
              backgroundColor: 'rgba(245, 247, 252, 0.5)'
            }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', fontWeight: 600 }}>MAX POSSIBLE SCORE</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 850, color: 'var(--color-navy)' }}>{maxPossibleScore} Points</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              <button
                onClick={onBackToHome}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}
              >
                <ArrowLeft size={18} /> Back to Dashboard
              </button>
              <button
                onClick={() => startQuizAtStep(0)}
                className="btn-primary"
                style={{ flex: 1.5, justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}
              >
                Start Learning Lab <ArrowRight size={18} />
              </button>
            </div>
            
          </div>
        </div>
      ) : (
        <QuizController
          unit={unit}
          onComplete={handleQuizComplete}
          onBackToHome={onBackToHome}
          onBackToWelcome={() => setStarted(false)}
          initialStep={initialStep}
        />
      )}
    </div>
  );
};
