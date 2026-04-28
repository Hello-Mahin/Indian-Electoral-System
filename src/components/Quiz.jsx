import React, { useState } from 'react';
import { CheckCircle, XCircle, Award } from 'lucide-react';

const questions = [
  {
    question: "What is the minimum voting age in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    answer: 1
  },
  {
    question: "Which body conducts the Lok Sabha elections in India?",
    options: ["Supreme Court of India", "Parliament of India", "Election Commission of India", "President of India"],
    answer: 2
  },
  {
    question: "How long is the VVPAT slip visible to the voter?",
    options: ["3 Seconds", "7 Seconds", "10 Seconds", "15 Seconds"],
    answer: 1
  },
  {
    question: "What does NOTA stand for?",
    options: ["None Of The Above", "Not Only The Alliance", "New Official Trading Agreement", "National Organization for Trade & Agriculture"],
    answer: 0
  },
  {
    question: "When does the Model Code of Conduct come into force?",
    options: ["1 month before voting day", "Immediately after election dates are announced", "On the day of polling", "After nominations are filed"],
    answer: 1
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return; 
    setSelectedOption(index);
    
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="animate-fade-in glass-card flex-col items-center justify-center" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem' }}>
        <Award size={64} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Quiz Completed!</h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          You scored {score} out of {questions.length}
        </p>
        <button className="btn btn-primary" onClick={restartQuiz}>Retake Quiz</button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Election Knowledge Quiz</h2>
        <span style={{ background: 'var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '1rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{q.question}</h3>
        
        <div className="flex-col gap-3">
          {q.options.map((option, index) => {
            let btnClass = "quiz-btn";
            let Icon = null;

            if (selectedOption !== null) {
              if (index === q.answer) {
                btnClass += " correct";
                Icon = <CheckCircle size={20} color="#10b981" />;
              } else if (index === selectedOption) {
                btnClass += " incorrect";
                Icon = <XCircle size={20} color="#ef4444" />;
              } else {
                btnClass += " disabled";
              }
            }

            return (
              <button 
                key={index} 
                className={btnClass}
                onClick={() => handleOptionClick(index)}
              >
                <span>{option}</span>
                {Icon}
              </button>
            );
          })}
        </div>

        {selectedOption !== null && (
          <div className="animate-fade-in flex justify-end" style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
