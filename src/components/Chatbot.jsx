import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

const chatTree = {
  start: {
    message: "Namaste! I am your Indian Election Assistant. What would you like to know about the electoral process?",
    options: [
      { text: "How do I register to vote?", next: "register" },
      { text: "What happens at the polling booth?", next: "polling" },
      { text: "Tell me about EVMs & VVPAT", next: "evm" },
    ]
  },
  register: {
    message: "To register, you need to be an Indian citizen and 18+ years old. You must fill out Form 6. You can do this online at the Voter's Service Portal (voters.eci.gov.in) or via the Voter Helpline App. Do you have a Voter ID already?",
    options: [
      { text: "Yes, I have one", next: "have_id" },
      { text: "No, I need to apply", next: "no_id" }
    ]
  },
  have_id: {
    message: "Great! Make sure to verify your name on the Electoral Roll before the election date. You can search by your EPIC number on the ECI website.",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  no_id: {
    message: "No worries! Keep a passport-size photo, identity proof, and address proof ready. Go to voters.eci.gov.in and submit Form 6.",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  polling: {
    message: "At the booth, the Polling Officer will check your ID. Then, your left forefinger will be marked with indelible ink. After signing the register, you proceed to the voting compartment to cast your vote on the EVM.",
    options: [
      { text: "What IDs are allowed?", next: "ids" },
      { text: "Start Over", next: "start" }
    ]
  },
  ids: {
    message: "Besides your Voter ID (EPIC), you can use Aadhaar Card, PAN Card, Passport, Driving License, MNREGA Job Card, or Bank/Post Office Passbooks with photographs.",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  evm: {
    message: "An EVM (Electronic Voting Machine) records your vote electronically. You press the blue button next to your candidate's symbol. A VVPAT machine attached to it will print a slip visible for 7 seconds so you can verify your vote was recorded correctly.",
    options: [
      { text: "What if the VVPAT slip is wrong?", next: "vvpat_wrong" },
      { text: "Start Over", next: "start" }
    ]
  },
  vvpat_wrong: {
    message: "If the VVPAT slip does not match your button press, immediately inform the Presiding Officer. They will follow a specific procedure to test the machine in your presence.",
    options: [
      { text: "Start Over", next: "start" }
    ]
  }
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Namaste! I am your interactive Election Assistant. Please provide a Gemini API Key to activate AI assistance!" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    if (!apiKey.trim()) {
      setMessages(prev => [...prev, { type: 'bot', content: "Please provide a valid Gemini API Key above to begin chatting." }]);
      return;
    }

    const userQuery = inputMessage.trim();
    setMessages(prev => [...prev, { type: 'user', content: userQuery }]);
    setInputMessage('');
    setLoading(true);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }]
        })
      });

      const data = await response.json();
      if (data.error) {
        setMessages(prev => [...prev, { type: 'bot', content: `API Error: ${data.error.message || 'Verification failed.'}` }]);
      } else {
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        setMessages(prev => [...prev, { type: 'bot', content: replyText }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { type: 'bot', content: "Network error accessing Gemini API services." }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "How do I apply for a Voter ID?",
    "What documents are required for voting?",
    "Tell me about the Model Code of Conduct"
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="section-title" style={{ marginBottom: '1rem' }}>Election Assistant Chat</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Powered by direct Google Gemini Integration.</p>

      {/* API Key Input */}
      {showKeyInput && (
        <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="password" 
            placeholder="Enter Gemini API Key..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '0.5rem', color: 'var(--text-primary)' }}
          />
          <button className="btn btn-primary" onClick={() => setShowKeyInput(false)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            Save Key
          </button>
        </div>
      )}

      <div className="glass-card flex-col" style={{ height: '500px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Chat Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end',
              gap: '0.5rem'
            }}>
              {msg.type === 'bot' && <div style={{ background: 'var(--glass-border)', padding: '0.5rem', borderRadius: '50%' }}><Bot size={20} color="var(--accent-color)" /></div>}
              
              <div style={{
                background: msg.type === 'user' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                color: msg.type === 'user' ? 'white' : 'var(--text-primary)',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                borderBottomRightRadius: msg.type === 'user' ? '0' : '1rem',
                borderBottomLeftRadius: msg.type === 'bot' ? '0' : '1rem',
                maxWidth: '80%',
                border: msg.type === 'bot' ? '1px solid var(--glass-border)' : 'none'
              }}>
                {msg.content}
              </div>

              {msg.type === 'user' && <div style={{ background: 'var(--glass-border)', padding: '0.5rem', borderRadius: '50%' }}><User size={20} /></div>}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Bot size={20} color="var(--accent-color)" />
              <div style={{ padding: '0.75rem 1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'var(--glass-bg)', display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Type your question..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={loading}
            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '9999px', padding: '0.75rem 1.5rem', color: 'var(--text-primary)', outline: 'none' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '50%' }} disabled={loading}>
            <Send size={20} />
          </button>
        </form>

        {/* Quick prompts */}
        <div style={{ padding: '0.5rem 1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
          {quickPrompts.map((prompt, idx) => (
            <button 
              key={idx} 
              type="button"
              className="btn btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
              onClick={() => {
                setInputMessage(prompt);
              }}
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
