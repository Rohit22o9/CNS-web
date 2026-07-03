import React, { useState } from 'react';
import { ArrowLeft, Award } from 'lucide-react';
import type { UnitData } from '../data/unitsData';
import { MCQSection } from './MCQSection';
import { FillBlanksSection } from './FillBlanksSection';
import { DragDropText } from './DragDropText';
import { DragDropImage } from './DragDropImage';
import { MatchPairs } from './MatchPairs';
import { NumericalQuiz } from './NumericalQuiz';

interface QuizControllerProps {
  unit: UnitData;
  onComplete: (score: number) => void;
  onBackToHome: () => void;
}

export const QuizController: React.FC<QuizControllerProps> = ({ unit, onComplete, onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [animateKey, setAnimateKey] = useState<number>(0); // forces re-animation on step change

  const totalSteps = 17; // 4 MCQs, 4 Blanks, 2 DragText, 2 DragImage, 1 MatchPairs, 4 Numericals

  const handleAnswer = (_isCorrect: boolean, gainedScore: number) => {
    setScore((prev) => prev + gainedScore);
    const nextStep = currentStep + 1;
    
    if (nextStep >= totalSteps) {
      // Finished all activities!
      onComplete(score + gainedScore);
    } else {
      // Transition to next activity
      setCurrentStep(nextStep);
      setAnimateKey(prev => prev + 1);
    }
  };

  // Determine which activity type to render based on the current step
  const renderCurrentActivity = () => {
    let index = currentStep;

    // 1. MCQs (Step 0 to 3)
    if (index < 4) {
      return (
        <MCQSection
          key={`mcq-${index}`}
          questionData={unit.mcqs[index]}
          onAnswer={handleAnswer}
        />
      );
    }
    index -= 4;

    // 2. Fill in the Blanks (Step 4 to 7)
    if (index < 4) {
      return (
        <FillBlanksSection
          key={`blank-${index}`}
          questionData={unit.fillBlanks[index]}
          onAnswer={handleAnswer}
        />
      );
    }
    index -= 4;

    // 3. Drag & Drop Text (Step 8 to 9)
    if (index < 2) {
      return (
        <DragDropText
          key={`drag-txt-${index}`}
          questionData={unit.dragText[index]}
          onAnswer={handleAnswer}
        />
      );
    }
    index -= 2;

    // 4. Drag & Drop Image (Step 10 to 11)
    if (index < 2) {
      return (
        <DragDropImage
          key={`drag-img-${index}`}
          questionData={unit.dragImage[index]}
          onAnswer={handleAnswer}
        />
      );
    }
    index -= 2;

    // 5. Match the Pairs (Step 12)
    if (index < 1) {
      return (
        <MatchPairs
          key={`match-pairs-${index}`}
          questionData={unit.matchPairs[index]}
          onAnswer={handleAnswer}
        />
      );
    }
    index -= 1;

    // 6. Applied Numerical (Step 13 to 16)
    if (index < 4) {
      return (
        <NumericalQuiz
          key={`numerical-${index}`}
          questionData={unit.numericals[index]}
          onAnswer={handleAnswer}
        />
      );
    }

    return <div>No activity found for this step.</div>;
  };

  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-light-gray)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      
      {/* Quiz Navigation Header */}
      <header className="quiz-header-nav" style={{
        padding: '1.2rem 2.5rem',
        backgroundColor: 'var(--color-white)',
        borderBottom: '1px solid rgba(79, 157, 255, 0.1)',
        boxShadow: 'var(--shadow-soft)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        
        {/* Left side: Back to Home & Unit Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBackToHome}
            className="btn-secondary"
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              borderWidth: '1px',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} /> Home
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>
              Unit {unit.id} Learn Lab
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {unit.title}
            </span>
          </div>
        </div>

        {/* Center side: Progress bar */}
        <div style={{
          flex: '1 1 200px',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
          margin: '0 1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--color-text-light)' }}>
              Completed: <span style={{ color: 'var(--color-navy)' }}>{currentStep}</span> / {totalSteps}
            </span>
            <span style={{ color: 'var(--color-sky-blue)' }}>{progressPercentage}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'var(--color-light-gray)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: 'var(--color-sky-blue)',
              borderRadius: '4px',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}></div>
          </div>
        </div>

        {/* Right side: Score count */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          backgroundColor: 'var(--color-soft-blue)',
          padding: '0.5rem 1rem',
          borderRadius: '12px'
        }}>
          <Award size={18} color="var(--color-sky-blue)" strokeWidth={2.5} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)' }}>
            Marks: <span style={{ fontWeight: 800, color: 'var(--color-navy)' }}>{score}</span>
          </span>
        </div>
      </header>

      {/* Main active question workspace */}
      <main className="quiz-main-layout" style={{
        flex: 1,
        padding: '2rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Animated envelope containing active component */}
        <div 
          key={animateKey}
          className="animate-slide-up"
          style={{ width: '100%' }}
        >
          {renderCurrentActivity()}
        </div>
      </main>

    </div>
  );
};
