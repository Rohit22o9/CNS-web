import React, { useEffect } from 'react';
import { Star, RotateCcw, ArrowRight, Home, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompletionScreenProps {
  unitId: number;
  unitTitle: string;
  score: number;
  maxScore: number;
  onRetry: () => void;
  onNextUnit: (() => void) | null; // null if it's the last unit
  onHome: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  unitId,
  unitTitle,
  score,
  maxScore,
  onRetry,
  onNextUnit,
  onHome
}) => {
  const percentage = Math.round((score / maxScore) * 100);
  
  // Calculate stars: 3 for >90%, 2 for >70%, 1 for >40%, 0 otherwise
  const starsEarned = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 40 ? 1 : 0;

  useEffect(() => {
    // Blast confetti on load
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4F9DFF', '#EAF4FF', '#27AE60', '#F39C12']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4F9DFF', '#EAF4FF', '#27AE60', '#F39C12']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
    
    // Save progress to local storage
    localStorage.setItem(`cns_unit_${unitId}_progress`, '100');
    localStorage.setItem(`cns_unit_${unitId}_score`, `${score}`);
  }, [unitId, score]);

  // Encouraging Message
  const getEncouragingMessage = () => {
    if (percentage >= 90) {
      return "Phenomenal Job! You have absolute mastery over this unit's concepts!";
    } else if (percentage >= 70) {
      return "Wonderful Effort! You've built a highly solid understanding of the network systems here.";
    } else if (percentage >= 40) {
      return "Nice job completing the unit! Go back and review the questions to aim for 3 stars.";
    } else {
      return "Don't worry! CNS can be challenging. Try retrying the unit to boost your understanding!";
    }
  };

  // SVG Circular progress variables
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="quiz-card animate-scale-in" style={{
      maxWidth: '600px',
      margin: '2rem auto',
      backgroundColor: 'var(--color-white)',
      padding: '3rem 2rem',
      borderRadius: '32px',
      boxShadow: 'var(--shadow-medium)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.8rem'
    }}>
      
      {/* Trophy / Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-soft-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-sky-blue)',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <Award size={40} className="animate-bounce-hover" />
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginTop: '0.5rem' }}>
          🎉 Congratulations!
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>
          You completed Unit {unitId}
        </p>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-sky-blue)', fontWeight: 700 }}>
          {unitTitle}
        </span>
      </div>

      {/* Circular Progress Gauge */}
      <div style={{ position: 'relative', width: '130px', height: '130px' }}>
        <svg height="130" width="130">
          <circle
            stroke="var(--color-light-gray)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="65"
            cy="65"
          />
          <circle
            stroke="var(--color-sky-blue)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, strokeLinecap: 'round', transition: 'stroke-dashoffset 1.5s ease-out' }}
            r={normalizedRadius}
            cx="65"
            cy="65"
            transform="rotate(-90 65 65)"
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-navy)' }}>
            {percentage}%
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 700 }}>
            Accuracy
          </span>
        </div>
      </div>

      {/* Stars Grid */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {[1, 2, 3].map((starIndex) => {
          const isActive = starIndex <= starsEarned;
          return (
            <Star
              key={starIndex}
              size={32}
              fill={isActive ? '#F1C40F' : 'transparent'}
              stroke={isActive ? '#F1C40F' : 'var(--color-border)'}
              style={{
                filter: isActive ? 'drop-shadow(0 2px 8px rgba(241, 196, 15, 0.4))' : 'none',
                transform: isActive ? 'scale(1.15)' : 'none',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                animationDelay: `${starIndex * 150}ms`
              }}
            />
          );
        })}
      </div>

      {/* Score details */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        backgroundColor: 'var(--color-light-gray)',
        padding: '1rem 2rem',
        borderRadius: '16px',
        width: '100%',
        justifyContent: 'space-around'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600 }}>SCORE EARNED</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)' }}>{score} pts</span>
        </div>
        <div style={{ width: '1px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600 }}>MAX POSSIBLE</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-light)' }}>{maxScore} pts</span>
        </div>
      </div>

      {/* Encouragement message */}
      <p style={{
        fontSize: '0.92rem',
        color: 'var(--color-text-dark)',
        fontWeight: 500,
        lineHeight: '1.5',
        margin: '0 1rem'
      }}>
        {getEncouragingMessage()}
      </p>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        width: '100%',
        marginTop: '0.5rem'
      }}>
        {onNextUnit && (
          <button
            className="btn-primary"
            onClick={onNextUnit}
            style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
          >
            Next Unit <ArrowRight size={18} />
          </button>
        )}
        <div style={{ display: 'flex', gap: '0.8rem', width: '100%' }}>
          <button
            className="btn-secondary"
            onClick={onRetry}
            style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }}
          >
            <RotateCcw size={16} /> Retry Unit
          </button>
          <button
            className="btn-secondary"
            onClick={onHome}
            style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }}
          >
            <Home size={16} /> Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
