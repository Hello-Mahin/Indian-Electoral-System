import React, { useState } from 'react';
import { Vote, Calendar, MapPin, HelpCircle, ArrowRight, BookOpen, MessageSquare } from 'lucide-react';
import Timeline from './components/Timeline';
import StepByStepGuide from './components/StepByStepGuide';
import FAQ from './components/FAQ';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';

function App() {
  const [activeTab, setActiveTab] = useState('guide');

  return (
    <div className="app-container">
      <header className="header">
        <div className="container flex justify-between items-center">
          <div className="logo" onClick={() => setActiveTab('guide')} style={{ cursor: 'pointer' }}>
            <Vote size={32} color="var(--accent-color)" />
            <span>VoteAssist India</span>
          </div>
          <nav className="flex gap-4" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            <a href="#guide" onClick={(e) => {e.preventDefault(); setActiveTab('guide');}} style={{ color: activeTab === 'guide' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Guide</a>
            <a href="#timeline" onClick={(e) => {e.preventDefault(); setActiveTab('timeline');}} style={{ color: activeTab === 'timeline' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Timeline</a>
            <a href="#faq" onClick={(e) => {e.preventDefault(); setActiveTab('faq');}} style={{ color: activeTab === 'faq' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>FAQ</a>
            <a href="#learn" onClick={(e) => {e.preventDefault(); setActiveTab('learn');}} style={{ color: activeTab === 'learn' ? 'var(--text-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={16}/> Learn</a>
            <a href="#chat" onClick={(e) => {e.preventDefault(); setActiveTab('chat');}} style={{ color: activeTab === 'chat' ? 'var(--text-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={16}/> Chat</a>
          </nav>
        </div>
      </header>

      <main>
        {activeTab !== 'learn' && activeTab !== 'chat' && (
          <section className="hero container animate-fade-in">
            <h1>Indian Electoral System</h1>
            <p>Your interactive guide to the world's largest democracy. Learn about EVMs, VVPAT, registration, and more.</p>
            <div className="flex justify-center gap-3">
              <button className="btn btn-primary" onClick={() => setActiveTab('guide')}>
                Voting Guide <ArrowRight size={20} />
              </button>
              <button className="btn btn-secondary" onClick={() => setActiveTab('learn')}>
                Start Learning <BookOpen size={20} />
              </button>
            </div>
          </section>
        )}

        <div className="container" style={{ paddingBottom: '4rem', paddingTop: activeTab === 'learn' || activeTab === 'chat' ? '4rem' : '0' }}>
          {activeTab === 'guide' && <StepByStepGuide />}
          {activeTab === 'timeline' && <Timeline />}
          {activeTab === 'faq' && <FAQ />}
          
          {activeTab === 'learn' && (
            <div className="animate-fade-in">
              <Flashcards />
              <div style={{ margin: '4rem 0', borderTop: '1px solid var(--glass-border)' }}></div>
              <Quiz />
            </div>
          )}

          {activeTab === 'chat' && <Chatbot />}
        </div>
      </main>
      
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>&copy; 2026 VoteAssist India. Empowering citizens.</p>
      </footer>
    </div>
  );
}

export default App;
