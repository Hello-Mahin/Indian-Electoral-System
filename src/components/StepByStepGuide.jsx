import React, { useState } from 'react';
import { UserPlus, Search, MapPin, CheckCircle, ChevronRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Voter Registration',
    icon: <UserPlus size={32} />,
    content: 'Ensure your name is on the Electoral Roll. You can apply online via the NVSP portal (Form 6) if you are 18+ years old and an Indian citizen. Check your name using your EPIC (Voter ID) number.',
    action: 'Visit Voter Portal'
  },
  {
    id: 2,
    title: 'Know Your Candidates (KYC)',
    icon: <Search size={32} />,
    content: 'Use the ECI\'s KYC App or website to view candidate affidavits. This includes details on their educational qualifications, criminal antecedents, and assets.',
    action: 'Download KYC App'
  },
  {
    id: 3,
    title: 'Find Polling Booth',
    icon: <MapPin size={32} />,
    content: 'Your specific polling station is mentioned on your Voter Information Slip. You can also find it via the Voter Helpline App or SMS services provided by the ECI.',
    action: 'Voter Helpline'
  },
  {
    id: 4,
    title: 'The Voting Process',
    icon: <CheckCircle size={32} />,
    content: '1. Polling officer checks your ID. 2. Your finger is marked with indelible ink. 3. Proceed to the voting compartment. 4. Press the blue button on the EVM next to your candidate/symbol. 5. Check the VVPAT slip to verify your vote.',
    action: 'View EVM Guide'
  }
];

const StepByStepGuide = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="animate-fade-in">
      <h2 className="section-title">Your Voting Journey</h2>
      
      <div className="flex gap-4 flex-col md:flex-row" style={{ minHeight: '400px' }}>
        <div className="glass-card flex-col gap-2" style={{ flex: 1, padding: '1.5rem' }}>
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: activeStep === step.id ? 'var(--glass-border)' : 'transparent',
                color: activeStep === step.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <div style={{ 
                background: activeStep === step.id ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                color: activeStep === step.id ? 'white' : 'var(--text-secondary)',
                width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
              }}>
                {step.id}
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: '500', flex: 1 }}>{step.title}</span>
              {activeStep === step.id && <ChevronRight size={20} />}
            </button>
          ))}
        </div>

        <div className="glass-card" style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '3rem' }}>
          {steps.map((step) => (
            step.id === activeStep && (
              <div key={step.id} className="animate-fade-in flex flex-col items-center gap-4">
                <div style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{step.title}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '2rem' }}>
                  {step.content}
                </p>
                <button className="btn btn-primary">
                  {step.action}
                </button>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepByStepGuide;
