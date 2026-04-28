import React from 'react';
import { Calendar } from 'lucide-react';

const events = [
  {
    phase: 'Phase 1',
    title: 'Announcement & Model Code of Conduct',
    description: 'The Election Commission of India (ECI) announces the poll dates. The Model Code of Conduct (MCC) comes into force immediately to ensure a level playing field.',
    type: 'registration',
  },
  {
    phase: 'Phase 2',
    title: 'Filing of Nominations',
    description: 'Candidates file their nomination papers along with an affidavit detailing their criminal antecedents, assets, and educational qualifications.',
    type: 'event',
  },
  {
    phase: 'Phase 3',
    title: 'Scrutiny & Withdrawal',
    description: 'The Returning Officer scrutinizes nominations. Validly nominated candidates have a few days to withdraw their candidacy if they choose.',
    type: 'deadline',
  },
  {
    phase: 'Phase 4',
    title: 'Campaigning Period',
    description: 'Political parties and candidates campaign. Campaigning strictly ends 48 hours before the end of polling in the respective constituency.',
    type: 'event',
  },
  {
    phase: 'Phase 5',
    title: 'Polling Day(s)',
    description: 'Voters cast their votes using Electronic Voting Machines (EVMs) equipped with Voter Verifiable Paper Audit Trail (VVPAT) systems.',
    type: 'important',
  },
  {
    phase: 'Phase 6',
    title: 'Counting Day & Results',
    description: 'EVMs are opened in the presence of candidates/agents, and votes are counted. The candidate with the highest votes is declared the winner (First-Past-The-Post).',
    type: 'important',
  }
];

const Timeline = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="section-title">Indian Election Timeline Phases</h2>
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--glass-border)', transform: 'translateX(-50%)' }}></div>
        
        {events.map((event, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
            marginBottom: '3rem',
            position: 'relative',
            width: '100%'
          }}>
            <div style={{ 
              position: 'absolute', 
              left: '50%', 
              top: '1.5rem', 
              width: '1rem', 
              height: '1rem', 
              borderRadius: '50%', 
              background: event.type === 'deadline' || event.type === 'important' ? '#ef4444' : 'var(--accent-color)',
              transform: 'translate(-50%, -50%)',
              border: '3px solid var(--bg-color)',
              zIndex: 10
            }}></div>

            <div className="glass-card" style={{ width: '45%', position: 'relative' }}>
              <div style={{ color: 'var(--accent-color)', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} />
                {event.phase}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{event.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
