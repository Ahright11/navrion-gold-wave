import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";

interface HeroProps {
  isActive?: boolean;
  onNavigate?: (section: number) => void;
}

function CountUp({ target, suffix, active, format }: { target: number; suffix: string; active: boolean; format?: (n: number) => string }) {
  const [count, setCount] = useState(0);
  const [preloaderDone, setPreloaderDone] = useState(
    typeof document !== 'undefined' && document.readyState === 'complete' && !document.querySelector('[data-preloader]'),
  );
  const done = useRef(false);

  useEffect(() => {
    if (preloaderDone) return;
    const onDone = () => setPreloaderDone(true);
    window.addEventListener('preloader-done', onDone);
    const fallback = setTimeout(onDone, 3500);
    return () => { window.removeEventListener('preloader-done', onDone); clearTimeout(fallback); };
  }, [preloaderDone]);

  useEffect(() => {
    if (!active || !preloaderDone || done.current) return;
    done.current = true;
    const duration = 2500;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = Math.floor(target * easeOut(t));
      setCount(t >= 1 ? target : v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, preloaderDone, target]);

  return <span className="tabular-nums">{format ? format(count) : count}{suffix}</span>;
}

export default function Hero({ isActive = false, onNavigate }: HeroProps) {
  const { t } = useI18n();
  const stats: { value: number; suffix: string; label: string; labelFull: string; format?: (n: number) => string }[] = [
    { value: 11, suffix: "",  label: t.statsYears, labelFull: t.statsYearsFull },
    { value: 9,  suffix: "",  label: t.statsManaged, labelFull: t.statsManagedFull },
    { value: 5,  suffix: "",  label: t.statsActive, labelFull: t.statsActiveFull },
    { value: 3,  suffix: "",  label: t.statsNewbuilds, labelFull: t.statsNewbuildsFull },
    { value: 19150000, suffix: "+", label: t.statsCargo, labelFull: t.statsCargoFull, format: (n) => n.toLocaleString('en-US') },
    { value: 5, suffix: "/5", label: t.statsRightShip, labelFull: t.statsRightShipFull },
  ];
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) videoRef.current?.play().catch(() => {});
    else videoRef.current?.pause();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const el = taglineRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLSpanElement>(".hero-word").forEach((word, i) => {
      word.style.animation = "none";
      void word.offsetWidth;
      word.style.animation = "";
      word.style.animationDelay = `${0.45 + i * 0.22}s`;
      word.style.animationDuration = "0.8s";
    });
  }, [isActive]);

  return (
    <section className="relative h-full overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        src="/videos/new-galaxy-hero.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/new-galaxy-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(8,32,60,0.65) 0%, rgba(8,32,60,0.45) 50%, rgba(8,32,60,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 -mt-10 sm:-mt-16 lg:-mt-20">
          <p className="font-raleway text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase text-white/50 mb-2 sm:mb-4 reveal">
            {t.boutique}
          </p>

          <h1
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-9xl tracking-[0.04em] sm:tracking-[0.06em] lg:tracking-[0.08em] uppercase text-white text-center mb-3 sm:mb-5 reveal"
            style={{ transitionDelay: "300ms" }}
          >
            New Vision Shipping
          </h1>

          <p
            ref={taglineRef}
            className="font-display font-normal text-base sm:text-xl md:text-3xl lg:text-4xl text-white/60 text-center mb-4 sm:mb-6 md:mb-8"
          >
            {t.heroWords.map((word, i) => (
              <span key={i}>
                <span className="hero-word">{word}</span>
                {i < 2 && <span className="opacity-30">, </span>}
              </span>
            ))}
          </p>

          <div className="reveal" style={{ transitionDelay: "1000ms" }}>
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-medium tracking-widest uppercase bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              onClick={(e) => { e.preventDefault(); onNavigate?.(4); }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-20 reveal" style={{ transitionDelay: "1200ms" }}>
          <div className="border-t" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="container mx-auto px-3 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-white/10">
                {stats.map((s) => (
                  <div key={s.label} className="text-center py-2.5 sm:py-4 md:py-5">
                    <div className="font-raleway text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-0.5 tabular-nums">
                      <CountUp target={s.value} suffix={s.suffix} active={isActive} format={s.format} />
                    </div>
                    <div className="font-raleway text-[6px] sm:text-[9px] md:text-[10px] tracking-[0.08em] sm:tracking-[0.12em] uppercase text-white/40">
                      <span className="sm:hidden">{s.label}</span>
                      <span className="hidden sm:inline">{s.labelFull}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hidden sm:flex absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-0">
        <div className="scroll-cue-line w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-white/60" />
      </div>
    </section>
  );
}
