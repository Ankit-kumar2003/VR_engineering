import { useState, useEffect, useRef } from 'react';
import './index.css';
import { Navbar, Footer, WhatsAppButton } from './components/Shared.jsx';
import { HomePage, ServicesPage, GalleryPage, AboutPage, QuotePage, ContactPage } from './pages.jsx';
import ChatBot from './components/ChatBot.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const scrollRef = useRef(null);

  // Custom cursor
  useEffect(() => {
    let rx = 0, ry = 0, cx = 0, cy = 0;
    const onM = (e) => { cx = e.clientX; cy = e.clientY; };
    addEventListener('mousemove', onM);
    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (dotRef.current) { dotRef.current.style.left = cx + 'px'; dotRef.current.style.top = cy + 'px'; }
      rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px'; }
    };
    loop();
    return () => { removeEventListener('mousemove', onM); cancelAnimationFrame(raf); };
  }, []);

  const goTo = (p) => {
    setPage(p);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const renderPage = () => {
    switch (page) {
      case 'home':     return <HomePage goTo={goTo} />;
      case 'services': return <ServicesPage goTo={goTo} />;
      case 'gallery':  return <GalleryPage />;
      case 'about':    return <AboutPage goTo={goTo} />;
      case 'quote':    return <QuotePage />;
      case 'contact':  return <ContactPage />;
      default:         return <HomePage goTo={goTo} />;
    }
  };

  return (
    <>
      {/* Custom Cursor */}
      <div ref={dotRef} className="cur-d" />
      <div ref={ringRef} className="cur-r" />

      {/* Main Scrollable Container */}
      <div
        ref={scrollRef}
        style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: 'var(--dk)' }}
      >
        <Navbar page={page} goTo={goTo} scrollRef={scrollRef} />
        {renderPage()}
        <Footer goTo={goTo} />
      </div>

      {/* Floating Buttons */}
      <WhatsAppButton />
      <ChatBot />
    </>
  );
}
