import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { DragDropTextQuestion } from '../data/unitsData';

interface DragDropTextProps {
  questionData: DragDropTextQuestion;
  onAnswer: (isCorrect: boolean, score: number) => void;
}

export const DragDropText: React.FC<DragDropTextProps> = ({ questionData, onAnswer }) => {
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<(string | null)[]>([]);
  const [wrongSlots, setWrongSlots] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  // Initialize options and slots
  useEffect(() => {
    // Shuffle options
    setAvailableWords([...questionData.options].sort(() => Math.random() - 0.5));
    setPlacedWords(Array(questionData.blanks.length).fill(null));
    setWrongSlots({});
    setIsCompleted(false);
    setAttempts(0);
  }, [questionData]);

  // Handle HTML5 Drag Start
  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
  };

  // Verify and place word into blank slot
  const verifyAndPlace = (word: string, slotIndex: number) => {
    const correctWord = questionData.blanks[slotIndex];

    if (word === correctWord) {
      // Correct!
      const newPlaced = [...placedWords];
      newPlaced[slotIndex] = word;
      setPlacedWords(newPlaced);

      // Remove from available shelf
      setAvailableWords(prev => prev.filter(w => w !== word));
      setWrongSlots(prev => ({ ...prev, [slotIndex]: false }));

      // Check if all slots are filled
      const allFilled = newPlaced.every(slot => slot !== null);
      if (allFilled) {
        setIsCompleted(true);
      }
    } else {
      // Incorrect - trigger shake and return animation
      setAttempts(prev => prev + 1);
      setWrongSlots(prev => ({ ...prev, [slotIndex]: true }));
      setTimeout(() => {
        setWrongSlots(prev => ({ ...prev, [slotIndex]: false }));
      }, 500);
    }
  };

  // HTML5 Drop handler
  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    if (placedWords[slotIndex] !== null) return;
    const word = e.dataTransfer.getData('text/plain');
    if (!word) return;
    verifyAndPlace(word, slotIndex);
  };

  // Tap-to-place alternative (mobile friendly)
  const handleWordClick = (word: string) => {
    // Find the first empty slot and try to place it
    const firstEmptyIndex = placedWords.indexOf(null);
    if (firstEmptyIndex !== -1) {
      verifyAndPlace(word, firstEmptyIndex);
    }
  };

  // Return a correct slot back (in case we want to let them clear, but since we do immediate validation, we keep it locked)

  const handleContinue = () => {
    const score = Math.max(0, 10 - attempts * 2); // lose 2 marks per wrong attempt, min 4 marks for complete
    onAnswer(true, score);
  };

  // Render the paragraph template with interactive slots
  const renderTemplateText = () => {
    // Splitting by placeholders like {0}, {1}
    const parts = questionData.textTemplate.split(/(\{\d+\})/g);
    return parts.map((part, index) => {
      const match = part.match(/\{(\d+)\}/);
      if (match) {
        const slotIndex = parseInt(match[1], 10);
        const placedWord = placedWords[slotIndex];
        const isWrong = wrongSlots[slotIndex];

        return (
          <span
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, slotIndex)}
            className={`blank-slot ${placedWord ? 'filled' : ''} ${isWrong ? 'animate-shake wrong' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '100px',
              height: '36px',
              padding: '0 0.8rem',
              margin: '0 0.4rem',
              borderRadius: '8px',
              border: placedWord
                ? '2px solid var(--color-correct)'
                : '2px dashed var(--color-sky-blue)',
              backgroundColor: placedWord
                ? 'var(--color-soft-green)'
                : 'var(--color-soft-blue)',
              color: placedWord ? 'var(--color-correct)' : 'transparent',
              fontWeight: 700,
              fontSize: '0.95rem',
              verticalAlign: 'middle',
              boxShadow: placedWord ? '0 0 10px rgba(39, 174, 96, 0.25)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {placedWord || 'Drop Here'}
          </span>
        );
      }
      return <span key={index} style={{ fontSize: '1.05rem', color: 'var(--color-navy)', fontWeight: 500 }}>{part}</span>;
    });
  };

  return (
    <div className="quiz-card animate-scale-in" style={{
      maxWidth: '680px',
      margin: '0 auto',
      backgroundColor: 'var(--color-white)',
      padding: '2rem',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-medium)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
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
          C. Drag & Drop to Text
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
          Interactive Fill • drag or tap
        </span>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', margin: 0 }}>
        Drag words into their matching blank slots in the paragraph, or tap a word card to auto-insert it.
      </p>

      {/* Paragraph area */}
      <div style={{
        lineHeight: '2.2',
        padding: '1.5rem',
        borderRadius: '16px',
        backgroundColor: 'var(--color-light-gray)',
        border: '1px solid var(--color-border)',
        margin: '0.5rem 0'
      }}>
        {renderTemplateText()}
      </div>

      {/* Word Shelf */}
      {!isCompleted && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>
            Word Bank
          </span>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem',
            padding: '1rem',
            border: '2px dashed var(--color-border)',
            borderRadius: '16px',
            minHeight: '60px',
            backgroundColor: 'rgba(245, 247, 252, 0.5)'
          }}>
            {availableWords.map((word, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                onClick={() => handleWordClick(word)}
                className="animate-fade-in"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--color-white)',
                  border: '2px solid var(--color-sky-blue)',
                  color: 'var(--color-navy)',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'grab',
                  boxShadow: '0 2px 6px rgba(79, 157, 255, 0.1)',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
                onMouseDown={(e) => { e.currentTarget.style.cursor = 'grabbing'; }}
                onMouseUp={(e) => { e.currentTarget.style.cursor = 'grab'; }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed state & Explanation */}
      {isCompleted && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{
            backgroundColor: 'var(--color-soft-green)',
            padding: '1.2rem',
            borderRadius: '16px',
            borderLeft: '5px solid var(--color-correct)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <h4 style={{
              fontSize: '0.95rem',
              color: 'var(--color-navy)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Sparkles size={18} color="var(--color-correct)" /> Concept Mastered!
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

      <style>{`
        .blank-slot.wrong {
          border-color: var(--color-incorrect) !important;
          background-color: #FDF3F2 !important;
          box-shadow: var(--shadow-danger) !important;
        }
      `}</style>
    </div>
  );
};
