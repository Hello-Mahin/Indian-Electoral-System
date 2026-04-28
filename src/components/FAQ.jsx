import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is an EVM and how does it work?",
    answer: "An Electronic Voting Machine (EVM) consists of two units: a Control Unit (with the presiding officer) and a Balloting Unit (in the voting compartment). You vote by pressing the blue button next to the candidate's symbol on the Balloting Unit."
  },
  {
    question: "What is VVPAT?",
    answer: "Voter Verifiable Paper Audit Trail (VVPAT) is an independent printer attached to the EVM. When you vote, it prints a slip showing the candidate's serial number, name, and symbol. The slip is visible for 7 seconds through a transparent window before dropping into a sealed drop box."
  },
  {
    question: "What is NOTA?",
    answer: "NOTA stands for 'None Of The Above'. It is an option on the EVM that allows a voter to officially register a vote of rejection for all candidates contesting in the election."
  },
  {
    question: "Can I vote if I don't have my Voter ID (EPIC) card?",
    answer: "Yes, provided your name is on the Electoral Roll. The ECI allows 12 alternative photo identity documents, including Aadhaar Card, PAN Card, Driving License, Passport, and MGNREGA Job Card."
  },
  {
    question: "What is the Model Code of Conduct (MCC)?",
    answer: "The MCC is a set of guidelines issued by the ECI to regulate political parties and candidates prior to elections. It ensures free and fair elections by preventing the ruling party from misusing its official position for campaigning."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="section-title">Frequently Asked Questions (India)</h2>
      
      <div className="flex-col gap-2">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <div className="flex justify-between items-center">
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{faq.question}</h3>
              {openIndex === index ? <ChevronUp size={20} color="var(--accent-color)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
            </div>
            
            {openIndex === index && (
              <div className="animate-fade-in" style={{ marginTop: '1rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
