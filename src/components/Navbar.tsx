import { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { useI18n } from '@/i18n';

interface NavbarProps {
  dark?: boolean;
  current?: number;
  onNavigate?: (section: number) => void;
}

export default function Navbar({ dark = false, current = 0, onNavigate }: NavbarProps) {
  const { t } = useI18n();
  const links = [
    { label: t.home,     section: 0 },
    { label: t.fleet,    section: 2 },
    { label: t.contact,  section: 4 },
  ];
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<'closed' | 'entering' | 'open' | 'leaving'>('closed');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setPhase('entering');
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('open')));
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClose = () => {
    setPhase('leaving');
    setTimeout(() => {
      setOpen(false);
      setPhase('closed');
      document.body.style.overflow = '';
    }, 350);
  };

  const handleNav = (section: number) => {
    setPhase('leaving');
    setTimeout(() => {
      setOpen(false);
      setPhase('closed');
      document.body.style.overflow = '';
      onNavigate?.(section);
    }, 300);
  };

  const show = phase === 'open';
  const hiding = phase === 'leaving';

  const bg = dark
    ? 'bg-[hsl(208_80%_10%/0.45)] backdrop-blur-md border-b border-white/10'
    : 'bg-white/80 backdrop-blur-md border-b border-[hsl(208_74%_42%/0.08)]';

  const burgerColor = dark ? 'text-white' : 'text-[hsl(208_80%_16%)]';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bg}`}>
        <div className="container mx-auto flex items-center justify-center h-14 sm:h-16 md:h-[4.5rem] px-4 sm:px-6 lg:px-8">
          {/* Center — logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate?.(0); }}
            className="flex items-center transition-all duration-500"
          >
            <img
              src="/nv-logo.png"
              alt="New Vision Shipping"
              className="h-5 min-[390px]:h-6 sm:h-7 md:h-10 w-auto"
              style={{ filter: dark ? 'brightness(0) invert(1)' : 'none' }}
            />
          </a>

          {/* Right — hamburger */}
          <div className="absolute right-4 sm:right-6 lg:right-8">
            <button
              className={`transition-colors duration-300 p-1.5 ${burgerColor}`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{
            backgroundColor: (show || hiding) ? 'hsl(208 80% 8%)' : 'hsl(208 80% 8% / 0)',
            opacity: hiding ? 0 : (show ? 1 : 0),
            transition: hiding ? 'opacity 0.3s ease' : 'background-color 0.35s ease, opacity 0.35s ease',
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-5 sm:px-8 lg:px-12 h-14 sm:h-16 md:h-[4.5rem] shrink-0"
            style={{
              opacity: show && !hiding ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleNav(0); }}
            >
              <img
                src="/nv-logo.png"
                alt="New Vision Shipping"
                className="h-5 min-[390px]:h-6 sm:h-7 md:h-10 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors duration-200 p-1.5"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Center — nav links */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-4 sm:-mt-8">
            <div className="w-full max-w-md px-8 sm:px-12">
              {links.map((l, i) => {
                const isActive = current === l.section;
                return (
                  <a
                    key={l.label}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleNav(l.section); }}
                    className="group flex items-center gap-4 sm:gap-5 py-4 sm:py-5 md:py-6 border-b border-white/10 last:border-0"
                    style={{
                      opacity: show && !hiding ? 1 : 0,
                      transform: show && !hiding ? 'translateY(0)' : 'translateY(12px)',
                      transition: hiding
                        ? 'opacity 0.15s ease, transform 0.15s ease'
                        : 'opacity 0.4s ease, transform 0.4s ease',
                      transitionDelay: hiding ? '0ms' : `${150 + i * 80}ms`,
                    }}
                  >
                    <span className={`font-raleway font-bold text-2xl min-[390px]:text-3xl sm:text-4xl md:text-5xl tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-white/35 group-hover:text-white/75'
                    }`}>
                      {l.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[hsl(208_74%_55%)] ml-auto" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom — contact info */}
          <div
            className="shrink-0 px-5 sm:px-8 lg:px-12 pb-6 sm:pb-8 md:pb-10"
            style={{
              opacity: show && !hiding ? 1 : 0,
              transition: hiding ? 'opacity 0.1s ease' : 'opacity 0.4s ease',
              transitionDelay: hiding ? '0ms' : '450ms',
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 md:gap-12">
              <div className="flex items-center gap-2">
                <Mail size={11} className="text-white/25" strokeWidth={1.5} />
                <span className="font-raleway text-[10px] sm:text-xs text-white/40">info@nvshipping.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={11} className="text-white/25" strokeWidth={1.5} />
                <span className="font-raleway text-[10px] sm:text-xs text-white/40">+30 2110130400</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={11} className="text-white/25" strokeWidth={1.5} />
                <span className="font-raleway text-[10px] sm:text-xs text-white/40">Piraeus, Greece</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
