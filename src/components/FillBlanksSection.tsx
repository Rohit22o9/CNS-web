import React, { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';
import type { FillBlankQuestion } from '../data/unitsData';

interface FillBlanksSectionProps {
  questionData: FillBlankQuestion;
  onAnswer: (isCorrect: boolean, score: number) => void;
}

export const FillBlanksSection: React.FC<FillBlanksSectionProps> = ({ questionData, onAnswer }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered) return;
    if (!inputValue.trim()) return;

    const sanitizedInput = inputValue.trim().toLowerCase();
    const isAnswerCorrect = questionData.answers.some(
      (ans) => ans.toLowerCase() === sanitizedInput
    );

    if (isAnswerCorrect) {
      setIsCorrect(true);
      setIsAnswered(true);
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts === 1) {
        setShowHint(true);
      } else {
        setIsCorrect(false);
        setIsAnswered(true);
      }
    }
  };

  const handleContinue = () => {
    onAnswer(isCorrect, isCorrect ? 10 : 0);
    // Reset state for next question
    setInputValue('');
    setIsAnswered(false);
    setIsCorrect(false);
    setAttempts(0);
    setShowHint(false);
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
      {/* Quiz Category Header */}
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
          B. Fill in the Blanks
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
          Text Input • +10 Marks
        </span>
      </div>

      {/* Question Text */}
      <h3 style={{
        fontSize: '1.2rem',
        color: 'var(--color-navy)',
        lineHeight: '1.5',
        fontWeight: 700
      }}>
        {questionData.question}
      </h3>

      {/* Form Submission */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            className={`input-field ${isAnswered ? (isCorrect ? 'correct' : 'incorrect animate-shake') : ''}`}
            placeholder="Type your answer here..."
            value={inputValue}
            onChange={(e) => {
              if (!isAnswered) {
                setInputValue(e.target.value);
              }
            }}
            disabled={isAnswered}
            style={{
              paddingRight: '3rem',
              fontWeight: 600,
              fontSize: '1.05rem'
            }}
          />

          {isAnswered && (
            <div style={{
              position: 'absolute',
              right: '1rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              {isCorrect ? (
                <Check size={24} color="var(--color-correct)" className="animate-scale-in" />
              ) : (
                <X size={24} color="var(--color-incorrect)" className="animate-scale-in" />
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        {!isAnswered && (
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', alignItems: 'center' }}>
            {showHint && (
              <span className="animate-fade-in" style={{
                color: '#D35400',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: 'var(--color-light-orange)',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                marginRight: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <HelpCircle size={16} /> Hint: {questionData.hint}
              </span>
            )}
            
            <button
              type="submit"
              className="btn-primary"
              disabled={!inputValue.trim()}
              style={{
                opacity: !inputValue.trim() ? 0.6 : 1,
                cursor: !inputValue.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Answer
            </button>
          </div>
        )}
      </form>

      {/* Attempts/Hint display */}
      {!isAnswered && attempts === 1 && !showHint && (
        <p className="animate-fade-in" style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
          Incorrect. Please try one more time!
        </p>
      )}

      {/* Explanation post-answer */}
      {isAnswered && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {!isCorrect && (
            <div style={{
              backgroundColor: '#FDF3F2',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(231, 76, 60, 0.2)'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Correct Answer:</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                {questionData.answers.map((answer, index) => (
                  <span key={index} style={{
                    backgroundColor: 'var(--color-white)',
                    border: '2px solid var(--color-correct)',
                    color: 'var(--color-correct)',
                    padding: '0.2rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 700
                  }}>
                    {answer}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{
            backgroundColor: isCorrect ? 'var(--color-soft-green)' : 'var(--color-light-gray)',
            padding: '1.2rem',
            borderRadius: '16px',
            borderLeft: `5px solid ${isCorrect ? 'var(--color-correct)' : 'var(--color-sky-blue)'}`
          }}>
            <h4 style={{
              fontSize: '0.95rem',
              color: 'var(--color-navy)',
              marginBottom: '0.4rem',
              fontWeight: 700
            }}>
              {isCorrect ? '🎉 Correct!' : '💡 Explanation'}
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
