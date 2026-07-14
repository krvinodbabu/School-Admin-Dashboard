/**
 * EduOS AI Copilot — Floating assistant panel available globally.
 * Renders a chat interface with suggested prompts and streaming-style responses.
 */
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Loader } from 'lucide-react';
import { PROMPT_TEMPLATES, getChatResponse } from '../ai/aiResponses.js';

export default function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I\'m your **EduOS Copilot**. I can help with lesson plans, student analytics, fee predictions, and more. Try a suggestion below or type your question.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(userMessage);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedPrompts = PROMPT_TEMPLATES.slice(0, 6);

  // Simple markdown-like rendering for bold and headers
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h4 key={i} style={{ margin: '0.75rem 0 0.5rem', fontSize: '1rem', fontWeight: 600 }}>{line.replace('## ', '')}</h4>;
      if (line.startsWith('### ')) return <h5 key={i} style={{ margin: '0.5rem 0 0.25rem', fontSize: '0.9rem', fontWeight: 600 }}>{line.replace('### ', '')}</h5>;
      if (line.startsWith('| ')) return <div key={i} style={{ fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre', overflowX: 'auto' }}>{line}</div>;
      if (line.startsWith('> ')) return <div key={i} style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{line.replace('> ', '')}</div>;
      if (line.startsWith('- ')) return <div key={i} style={{ paddingLeft: '1rem', fontSize: '0.85rem', lineHeight: 1.7 }}>• {line.replace('- ', '')}</div>;
      if (line.match(/^\d+\./)) return <div key={i} style={{ paddingLeft: '1rem', fontSize: '0.85rem', lineHeight: 1.7 }}>{line}</div>;
      if (line.trim() === '') return <div key={i} style={{ height: '0.5rem' }} />;
      // Handle bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return <p key={i} style={{ margin: '0.15rem 0', fontSize: '0.85rem', lineHeight: 1.6 }}>
        {parts.map((part, j) => part.startsWith('**') ? <strong key={j}>{part.replace(/\*\*/g, '')}</strong> : part)}
      </p>;
    });
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        className="copilot-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Copilot"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--gradient-brand)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
          zIndex: 9998,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.4)'; }}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      {/* Copilot Panel */}
      {isOpen && (
        <div className="copilot-panel" style={{
          position: 'fixed',
          bottom: '6rem',
          right: '2rem',
          width: '420px',
          maxWidth: 'calc(100vw - 2rem)',
          height: '600px',
          maxHeight: 'calc(100vh - 8rem)',
          background: 'var(--color-surface)',
          borderRadius: '16px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.2), 0 0 0 1px var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden',
          animation: 'copilotSlideUp 0.3s ease',
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem',
            background: 'var(--gradient-brand)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>EduOS Copilot</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>AI-Powered Assistant</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: msg.role === 'ai' ? 'var(--gradient-brand)' : 'var(--color-surface-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {msg.role === 'ai' ? <Bot size={14} color="#fff" /> : <User size={14} />}
                </div>
                <div style={{
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-surface-3)',
                  color: msg.role === 'user' ? '#fff' : 'var(--color-text)',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                  maxWidth: '85%',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                }}>
                  {msg.role === 'ai' ? renderContent(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={14} color="#fff" />
                </div>
                <div style={{ background: 'var(--color-surface-3)', padding: '0.75rem 1rem', borderRadius: '12px 12px 12px 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <Loader size={14} className="copilot-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 1 && (
            <div style={{
              padding: '0 1rem 0.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              flexShrink: 0,
            }}>
              {suggestedPrompts.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSend(p.prompt.replace(/\{[^}]+\}/g, '...'))}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '20px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: 'var(--color-text)',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  {p.icon} {p.prompt.replace(/\{[^}]+\}/g, '...').slice(0, 35)}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask EduOS Copilot anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-2)',
                fontSize: '0.85rem',
                outline: 'none',
                color: 'var(--color-text)',
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: input.trim() ? 'var(--gradient-brand)' : 'var(--color-surface-3)',
                color: input.trim() ? '#fff' : 'var(--color-text-muted)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
