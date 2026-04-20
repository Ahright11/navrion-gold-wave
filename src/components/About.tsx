import { useState } from "react";
import { X, Download } from "lucide-react";
import aboutImage from "@/assets/about-port.jpg";
import { useI18n } from "@/i18n";

export default function About() {
  const { t } = useI18n();
  const [showPsc, setShowPsc] = useState(false);

  return (
    <section id="about" className="relative h-full flex flex-col justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aboutImage})` }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(8, 32, 60, 0.90)" }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Label */}
        <p className="font-raleway text-[9px] min-[390px]:text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[hsl(208_74%_65%)] mb-4 sm:mb-6 md:mb-8 text-center reveal">
          Our Vision
        </p>

        {/* Big pull quote */}
        <h2 className="font-display font-bold text-xl min-[390px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center leading-snug mb-3 min-[390px]:mb-4 sm:mb-5 md:mb-6 max-w-3xl mx-auto reveal" style={{ transitionDelay: '150ms' }}>
          A boutique shipmanagement company built on decades of expertise and the highest industry standards
        </h2>

        {/* One-liner */}
        <p className="font-raleway text-[10px] min-[390px]:text-[11px] sm:text-sm md:text-base text-white/50 text-center max-w-2xl mx-auto leading-relaxed mb-6 min-[390px]:mb-8 sm:mb-10 md:mb-12 reveal" style={{ transitionDelay: '300ms' }}>
          Operating from the historical Ionian Building in the heart of Piraeus — the global shipping hub.
        </p>

        {/* Stats row — clean, no boxes */}
        <div className="flex items-center justify-center gap-6 min-[390px]:gap-8 sm:gap-12 md:gap-16 reveal" style={{ transitionDelay: '450ms' }}>
          <div className="text-center">
            <p className="font-display font-bold text-2xl min-[390px]:text-3xl sm:text-4xl md:text-5xl text-white">11</p>
            <p className="font-raleway text-[7px] min-[390px]:text-[8px] sm:text-[10px] tracking-[0.12em] uppercase text-white/30 mt-1">{t.statsYearsFull}</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-white/10" />
          <div className="text-center">
            <p className="font-display font-bold text-2xl min-[390px]:text-3xl sm:text-4xl md:text-5xl text-white">9</p>
            <p className="font-raleway text-[7px] min-[390px]:text-[8px] sm:text-[10px] tracking-[0.12em] uppercase text-white/30 mt-1">{t.statsManagedFull}</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-white/10" />
          <div className="text-center">
            <p className="font-display font-bold text-2xl min-[390px]:text-3xl sm:text-4xl md:text-5xl text-white">5</p>
            <p className="font-raleway text-[7px] min-[390px]:text-[8px] sm:text-[10px] tracking-[0.12em] uppercase text-white/30 mt-1">{t.statsActiveFull}</p>
          </div>
          <div className="w-px h-8 sm:h-10 bg-white/10" />
          <button onClick={() => setShowPsc(true)} className="text-center group cursor-pointer">
            <p className="font-display font-bold text-2xl min-[390px]:text-3xl sm:text-4xl md:text-5xl text-white group-hover:text-[hsl(208_74%_65%)] transition-colors">#8</p>
            <p className="font-raleway text-[7px] min-[390px]:text-[8px] sm:text-[10px] tracking-[0.12em] uppercase text-white/30 group-hover:text-white/50 transition-colors mt-1">PSC Top 10 →</p>
          </button>
        </div>

        {/* Cert strip */}
        <div className="flex flex-wrap justify-center gap-x-3 min-[390px]:gap-x-4 sm:gap-x-6 md:gap-x-8 mt-5 min-[390px]:mt-6 sm:mt-8 md:mt-10 reveal" style={{ transitionDelay: '550ms' }}>
          {["ISO 9001:2015", "Bureau Veritas", "RightShip 5/5", "INTERCARGO", "GARD P&I"].map((c) => (
            <span key={c} className="font-raleway text-[7px] min-[390px]:text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.12em] uppercase text-white/20">{c}</span>
          ))}
        </div>
      </div>

      {/* PSC Modal */}
      {showPsc && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(5, 15, 30, 0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowPsc(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 sm:mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPsc(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
            <img
              src="/risk4sea-chart.png"
              alt="RISK4SEA Top 10 PSC Performers"
              className="w-full rounded-sm"
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="font-raleway text-xs sm:text-sm text-white/50">
                Ranked <span className="text-white font-medium">#8 Worldwide</span> — Supramax PSC Performance
              </p>
              <a
                href="/risk4sea-psc-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-raleway text-xs tracking-wider uppercase hover:bg-white/20 transition-colors rounded-sm shrink-0"
              >
                <Download size={14} strokeWidth={1.5} />
                PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
