import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

const cards = [
  { term: 'EVM', definition: 'Electronic Voting Machine. Used in India since 1999 to electronically record and count votes, replacing paper ballots.' },
  { term: 'VVPAT', definition: 'Voter Verifiable Paper Audit Trail. A printer attached to the EVM that gives the voter a 7-second visual paper trail of their cast vote.' },
  { term: 'ECI', definition: 'Election Commission of India. An autonomous constitutional authority responsible for administering election processes in India.' },
  { term: 'MCC', definition: 'Model Code of Conduct. Guidelines issued by ECI for conduct of political parties and candidates during elections to ensure fairness.' },
  { term: 'FPTP', definition: 'First-Past-The-Post. The electoral system where the candidate with the highest number of votes in a constituency wins the seat.' },
  { term: 'NOTA', definition: 'None Of The Above. A ballot option allowing voters to indicate disapproval of all candidates in a voting system.' }
];

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="animate-fade-in flex-col items-center" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2 className="section-title" style={{ marginBottom: '1rem' }}>Electoral Vocabulary</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Click the card to reveal the definition.</p>
      
      <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front glass-card flex-col justify-center items-center">
            <h3 style={{ fontSize: '3rem', margin: 0, color: 'var(--accent-color)' }}>{cards[currentIndex].term}</h3>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <RotateCw size={16} /> Tap to flip
            </div>
          </div>
          <div className="flashcard-back glass-card flex-col justify-center items-center">
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', padding: '0 1rem' }}>
              {cards[currentIndex].definition}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4" style={{ marginTop: '2rem' }}>
        <button className="btn btn-secondary" onClick={prevCard}>Previous</button>
        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
          {currentIndex + 1} / {cards.length}
        </span>
        <button className="btn btn-primary" onClick={nextCard}>Next</button>
      </div>
    </div>
  );
};

export default Flashcards;
