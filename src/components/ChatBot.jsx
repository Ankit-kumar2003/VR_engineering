import { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import { VIJAY_SYSTEM } from '../data.jsx';

// ── IMPORTANT ──────────────────────────────────────────────────────────────
// Add your Anthropic API key to .env file:
//   VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
//
// NOTE: In production, API calls should go through your Django backend,
// not directly from the browser. This direct call is for development only.
// ──────────────────────────────────────────────────────────────────────────

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || '';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: 'bot', text: 'Namaste! 🙏 I\'m Vijay from VR Engineering. How can I help you today? Are you looking for fabrication, die making, fixtures, gauges, or tool room work?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgsEndRef = useRef(null);
  const quickReplies = ['Get a Quote', 'Our Services', 'Location & Contact', 'Call Us Now'];

  useEffect(() => {
    if (open) msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const send = useCallback(async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setMsgs(p => [...p, { role: 'user', text: msg }]);
    setLoading(true);

    // Handle quick replies without API call
    if (msg === 'Call Us Now') {
      setMsgs(p => [...p, { role: 'bot', text: 'You can call us directly:\n📞 7564030523 (Primary)\n📞 9485979490 (Secondary)\n\nOr WhatsApp us at 7564030523. We\'re available Mon–Sat, 9AM–7PM.' }]);
      setLoading(false); return;
    }
    if (msg === 'Location & Contact') {
      setMsgs(p => [...p, { role: 'bot', text: '📍 Sharma Market, Budhi Bawal, Main Road Khushkhera, Alwar (Raj.) 301707\n\n📧 vrengineering950@gmail.com\n📞 7564030523 / 9485979490' }]);
      setLoading(false); return;
    }

    if (!API_KEY) {
      // Fallback if no API key configured
      const fallbacks = {
        'Get a Quote': 'To get a quote, please call us at 7564030523 or fill the quote form on our website. Share your drawings/specs and we\'ll get back within 24 hours!',
        'Our Services': 'We offer: ✅ Industrial Fabrication ✅ Die Making ✅ Fixture Work ✅ Gauge Manufacturing ✅ Tool Room Jobs. Which service are you interested in?',
      };
      const reply = fallbacks[msg] || 'Thanks for reaching out! Please call us at 7564030523 or use the Get a Quote form on our website. Our team will be happy to help you!';
      setTimeout(() => { setMsgs(p => [...p, { role: 'bot', text: reply }]); setLoading(false); }, 800);
      return;
    }

    try {
      const history = msgs.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 300, system: VIJAY_SYSTEM, messages: [...history, { role: 'user', content: msg }] })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, please call us at 7564030523.';
      setMsgs(p => [...p, { role: 'bot', text: reply }]);
    } catch {
      setMsgs(p => [...p, { role: 'bot', text: 'Sorry, I\'m having trouble right now. Please call us at 7564030523 or use the Quote form. 🙏' }]);
    }
    setLoading(false);
  }, [msgs, input, loading]);

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(o => !o)} title="Chat with Vijay">
        {open ? <X size={22} color="#0C0D0F" /> : <Bot size={22} color="#0C0D0F" />}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar"><Bot size={18} /></div>
            <div>
              <div className="chat-name">Vijay — VR Assistant</div>
              <div className="chat-status">Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(245,242,238,.4)', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          <div className="chat-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`} style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
            ))}
            {loading && (
              <div className="chat-typing">
                <div className="chat-dot" /><div className="chat-dot" /><div className="chat-dot" />
              </div>
            )}
            <div ref={msgsEndRef} />
          </div>

          {msgs.length <= 2 && (
            <div className="chat-quick">
              {quickReplies.map(q => <button key={q} className="chat-qbtn" onClick={() => send(q)}>{q}</button>)}
            </div>
          )}

          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button className="chat-send" onClick={() => send()}><Send size={15} /></button>
          </div>
        </div>
      )}
    </>
  );
}
