import { useRef, useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useFullPage, SLIDE_DURATION, REVEAL_DELAY } from '@/hooks/useFullPage';
import Navbar      from '@/components/Navbar';
import Hero        from '@/components/Hero';
import Services    from '@/components/Services';
import Fleet       from '@/components/Fleet';
import Contact     from '@/components/Contact';
import Footer      from '@/components/Footer';
import DotNav      from '@/components/DotNav';

const PortsMap = lazy(() => import('@/components/PortsMap'));

const TOTAL        = 5;
const DARK_SECTIONS = [0, 2, 3];

export default function Index() {
  const { current, prevSection, direction, goTo } = useFullPage(TOTAL);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Desktop: reveal animations driven by full-page navigation
  useEffect(() => {
    if (isMobile) return;
    if (prevSection === null) return;
    sectionRefs.current[prevSection]
      ?.querySelectorAll('.reveal, .reveal-card, .reveal-icon, .reveal-left, .reveal-right')
      .forEach(el => el.classList.remove('visible'));
  }, [prevSection, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const delay = current === 0 ? 80 : REVEAL_DELAY;
    const t = setTimeout(() => {
      sectionRefs.current[current]
        ?.querySelectorAll('.reveal, .reveal-card, .reveal-icon, .reveal-left, .reveal-right')
        .forEach(el => el.classList.add('visible'));
    }, delay);
    return () => clearTimeout(t);
  }, [current, isMobile]);

  // Mobile: IntersectionObserver for reveal animations
  useEffect(() => {
    if (!isMobile) return;
    const elements = document.querySelectorAll('.reveal, .reveal-card, .reveal-icon, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile: handle goTo by scrolling to section
  const mobileGoTo = useCallback((section: number) => {
    if (!isMobile) {
      goTo(section);
      return;
    }
    const el = sectionRefs.current[section];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMobile, goTo]);

  // Mobile: track which section is in view for navbar dark/light
  const [mobileSection, setMobileSection] = useState(0);
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setMobileSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [isMobile]);

  const activeSection = isMobile ? mobileSection : current;
  const isDark = DARK_SECTIONS.includes(activeSection);

  // Desktop slide styles
  const dur = SLIDE_DURATION;
  const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';

  const getStyle = (i: number): React.CSSProperties => {
    const isActive = i === current;
    const isPrev   = i === prevSection;

    if (isActive) {
      return { position: 'absolute', inset: 0, opacity: 1, transform: 'translateY(0)', transition: `opacity ${dur}ms ${ease}, transform ${dur}ms ${ease}`, zIndex: 2, pointerEvents: 'auto', willChange: 'opacity, transform' };
    }
    if (isPrev) {
      return { position: 'absolute', inset: 0, opacity: 0.3, transform: direction === 'down' ? 'translateY(-100%)' : 'translateY(100%)', transition: `opacity ${dur}ms ${ease}, transform ${dur}ms ${ease}`, zIndex: 1, pointerEvents: 'none', willChange: 'opacity, transform' };
    }
    return { position: 'absolute', inset: 0, opacity: 0, transform: i < current ? 'translateY(-100%)' : 'translateY(100%)', transition: 'none', zIndex: 0, pointerEvents: 'none' };
  };

  const slides = [
    <Hero isActive={isMobile ? true : current === 0} onNavigate={mobileGoTo} />,
    <Services />,
    <Fleet />,
    <Suspense fallback={<div className="h-full bg-[hsl(208_80%_8%)]" />}><PortsMap /></Suspense>,
    <div className="flex flex-col h-full"><Contact /><Footer /></div>,
  ];

  // Mobile: normal scrolling layout
  if (isMobile) {
    return (
      <div className="w-screen">
        <Navbar dark={isDark} current={mobileSection} onNavigate={mobileGoTo} />

        <div ref={el => { sectionRefs.current[0] = el; }} className="min-h-screen h-screen">
          {slides[0]}
        </div>
        <div ref={el => { sectionRefs.current[1] = el; }} className="min-h-screen">
          {slides[1]}
        </div>
        <div ref={el => { sectionRefs.current[2] = el; }} className="min-h-screen">
          {slides[2]}
        </div>
        <div ref={el => { sectionRefs.current[3] = el; }}>
          {slides[3]}
        </div>
        <div ref={el => { sectionRefs.current[4] = el; }}>
          {slides[4]}
        </div>
      </div>
    );
  }

  // Desktop: full-page slide system
  return (
    <div className="relative w-screen overflow-hidden" style={{ height: '100dvh' }}>
      <Navbar dark={isDark} current={current} onNavigate={(i) => goTo(i)} />
      <DotNav total={TOTAL} current={current} onNavigate={(i) => goTo(i)} darkSections={DARK_SECTIONS} />

      {slides.map((slide, i) => (
        <div key={i} ref={el => { sectionRefs.current[i] = el; }} style={getStyle(i)}>
          {slide}
        </div>
      ))}
    </div>
  );
}
