import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { MCQQuestion } from '../data/unitsData';

interface MCQSectionProps {
  questionData: MCQQuestion;
  onAnswer: (isCorrect: boolean, score: number) => void;
}

export const MCQSection: React.FC<MCQSectionProps> = ({ questionData, onAnswer }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);
  };

  const handleContinue = () => {
    if (selectedIndex === null) return;
    const isCorrect = selectedIndex === questionData.correctIndex;
    onAnswer(isCorrect, isCorrect ? 10 : 0); // 10 marks per correct answer
    // Reset state for the next question
    setSelectedIndex(null);
    setIsAnswered(false);
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
          A. Multiple Choice Question
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
          Single Answer • +10 Marks
        </span>
      </div>

      {/* Question Text */}
      <h3 style={{
        fontSize: '1.25rem',
        color: 'var(--color-navy)',
        lineHeight: '1.5',
        fontWeight: 700
      }}>
        {questionData.question}
      </h3>

      {/* Options Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {questionData.options.map((option, index) => {
          let cardClass = "quiz-option";
          let styleOverlay = {};
          let icon = null;

          if (isAnswered) {
            if (index === questionData.correctIndex) {
              cardClass += " correct";
              icon = <Check size={20} color="var(--color-white)" fill="var(--color-correct)" style={{
                backgroundColor: 'var(--color-correct)',
                borderRadius: '50%',
                padding: '2px'
              }} />;
            } else if (index === selectedIndex) {
              cardClass += " incorrect animate-shake";
              icon = <X size={20} color="var(--color-white)" fill="var(--color-incorrect)" style={{
                backgroundColor: 'var(--color-incorrect)',
                borderRadius: '50%',
                padding: '2px'
              }} />;
            } else {
              styleOverlay = { opacity: 0.5 };
            }
          } else if (index === selectedIndex) {
            cardClass += " selected";
          }

          return (
            <div
              key={index}
              className={cardClass}
              onClick={() => handleSelectOption(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.1rem 1.5rem',
                borderRadius: '16px',
                border: '2px solid var(--color-border)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.25s ease',
                ...styleOverlay
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: selectedIndex === index ? 'var(--color-sky-blue)' : 'var(--color-light-gray)',
                  color: selectedIndex === index ? 'var(--color-white)' : 'var(--color-text-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease'
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span style={{ color: 'var(--color-text-dark)' }}>{option}</span>
              </div>
              {icon}
            </div>
          );
        })}
      </div>

      {/* Explanation (Shown post submission) */}
      {isAnswered && (
        <div className="animate-fade-in" style={{
          backgroundColor: selectedIndex === questionData.correctIndex ? 'var(--color-soft-green)' : 'var(--color-light-orange)',
          padding: '1.2rem',
          borderRadius: '16px',
          borderLeft: `5px solid ${selectedIndex === questionData.correctIndex ? 'var(--color-correct)' : '#F39C12'}`,
          marginTop: '0.5rem'
        }}>
          <h4 style={{
            fontSize: '0.95rem',
            color: 'var(--color-navy)',
            marginBottom: '0.4rem',
            fontWeight: 700
          }}>
            {selectedIndex === questionData.correctIndex ? '🎉 Excellent! Correct Answer' : '💡 Let\'s Learn This Concept'}
          </h4>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--color-text-dark)',
            lineHeight: '1.5'
          }}>
            {questionData.explanation}
          </p>
        </div>
      )}

      {/* Control Button */}
      {isAnswered && (
        <button
          className="btn-primary animate-fade-in"
          onClick={handleContinue}
          style={{
            alignSelf: 'flex-end',
            padding: '0.8rem 2rem',
            fontSize: '0.95rem',
            marginTop: '0.5rem'
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
};
