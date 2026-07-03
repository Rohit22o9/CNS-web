import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import type { MatchPairsQuestion } from '../data/unitsData';

interface MatchPairsProps {
  questionData: MatchPairsQuestion;
  onAnswer: (isCorrect: boolean, score: number) => void;
}

interface Connection {
  leftText: string;
  rightText: string;
  status: 'correct' | 'incorrect';
}

export const MatchPairs: React.FC<MatchPairsProps> = ({ questionData, onAnswer }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  
  const [activeConnections, setActiveConnections] = useState<Connection[]>([]);
  const [wrongAnimation, setWrongAnimation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Left items are unchanged order (or shuffled)
    const lefts = questionData.pairs.map(p => p.left);
    // Right items are shuffled
    const rights = questionData.pairs.map(p => p.right).sort(() => Math.random() - 0.5);
    
    setLeftItems(lefts);
    setRightItems(rights);
    setSelectedLeft(null);
    setSelectedRight(null);
    setActiveConnections([]);
    setIsCompleted(false);
    setAttempts(0);
  }, [questionData]);

  // Handle window resizing and redrawing lines
  useEffect(() => {
    const handleResize = () => {
      forceUpdate({});
    };
    window.addEventListener('resize', handleResize);
    // Give it a brief delay to let DOM render before drawing lines
    const timer = setTimeout(() => forceUpdate({}), 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [activeConnections, selectedLeft, selectedRight]);

  const handleLeftClick = (item: string) => {
    // If already connected, ignore
    if (activeConnections.some(c => c.leftText === item && c.status === 'correct')) return;
    if (wrongAnimation) return;
    
    setSelectedLeft(item);
    
    // If a right item was already selected, check match
    if (selectedRight) {
      checkMatch(item, selectedRight);
    }
  };

  const handleRightClick = (item: string) => {
    // If already connected, ignore
    if (activeConnections.some(c => c.rightText === item && c.status === 'correct')) return;
    if (wrongAnimation) return;
    
    setSelectedRight(item);
    
    // If a left item was already selected, check match
    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (leftVal: string, rightVal: string) => {
    // Find matching pair in original data
    const pair = questionData.pairs.find(p => p.left === leftVal);
    const isCorrect = pair ? pair.right === rightVal : false;

    if (isCorrect) {
      // Add connection
      const newConn: Connection = { leftText: leftVal, rightText: rightVal, status: 'correct' };
      const updated = [...activeConnections, newConn];
      setActiveConnections(updated);
      
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check completion
      if (updated.length === questionData.pairs.length) {
        setIsCompleted(true);
      }
    } else {
      // Incorrect match
      setAttempts(prev => prev + 1);
      const tempConn: Connection = { leftText: leftVal, rightText: rightVal, status: 'incorrect' };
      setActiveConnections(prev => [...prev, tempConn]);
      setWrongAnimation(true);

      // Disconnect after delay
      setTimeout(() => {
        setActiveConnections(prev => prev.filter(c => !(c.leftText === leftVal && c.rightText === rightVal)));
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongAnimation(false);
      }, 800);
    }
  };

  // Calculate coordinates of connection dots
  const getDotCoords = (itemText: string, side: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };
    
    const containerRect = container.getBoundingClientRect();
    const sanitizedId = itemText.replace(/[^a-zA-Z0-9]/g, '');
    const elementId = `${side}-${sanitizedId}`;
    const dot = document.getElementById(elementId);
    
    if (!dot) return { x: 0, y: 0 };
    const dotRect = dot.getBoundingClientRect();
    
    return {
      x: dotRect.left + dotRect.width / 2 - containerRect.left,
      y: dotRect.top + dotRect.height / 2 - containerRect.top
    };
  };

  const handleContinue = () => {
    const score = Math.max(0, 10 - attempts * 2.5); // lose 2.5 marks per mismatch, min 2 marks
    onAnswer(true, score);
  };

  return (
    <div className="quiz-card animate-scale-in" style={{
      maxWidth: '780px',
      margin: '0 auto',
      backgroundColor: 'var(--color-white)',
      padding: '2rem',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-medium)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-sky-blue)',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontWeight: 700,
          fontSize: '0.8rem',
          textTransform: 'uppercase'
        }}>
          E. Match the Pairs
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
          Connection Quiz • click to link
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0 }}>
        Click a concept card in the left column, then select its matching definition in the right column to connect them.
      </p>

      {/* Matching Board with SVG overlay */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '4rem',
          padding: '1rem 0',
          marginTop: '0.5rem'
        }}
      >
        {/* SVG Drawing Layer */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5
          }}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-sky-blue)" />
            </marker>
          </defs>
          
          {/* Active tentative connection lines */}
          {selectedLeft && selectedRight && (
            (() => {
              const start = getDotCoords(selectedLeft, 'left');
              const end = getDotCoords(selectedRight, 'right');
              return (
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="var(--color-sky-blue)"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
              );
            })()
          )}

          {/* Render established lines */}
          {activeConnections.map((conn, idx) => {
            const start = getDotCoords(conn.leftText, 'left');
            const end = getDotCoords(conn.rightText, 'right');
            const isCorrect = conn.status === 'correct';
            
            return (
              <line
                key={idx}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={isCorrect ? 'var(--color-correct)' : 'var(--color-incorrect)'}
                strokeWidth="3.5"
                style={{
                  filter: isCorrect ? 'drop-shadow(0 2px 4px rgba(39, 174, 96, 0.4))' : 'drop-shadow(0 2px 4px rgba(231, 76, 60, 0.4))',
                  transition: 'all 0.3s ease'
                }}
              />
            );
          })}
        </svg>

        {/* LEFT COLUMN - Concepts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '42%', zIndex: 10 }}>
          {leftItems.map((item, idx) => {
            const isSelected = selectedLeft === item;
            const isConnected = activeConnections.some(c => c.leftText === item && c.status === 'correct');
            const isWrong = activeConnections.some(c => c.leftText === item && c.status === 'incorrect');
            const sanitizedId = item.replace(/[^a-zA-Z0-9]/g, '');

            let cardStyle: React.CSSProperties = {
              padding: '1rem',
              backgroundColor: 'var(--color-white)',
              border: '2px solid var(--color-border)',
              borderRadius: '16px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: isConnected ? 'default' : 'pointer',
              position: 'relative',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-soft)'
            };

            if (isSelected) {
              cardStyle.borderColor = 'var(--color-sky-blue)';
              cardStyle.backgroundColor = 'var(--color-soft-blue)';
            } else if (isConnected) {
              cardStyle.borderColor = 'var(--color-correct)';
              cardStyle.backgroundColor = 'var(--color-soft-green)';
              cardStyle.boxShadow = '0 2px 8px rgba(39, 174, 96, 0.1)';
            } else if (isWrong) {
              cardStyle.borderColor = 'var(--color-incorrect)';
              cardStyle.backgroundColor = '#FDF3F2';
            }

            return (
              <div
                key={idx}
                style={cardStyle}
                className={isWrong ? 'animate-shake' : ''}
                onClick={() => handleLeftClick(item)}
              >
                <span style={{ color: 'var(--color-navy)' }}>{item}</span>
                {/* Connector Dot */}
                <div
                  id={`left-${sanitizedId}`}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: isConnected ? 'var(--color-correct)' : isSelected ? 'var(--color-sky-blue)' : 'var(--color-border)',
                    position: 'absolute',
                    right: '-21px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    boxShadow: '0 0 0 3px var(--color-white)',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN - Definitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '42%', zIndex: 10 }}>
          {rightItems.map((item, idx) => {
            const isSelected = selectedRight === item;
            const isConnected = activeConnections.some(c => c.rightText === item && c.status === 'correct');
            const isWrong = activeConnections.some(c => c.rightText === item && c.status === 'incorrect');
            const sanitizedId = item.replace(/[^a-zA-Z0-9]/g, '');

            let cardStyle: React.CSSProperties = {
              padding: '1rem',
              backgroundColor: 'var(--color-white)',
              border: '2px solid var(--color-border)',
              borderRadius: '16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: isConnected ? 'default' : 'pointer',
              position: 'relative',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-soft)'
            };

            if (isSelected) {
              cardStyle.borderColor = 'var(--color-sky-blue)';
              cardStyle.backgroundColor = 'var(--color-soft-blue)';
            } else if (isConnected) {
              cardStyle.borderColor = 'var(--color-correct)';
              cardStyle.backgroundColor = 'var(--color-soft-green)';
              cardStyle.boxShadow = '0 2px 8px rgba(39, 174, 96, 0.1)';
            } else if (isWrong) {
              cardStyle.borderColor = 'var(--color-incorrect)';
              cardStyle.backgroundColor = '#FDF3F2';
            }

            return (
              <div
                key={idx}
                style={cardStyle}
                className={isWrong ? 'animate-shake' : ''}
                onClick={() => handleRightClick(item)}
              >
                {/* Connector Dot */}
                <div
                  id={`right-${sanitizedId}`}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: isConnected ? 'var(--color-correct)' : isSelected ? 'var(--color-sky-blue)' : 'var(--color-border)',
                    position: 'absolute',
                    left: '-21px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    boxShadow: '0 0 0 3px var(--color-white)',
                    transition: 'all 0.2s ease'
                  }}
                />
                <span style={{ color: 'var(--color-text-dark)' }}>{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed State & Explanation */}
      {isCompleted && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{
            backgroundColor: 'var(--color-soft-green)',
            padding: '1.2rem',
            borderRadius: '16px',
            borderLeft: '5px solid var(--color-correct)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}>
            <h4 style={{
              fontSize: '0.95rem',
              color: 'var(--color-navy)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Sparkles size={18} color="var(--color-correct)" /> Connections Verified!
            </h4>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--color-text-dark)',
              lineHeight: '1.5'
            }}>
              {questionData.explanation}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={handleContinue}
            style={{
              alignSelf: 'flex-end',
              padding: '0.8rem 2rem',
              fontSize: '0.95rem'
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
