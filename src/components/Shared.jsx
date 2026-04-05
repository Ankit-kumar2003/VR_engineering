import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { NAV_LINKS, SERVICES_DATA, TICKER_ITEMS } from '../data.jsx';

/* ── ANIMATED COUNTER ───────────────────────────────── */
export function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || ran.current) return;
      ran.current = true;
      const s = performance.now(), d = 1800;
      const step = (n) => {
        const p = Math.min((n - s) / d, 1), ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── TICKER ──────────────────────────────────────────── */
export function Ticker() {
  const arr = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {arr.map((t, i) => <span key={i} className="ticker-item">⬡ {t}</span>)}
      </div>
    </div>
  );
}

/* ── NAVBAR ──────────────────────────────────────────── */
export function Navbar({ page, goTo, scrollRef }) {
  const [stuck, setStuck] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);

  useEffect(() => {
    const el = scrollRef?.current; if (!el) return;
    const onS = () => setStuck(el.scrollTop > 60);
    el.addEventListener('scroll', onS);
    return () => el.removeEventListener('scroll', onS);
  }, [scrollRef]);

  const navigate = (p) => { goTo(p); setMobOpen(false); };

  return (
    <>
      <nav className={`nav${stuck ? ' stuck' : ''}`}>
        <div className="nav-logo" onClick={() => navigate('home')}>
          <em>VR</em> ENGINEERING
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l}>
              <a className={page === l.toLowerCase() ? 'active' : ''} onClick={() => navigate(l.toLowerCase())}>
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => navigate('quote')}>Get Quote</button>
        <button className="nav-ham" onClick={() => setMobOpen(o => !o)}>
          {mobOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mob-menu${mobOpen ? ' open' : ''}`}>
        <button style={{ position: 'absolute', top: 22, right: 22, background: 'none', border: 'none', color: 'var(--wh)', cursor: 'pointer' }} onClick={() => setMobOpen(false)}>
          <X size={26} />
        </button>
        {NAV_LINKS.map(l => <a key={l} onClick={() => navigate(l.toLowerCase())}>{l}</a>)}
        <button className="btn-or" onClick={() => navigate('quote')}>Get Quote <ArrowRight size={14} /></button>
      </div>
    </>
  );
}

/* ── FOOTER ──────────────────────────────────────────── */
export function Footer({ goTo }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo"><em>VR</em> ENGINEERING</div>
          <p className="footer-tagline">Precision engineering solutions for industries that demand zero compromise on quality.</p>
          <p className="footer-legal">GST: 08AAZFV1575E1ZK<br />PAN: AAZFV1575E</p>
        </div>
        <div>
          <p className="footer-col-title">Quick Links</p>
          <ul className="footer-links">
            {NAV_LINKS.map(l => <li key={l} onClick={() => goTo(l.toLowerCase())}>{l}</li>)}
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Services</p>
          <ul className="footer-links">
            {SERVICES_DATA.map(s => <li key={s.id} onClick={() => goTo('services')}>{s.name}</li>)}
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Contact</p>
          <div className="footer-contact-item"><Phone size={12} /><span>7564030523 / 9485979490</span></div>
          <div className="footer-contact-item"><Mail size={12} /><span>vrengineering950@gmail.com</span></div>
          <div className="footer-contact-item"><MapPin size={12} /><span>Sharma Market, Budhi Bawal, Khushkhera, Alwar (Raj.) 301707</span></div>
          <div style={{ marginTop: 16 }}>
            <a href="https://wa.me/917564030523" target="_blank" rel="noreferrer" className="btn-or" style={{ display: 'inline-flex', fontSize: 11, padding: '9px 16px', gap: 6 }}>
              <MessageCircle size={13} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 VR Engineering. All rights reserved. · Alwar, Rajasthan</p>
        <p className="footer-copy">Designed with precision · Built for industry</p>
      </div>
    </footer>
  );
}

/* ── WHATSAPP BUTTON ─────────────────────────────────── */
export function WhatsAppButton() {
  return (
    <a href="https://wa.me/917564030523" target="_blank" rel="noreferrer" className="wa-btn" title="Chat on WhatsApp">
      <MessageCircle size={24} color="#fff" />
    </a>
  );
}
