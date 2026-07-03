import React, { useState } from 'react';
import { Check, X, Calculator, HelpCircle } from 'lucide-react';
import type { NumericalQuestion } from '../data/unitsData';

interface NumericalQuizProps {
  questionData: NumericalQuestion;
  onAnswer: (isCorrect: boolean, score: number) => void;
}

export const NumericalQuiz: React.FC<NumericalQuizProps> = ({ questionData, onAnswer }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered) return;
    if (!inputValue.trim()) return;

    // Compare numbers or words by stripping spaces and letters
    const cleanInput = inputValue.trim().toLowerCase().replace(/[^a-z0-9.]/g, '');
    const cleanCorrect = questionData.correctAnswer.trim().toLowerCase().replace(/[^a-z0-9.]/g, '');

    // Check if matching (exact string or numerical equivalent)
    const isAnsCorrect = cleanInput === cleanCorrect || 
      (parseFloat(cleanInput) === parseFloat(cleanCorrect) && !isNaN(parseFloat(cleanInput)));

    setIsCorrect(isAnsCorrect);
    setIsAnswered(true);
  };

  const handleContinue = () => {
    onAnswer(isCorrect, isCorrect ? 10 : 0);
    // Reset state
    setInputValue('');
    setIsAnswered(false);
    setIsCorrect(false);
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
          F. Applied Numerical & Concept
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
          Practical Quiz • +10 Marks
        </span>
      </div>

      {/* Calculator indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.8rem',
        backgroundColor: 'var(--color-light-gray)',
        padding: '1.2rem',
        borderRadius: '16px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          backgroundColor: 'var(--color-white)',
          padding: '0.4rem',
          borderRadius: '8px',
          color: 'var(--color-sky-blue)',
          display: 'flex'
        }}>
          <Calculator size={20} />
        </div>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-navy)',
          fontWeight: 600,
          lineHeight: '1.5',
          margin: 0
        }}>
          {questionData.question}
        </p>
      </div>

      {/* Input submission */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            className={`input-field ${isAnswered ? (isCorrect ? 'correct' : 'incorrect animate-shake') : ''}`}
            placeholder="Type your final calculated numerical value..."
            value={inputValue}
            onChange={(e) => {
              if (!isAnswered) setInputValue(e.target.value);
            }}
            disabled={isAnswered}
            style={{
              paddingRight: '3rem',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: 'var(--color-navy)'
            }}
          />

          {isAnswered && (
            <div style={{ position: 'absolute', right: '1rem', display: 'flex', alignItems: 'center' }}>
              {isCorrect ? (
                <Check size={24} color="var(--color-correct)" />
              ) : (
                <X size={24} color="var(--color-incorrect)" />
              )}
            </div>
          )}
        </div>

        {!isAnswered && (
          <button
            type="submit"
            className="btn-primary"
            disabled={!inputValue.trim()}
            style={{
              alignSelf: 'flex-end',
              opacity: !inputValue.trim() ? 0.6 : 1,
              cursor: !inputValue.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            Submit Calculation
          </button>
        )}
      </form>

      {/* Calculations details */}
      {isAnswered && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Correct answer display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: isCorrect ? 'var(--color-soft-green)' : '#FDF3F2',
            padding: '0.8rem 1.2rem',
            borderRadius: '12px',
            border: `1px solid ${isCorrect ? 'rgba(39,174,96,0.2)' : 'rgba(231,76,60,0.2)'}`
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 600 }}>
              Correct Value:
            </span>
            <span style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              color: isCorrect ? 'var(--color-correct)' : 'var(--color-incorrect)'
            }}>
              {questionData.correctAnswer}
            </span>
          </div>

          {/* Formula Used */}
          {questionData.formula && (
            <div style={{
              backgroundColor: 'var(--color-soft-blue)',
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              border: '1px dashed var(--color-sky-blue)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-sky-blue)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                Formula Reference
              </span>
              <code style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '0.95rem',
                color: 'var(--color-navy)',
                fontWeight: 700
              }}>
                {questionData.formula}
              </code>
            </div>
          )}

          {/* Step-by-Step solutions list */}
          <div style={{
            backgroundColor: 'var(--color-light-gray)',
            padding: '1.2rem',
            borderRadius: '16px',
            border: '1px solid var(--color-border)'
          }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--color-text-light)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginBottom: '0.6rem'
            }}>
              <HelpCircle size={14} /> Step-by-Step Calculation
            </span>

            <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {questionData.steps.map((step, idx) => (
                <li key={idx} style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-dark)',
                  lineHeight: '1.4'
                }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Concept Summary */}
          <div style={{
            backgroundColor: 'var(--color-white)',
            padding: '1rem 0',
            borderTop: '1px solid var(--color-border)'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.3rem' }}>
              Concept Summary
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', lineHeight: '1.4' }}>
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
