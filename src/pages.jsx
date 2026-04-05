import { useState, useEffect, useRef } from 'react';
import {
  Phone, Mail, MapPin, Wrench, Cog, Zap, Shield, ArrowRight,
  ChevronDown, Star, ChevronLeft, ChevronRight, Send,
  Upload, Check, Award, Clock, Factory, Settings, Eye, Target, MessageCircle
} from 'lucide-react';
import { Counter, Ticker } from './components/Shared.jsx';
import { useHeroScene, useWhyScene, useServiceScene } from './hooks/useThreeScenes.js';
import { SERVICES_DATA, GALLERY_ITEMS, TESTIMONIALS } from './data.jsx';

/* ── GALLERY VISUAL PLACEHOLDER ─────────────────────── */
function GalleryVisual({ item }) {
  const icons = [<Factory size={40} />, <Settings size={40} />, <Wrench size={40} />, <Target size={40} />, <Cog size={40} />, <Shield size={40} />];
  return (
    <div style={{ width: '100%', height: '100%', background: item.col, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
      <div style={{ color: 'rgba(255,107,26,.45)' }}>{icons[item.id % icons.length]}</div>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(245,242,238,.2)' }}>{item.cat}</div>
    </div>
  );
}

/* ── SERVICE SCENE COMPONENT ─────────────────────────── */
function ServiceScene({ idx }) {
  const ref = useRef(null);
  useServiceScene(ref, idx);
  return <canvas ref={ref} style={{ width: '100%', height: '100%' }} />;
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════ */
export function HomePage({ goTo }) {
  const heroRef = useRef(null);
  const whyRef = useRef(null);
  useHeroScene(heroRef);
  useWhyScene(whyRef);

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero" style={{ paddingTop: 90 }}>
        <canvas ref={heroRef} className="hero-canvas" />
        <div className="hero-fade-l" /><div className="hero-fade-b" /><div className="hero-noise" />
        <div className="scan" style={{ top: '32%', animation: 'scanAnim 5s ease-in-out infinite' }} />
        <div className="scan" style={{ top: '68%', animation: 'scanAnim 5s 2.5s ease-in-out infinite' }} />
        <div className="hero-content">
          <p className="hero-eyebrow">★ Precision Engineering · Alwar, Rajasthan · Est. 2005</p>
          <h1 className="hero-title">VR<em>ENGINEER<br />ING</em></h1>
          <p className="hero-sub">Industrial fabrication, die & fixture manufacturing, gauge making and complete tool room solutions — built for industries that demand zero compromise.</p>
          <div className="hero-ctas">
            <button className="btn-or" onClick={() => goTo('quote')}>Get a Quote <ArrowRight size={16} /></button>
            <button className="btn-gh" onClick={() => goTo('services')}>Our Services</button>
          </div>
          <div className="hero-badges">
            <div className="hero-badge"><span>GST</span> Registered</div>
            <div className="hero-badge"><span>500+</span> Projects</div>
            <div className="hero-badge"><span>15+</span> Years</div>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span><ChevronDown size={14} /></div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* SERVICES CARDS */}
      <section className="srv-cards">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="sec-label">What We Do</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <h2 className="sec-title dk">Our Services</h2>
            <button className="btn-dk" onClick={() => goTo('services')}>View All <ArrowRight size={14} /></button>
          </div>
          <div className="srv-cards-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={s.id} className="srv-card" onClick={() => goTo('services')}>
                <span className="srv-card-num">0{i + 1}</span>
                <div className="srv-card-icon">{s.icon}</div>
                <p className="srv-card-name">{s.name}</p>
                <p className="srv-card-desc">{s.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="stats-grid">
          {[[500, '+'],[15, '+'],[100, '+'],[24, '/7']].map(([n, s], i) => (
            <div key={i} className="stat-box">
              <div className="stat-n"><Counter to={n} suffix={s} /></div>
              <p className="stat-l">{['Projects Completed','Years Experience','Happy Clients','Support Available'][i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY US */}
      <section className="why-section">
        <div className="why-canvas-wrap"><canvas ref={whyRef} className="why-canvas" /></div>
        <div>
          <p className="sec-label">Why Choose Us</p>
          <h2 className="sec-title dk" style={{ marginBottom: 8 }}>Precision Is<br />Our Promise</h2>
          <p style={{ fontSize: 14, color: 'var(--txm)', marginBottom: 12, lineHeight: 1.75 }}>Two decades of delivering precision engineering to industries across North India — every project backed by quality guarantees.</p>
          <ul className="feat-list">
            {[
              [<Zap size={17} />, 'Micron-Level Accuracy', 'Tolerances held to ±0.005mm across all machining operations.'],
              [<Shield size={17} />, 'GST Registered Business', 'Full compliance — GSTIN: 08AAZFV1575E1ZK · PAN: AAZFV1575E'],
              [<Clock size={17} />, 'On-Time Delivery', 'Streamlined workflows ensuring your deadlines are always met.'],
              [<Award size={17} />, 'All-in-One Tool Room', 'From concept to finished tool — one partner for everything.'],
            ].map(([ic, h, p], i) => (
              <li key={i} className="feat-item">
                <div className="feat-icon">{ic}</div>
                <div><p className="feat-h">{h}</p><p className="feat-p">{p}</p></div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 28 }}>
            <button className="btn-dk" onClick={() => goTo('about')}>About Us <ArrowRight size={14} /></button>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div style={{ background: 'var(--or)', padding: '60px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,4vw,54px)', color: 'var(--dk)', lineHeight: 1 }}>Ready to Start Your Project?</div>
          <p style={{ fontSize: 14, color: 'rgba(12,13,15,.65)', marginTop: 8 }}>Talk to our engineers and get an accurate quote within 24 hours.</p>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button className="btn-dk" onClick={() => goTo('quote')}>Get Quote <ArrowRight size={14} /></button>
          <a href="tel:7564030523" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--dk)', padding: '14px 0' }}>
            <Phone size={16} /> 7564030523
          </a>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--st)', padding: '90px 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="sec-label">What Clients Say</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <h2 className="sec-title lt">Client Testimonials</h2>
            <button className="btn-gh" onClick={() => goTo('about')}>All Reviews</button>
          </div>
          <div className="test-grid">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="test-card">
                <div className="test-stars">{[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill="currentColor" />)}</div>
                <p className="test-text">"{t.text}"</p>
                <p className="test-author">{t.author}</p>
                <p className="test-co">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICES PAGE
═══════════════════════════════════════════════════════ */
export function ServicesPage({ goTo }) {
  return (
    <div className="page-enter">
      <section className="srv-hero" style={{ paddingTop: 140 }}>
        <div className="srv-hero-bg" /><div className="srv-hero-grid" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p className="sec-label">What We Offer</p>
          <h1 className="sec-title lt">Our Services</h1>
          <p style={{ fontSize: 14, color: 'var(--mu)', marginTop: 12, maxWidth: 500, lineHeight: 1.75 }}>Five specialized engineering services — each backed by decades of expertise, precision machinery, and an uncompromising approach to quality.</p>
        </div>
      </section>
      {SERVICES_DATA.map((s, i) => (
        <section key={s.id} className="srv-section">
          <div className={`srv-section-inner${i % 2 !== 0 ? ' rev' : ''}`}>
            <div className="srv-visual">
              <div className="srv-visual-inner"><ServiceScene idx={i} /></div>
            </div>
            <div>
              <div className="srv-icon-wrap">{s.icon}</div>
              <h2 className="srv-title">{s.name}</h2>
              <p className="srv-desc">{s.desc}</p>
              <ul className="srv-features">{s.features.map((f, j) => <li key={j} className="srv-feature">{f}</li>)}</ul>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 10 }}>Industries Served</p>
              <div className="srv-industries">{s.industries.map((ind, j) => <span key={j} className="srv-tag">{ind}</span>)}</div>
              <div style={{ marginTop: 28 }}>
                <button className="btn-or" onClick={() => goTo('quote')}>Request Quote for This Service <ArrowRight size={14} /></button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   GALLERY PAGE
═══════════════════════════════════════════════════════ */
export function GalleryPage() {
  const cats = ['All', 'Fabrication', 'Dies', 'Fixtures', 'Gauges', 'Tool Room'];
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const filtered = active === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === active);
  const cur = GALLERY_ITEMS.findIndex(g => g.id === lightbox?.id);
  const prev = () => setLightbox(GALLERY_ITEMS[(cur - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length]);
  const next = () => setLightbox(GALLERY_ITEMS[(cur + 1) % GALLERY_ITEMS.length]);

  useEffect(() => {
    const k = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [lightbox, cur]);

  return (
    <div className="page-enter">
      <section style={{ background: 'var(--dk)', padding: '140px 5vw 0', position: 'relative', overflow: 'hidden' }}>
        <div className="srv-hero-bg" style={{ position: 'absolute', inset: 0 }} />
        <div className="srv-hero-grid" style={{ position: 'absolute', inset: 0 }} />
        <p className="sec-label" style={{ position: 'relative' }}>Our Work</p>
        <h1 className="sec-title lt" style={{ position: 'relative' }}>Work Gallery</h1>
        <p style={{ fontSize: 14, color: 'var(--mu)', marginTop: 12, maxWidth: 500, lineHeight: 1.75, position: 'relative' }}>A showcase of precision-engineered components, tooling, and fabrication work delivered across industries.</p>
        <div style={{ height: 60 }} />
      </section>
      <section className="gal-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="gal-filters">
            {cats.map(c => <button key={c} className={`gal-filter${active === c ? ' active' : ''}`} onClick={() => setActive(c)}>{c}</button>)}
          </div>
          <div className="gal-grid">
            {filtered.map(item => (
              <div key={item.id} className="gal-item" onClick={() => setLightbox(item)}>
                <div className="gal-item-inner"><GalleryVisual item={item} /></div>
                <div className="gal-item-overlay">
                  <div className="gal-icon"><Eye size={18} /></div>
                  <p className="gal-item-label">{item.name}</p>
                  <span className="gal-cat-badge">{item.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {lightbox && (
        <div className="lightbox" onClick={e => { if (e.target === e.currentTarget) setLightbox(null); }}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><ChevronDown size={28} style={{ transform: 'rotate(45deg)' }} /></button>
          <button className="lightbox-prev" onClick={e => { e.stopPropagation(); prev(); }}><ChevronLeft size={24} /></button>
          <button className="lightbox-next" onClick={e => { e.stopPropagation(); next(); }}><ChevronRight size={24} /></button>
          <div className="lightbox-content">
            <div style={{ width: 480, height: 340, maxWidth: '75vw' }}><GalleryVisual item={lightbox} /></div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: 'var(--wh)', letterSpacing: 2 }}>{lightbox.name}</p>
              <span className="gal-cat-badge" style={{ marginTop: 8, display: 'inline-block' }}>{lightbox.cat}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════ */
export function AboutPage({ goTo }) {
  const industries = [
    { icon: <Factory size={22} />, name: 'Automotive' }, { icon: <Zap size={22} />, name: 'Defence' },
    { icon: <Shield size={22} />, name: 'Agriculture' }, { icon: <Target size={22} />, name: 'Electronics' },
    { icon: <Settings size={22} />, name: 'Infrastructure' }, { icon: <Cog size={22} />, name: 'General Eng.' },
  ];
  return (
    <div className="page-enter">
      <section style={{ minHeight: '50vh', background: 'var(--dk)', display: 'flex', alignItems: 'flex-end', padding: '0 5vw 70px', paddingTop: 140, position: 'relative', overflow: 'hidden' }}>
        <div className="srv-hero-bg" style={{ position: 'absolute', inset: 0 }} /><div className="srv-hero-grid" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p className="sec-label">Who We Are</p>
          <h1 className="sec-title lt">About VR Engineering</h1>
        </div>
      </section>
      <section className="about-section" style={{ background: 'var(--dk)' }}>
        <div className="about-story">
          <div>
            <p className="sec-label">Our Story</p>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,4vw,60px)', color: 'var(--wh)', lineHeight: 1, marginBottom: 20 }}>Two Decades of<br />Precision</h2>
            <p style={{ fontSize: 14.5, color: 'var(--mu)', lineHeight: 1.85, marginBottom: 20 }}>VR Engineering was founded with a single mission — deliver precision engineering solutions that industry can rely upon. From a modest workshop in Alwar, we grew into a comprehensive tool room trusted by manufacturers across North India.</p>
            <p style={{ fontSize: 14.5, color: 'var(--mu)', lineHeight: 1.85, marginBottom: 28 }}>Our team of skilled craftsmen and engineers brings together deep expertise in machining, fabrication, and tooling — combined with modern CNC machinery and rigorous quality practices.</p>
            <div style={{ background: 'var(--st)', padding: 36, marginTop: 40 }}>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 16 }}>Business Credentials</p>
              <div className="cred-grid">
                {[['PAN Number','AAZFV1575E'],['GST Number','08AAZFV1575E1ZK'],['Location','Alwar, Rajasthan 301707'],['Email','vrengineering950@gmail.com'],['Phone 1','7564030523'],['Phone 2','9485979490']].map(([k, v]) => (
                  <div key={k} className="cred-item"><p className="cred-key">{k}</p><p className="cred-val">{v}</p></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['500+','Projects Delivered','From one-off prototypes to long-run production tooling.'],['15+','Years Experience','Trusted by manufacturers since 2005.'],['100+','Satisfied Clients','Repeat clients are our biggest endorsement.'],['5','Core Services','One partner for all your tool room needs.']].map(([n, l, d]) => (
              <div key={l} style={{ background: 'var(--st)', padding: '28px 24px', borderLeft: '3px solid var(--or)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52, color: 'var(--or)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--wh)', marginTop: 4 }}>{l}</div>
                <div style={{ fontSize: 13, color: 'var(--mu)', marginTop: 6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--st)', padding: '90px 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="sec-label">Industries We Serve</p>
          <h2 className="sec-title lt" style={{ marginBottom: 40 }}>Trusted Across Industries</h2>
          <div className="industries-grid">
            {industries.map((ind, i) => (
              <div key={i} className="industry-card">
                <div className="industry-icon">{ind.icon}</div>
                <p className="industry-name">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--st2)', padding: '90px 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="sec-label">Client Feedback</p>
          <h2 className="sec-title lt" style={{ marginBottom: 0 }}>What Our Clients Say</h2>
          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="test-card">
                <div className="test-stars">{[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill="currentColor" />)}</div>
                <p className="test-text">"{t.text}"</p>
                <p className="test-author">{t.author}</p>
                <p className="test-co">{t.company}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn-or" onClick={() => goTo('quote')}>Work With Us <ArrowRight size={14} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   QUOTE PAGE
═══════════════════════════════════════════════════════ */
export function QuotePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', service: '', qty: '', desc: '', file: null });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const upRef = useRef(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit Indian mobile number';
    if (!form.service) e.service = 'Please select a service';
    if (form.desc.trim().length < 20) e.desc = 'Please describe your requirement (min 20 chars)';
    setErrors(e); return Object.keys(e).length === 0;
  };
  const submit = (e) => { e.preventDefault(); if (validate()) setSubmitted(true); };

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--ow)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 5vw 60px' }}>
      <div style={{ background: 'var(--dk)', padding: '60px 48px', textAlign: 'center', maxWidth: 500, width: '100%' }}>
        <div style={{ width: 64, height: 64, background: 'var(--or)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Check size={28} color="#0C0D0F" /></div>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: 'var(--or)', marginBottom: 12 }}>Enquiry Sent!</h2>
        <p style={{ fontSize: 14, color: 'var(--mu)', lineHeight: 1.8, marginBottom: 28 }}>Thank you, <strong style={{ color: 'var(--wh)' }}>{form.name}</strong>! Our team will call you at <strong style={{ color: 'var(--or)' }}>{form.phone}</strong> within 24 business hours.</p>
        <div style={{ background: 'var(--st)', padding: 20, marginBottom: 28, textAlign: 'left' }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 10 }}>Urgent? Contact Directly</p>
          <a href="tel:7564030523" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mu)', fontSize: 14 }}><Phone size={14} /> 7564030523</a>
          <a href="https://wa.me/917564030523" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mu)', fontSize: 14, marginTop: 8 }}><MessageCircle size={14} /> WhatsApp Us</a>
        </div>
        <button className="btn-or" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', company: '', service: '', qty: '', desc: '', file: null }); }} style={{ width: '100%', justifyContent: 'center' }}>Submit Another Enquiry</button>
      </div>
    </div>
  );

  return (
    <div className="page-enter">
      <section style={{ background: 'var(--dk)', padding: '140px 5vw 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="srv-hero-grid" style={{ position: 'absolute', inset: 0 }} />
        <p className="sec-label" style={{ position: 'relative' }}>Get Started</p>
        <h1 className="sec-title lt" style={{ position: 'relative' }}>Request a Quote</h1>
        <p style={{ fontSize: 14, color: 'var(--mu)', marginTop: 12, maxWidth: 500, lineHeight: 1.75, position: 'relative' }}>Fill out the form and our engineers will provide an accurate quote within 24 hours.</p>
      </section>
      <section className="quote-section">
        <div className="quote-inner">
          <div>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, color: 'var(--tx)', marginBottom: 16 }}>Simple 3-Step Process</h3>
            <p style={{ fontSize: 14, color: 'var(--txm)', lineHeight: 1.8, marginBottom: 28 }}>Share your requirements, we'll assess, and get back with a competitive quote — no obligation.</p>
            <div className="quote-steps">
              {[['Submit Form','Tell us your requirement and upload drawings if available.'],['Team Assessment','Our engineers review specs and check feasibility.'],['Quote in 24hrs','You get a detailed quote with timeline and pricing.']].map(([h, d], i) => (
                <div key={i} className="quote-step">
                  <div className="qstep-num">0{i + 1}</div>
                  <div className="qstep-text"><h4>{h}</h4><p>{d}</p></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40, background: 'var(--dk)', padding: 24 }}>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 14 }}>Prefer Direct Contact?</p>
              {[['7564030523','Primary'],['9485979490','Secondary'],['vrengineering950@gmail.com','Email']].map(([v, l]) => (
                <div key={v} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.05)', fontSize: 13, color: 'var(--mu)' }}>
                  <span>{v}</span><span style={{ color: 'var(--or)', fontSize: 11 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="quote-form">
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 24 }}>Enquiry Form</p>
            <form onSubmit={submit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" placeholder="10-digit mobile" value={form.phone} onChange={e => set('phone', e.target.value)} />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" placeholder="Optional" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Industry</label>
                  <input className="form-input" placeholder="Optional" value={form.company} onChange={e => set('company', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type of Work *</label>
                  <select className="form-select" value={form.service} onChange={e => set('service', e.target.value)}>
                    <option value="">Select service...</option>
                    {SERVICES_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  {errors.service && <span className="error-msg">{errors.service}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity / Batch Size</label>
                  <input className="form-input" placeholder="e.g. 100 pcs" value={form.qty} onChange={e => set('qty', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Requirement Details *</label>
                <textarea className="form-textarea" placeholder="Describe your requirement — material, dimensions, tolerances, quantity, timeline..." value={form.desc} onChange={e => set('desc', e.target.value)} />
                {errors.desc && <span className="error-msg">{errors.desc}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Upload Drawing (Optional)</label>
                <div className="upload-area" onClick={() => upRef.current?.click()}>
                  <Upload size={22} color="#aaa" style={{ margin: '0 auto' }} />
                  <p className="upload-text">{form.file ? `✓ ${form.file.name}` : 'Click to upload PDF / JPG / PNG (max 5MB)'}</p>
                </div>
                <input ref={upRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => set('file', e.target.files[0])} />
              </div>
              <button type="submit" className="btn-or" style={{ width: '100%', justifyContent: 'center' }}>
                Send Enquiry <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════════════════════ */
export function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="page-enter">
      <section style={{ background: 'var(--dk)', padding: '140px 5vw 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="srv-hero-grid" style={{ position: 'absolute', inset: 0 }} />
        <p className="sec-label" style={{ position: 'relative' }}>Reach Us</p>
        <h1 className="sec-title lt" style={{ position: 'relative' }}>Get In Touch</h1>
        <p style={{ fontSize: 14, color: 'var(--mu)', marginTop: 12, maxWidth: 500, lineHeight: 1.75, position: 'relative' }}>Visit our workshop, call us directly, or drop a message. We're always ready.</p>
      </section>
      <section className="contact-section" style={{ background: 'var(--st)' }}>
        <div className="contact-inner">
          <div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 20 }}>Contact Information</p>
            <div>
              {[
                [<Phone size={18} />, 'Phone Numbers', <><a href="tel:7564030523">7564030523</a> &nbsp;/&nbsp; <a href="tel:9485979490">9485979490</a></>],
                [<Mail size={18} />, 'Email Address', <a href="mailto:vrengineering950@gmail.com">vrengineering950@gmail.com</a>],
                [<MapPin size={18} />, 'Workshop Address', 'Sharma Market, Budhi Bawal, Main Road Khushkhera, Alwar (Raj.) 301707'],
                [<Clock size={18} />, 'Business Hours', 'Mon–Sat: 9:00 AM – 7:00 PM'],
                [<Shield size={18} />, 'GST / PAN', 'GST: 08AAZFV1575E1ZK · PAN: AAZFV1575E'],
              ].map(([ic, lbl, val], i) => (
                <div key={i} className="c-item">
                  <div className="c-icon">{ic}</div>
                  <div><p className="c-label">{lbl}</p><p className="c-val">{val}</p></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://wa.me/917564030523" target="_blank" rel="noreferrer" className="btn-or" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <MessageCircle size={15} /> WhatsApp Chat
              </a>
              <a href="tel:7564030523" className="btn-gh" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <Phone size={15} /> Call Now
              </a>
            </div>
            <div className="map-placeholder">
              <div className="map-grid" />
              <MapPin size={40} className="map-pin" color="#FF6B1A" />
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--mu)', zIndex: 1 }}>VR Engineering</p>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,242,238,.3)', zIndex: 1 }}>Khushkhera, Alwar, Rajasthan</p>
            </div>
          </div>
          <div className="contact-form-wrap">
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 24 }}>Quick Message</p>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 54, height: 54, background: 'var(--or)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Check size={22} color="#0C0D0F" /></div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: 'var(--or)' }}>Message Received!</h3>
                <p style={{ fontSize: 13, color: 'var(--mu)', marginTop: 8 }}>We'll get back to you soon.</p>
                <button className="btn-or" style={{ marginTop: 20 }} onClick={() => { setSent(false); setForm({ name: '', phone: '', msg: '' }); }}>Send Another</button>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--mu2)' }}>Your Name</label>
                  <input className="form-input" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: 'var(--wh)' }} placeholder="Name" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--mu2)' }}>Phone Number</label>
                  <input className="form-input" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: 'var(--wh)' }} placeholder="Mobile number" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--mu2)' }}>Message</label>
                  <textarea className="form-textarea" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: 'var(--wh)', minHeight: 120 }} placeholder="Your message..." value={form.msg} onChange={e => set('msg', e.target.value)} />
                </div>
                <button className="btn-or" style={{ width: '100%', justifyContent: 'center' }} onClick={() => form.name && form.phone && setSent(true)}>
                  Send Message <Send size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
