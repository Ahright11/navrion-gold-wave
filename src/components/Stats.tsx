import { useEffect, useRef, useState } from "react";
import aboutImage from "@/assets/about-port.jpg";

const stats = [
  { value: 11, suffix: "", label: "Years of Presence" },
  { value: 9, suffix: "", label: "Managed Vessels" },
  { value: 5, suffix: "", label: "Under Management" },
  { value: 3, suffix: "", label: "New Building Projects" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const duration = 1600;
    const steps = 50;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, stepTime);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span className="tabular-nums">{count}{suffix}</span>;
}

interface StatsProps {
  isActive?: boolean;
}

export default function Stats({ isActive = false }: StatsProps) {
  return (
    <section
      id="stats"
      className="relative h-full flex flex-col justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aboutImage})` }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(8, 32, 60, 0.84)" }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 md:mb-14">
          <p className="font-raleway text-[10px] sm:text-xs tracking-[0.15em] uppercase text-white/40 mb-2 sm:mb-3 reveal">
            Track Record
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-3 sm:mb-5 reveal" style={{ transitionDelay: "200ms" }}>
            By the Numbers
          </h2>
          <p className="font-raleway text-xs sm:text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed reveal" style={{ transitionDelay: "400ms" }}>
            Two decades of consistent, safe operations across every major trading route — backed by numbers that speak for themselves.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center py-4 sm:py-6 reveal"
              style={{
                transitionDelay: `${500 + i * 200}ms`,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "3px",
              }}
            >
              <div className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-1 sm:mb-2">
                <CountUp target={s.value} suffix={s.suffix} active={isActive} />
              </div>
              <div className="font-raleway text-[10px] sm:text-xs tracking-[0.12em] uppercase text-white/45">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 reveal" style={{ transitionDelay: "1100ms" }}>
          {[
            { title: "Zero PSC Detentions", text: "Clean port state control record across all managed vessels." },
            { title: "24/7 Operations", text: "Round-the-clock monitoring and emergency response from Piraeus." },
            { title: "98% Crew Retention", text: "Industry-leading retention through fair pay, training, and welfare." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[hsl(208_74%_55%)] mt-1.5 shrink-0" />
              <div>
                <p className="font-raleway text-xs sm:text-sm font-medium text-white/80 mb-0.5">{item.title}</p>
                <p className="font-raleway text-[10px] sm:text-xs text-white/40 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
