import { useState } from "react";
import { Wrench, Users, BarChart3, Shield, Award, FileCheck, Globe, Anchor, Star, BadgeCheck, ShieldCheck, Scale, X, Download, ChevronDown, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n";

export default function Services() {
  const { t } = useI18n();
  const [active, setActive] = useState(1);
  const [showPsc, setShowPsc] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showCert, setShowCert] = useState(false);

  const services = [
    {
      title: t.commercial,
      subtitle: t.commercialSub,
      description: t.commercialDesc,
      icon: BarChart3,
      credentials: [
        { text: "RightShip 5/5 Rating", icon: Star },
        { text: "INTERCARGO Member", icon: Globe },
        { text: "9+ Vessels Managed", icon: Anchor },
      ],
    },
    {
      title: t.technical,
      subtitle: t.technicalSub,
      description: t.technicalDesc,
      icon: Wrench,
      credentials: [
        { text: "ISO 9001:2015", icon: BadgeCheck, cert: "/iso-9001-certificate.pdf" },
        { text: "Bureau Veritas DOC", icon: FileCheck },
        { text: "DNV · ClassNK", icon: ShieldCheck },
      ],
    },
    {
      title: t.crew,
      subtitle: t.crewSub,
      description: t.crewDesc,
      icon: Users,
      credentials: [
        { text: "MLC 2006 Compliant", icon: Scale },
        { text: "GARD P&I Club", icon: Shield },
        { text: "STCW Certified", icon: Award },
      ],
    },
  ];

  const current = services[active];

  return (
    <section id="services" className="relative min-h-screen md:h-full flex flex-col bg-white px-3 sm:px-6 lg:px-8 pt-12 sm:pt-14 md:pt-24 pb-2 sm:pb-4 md:pb-8 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <img
          src="/nv-emblem-brand.svg"
          alt=""
          aria-hidden
          className="h-[78%] md:h-[80%] w-auto opacity-[0.24]"
        />
      </div>
      <div className="relative container mx-auto max-w-6xl flex flex-col flex-1 md:h-full md:justify-start">

        {/* Header — company intro + stats */}
        <div className="text-center mb-1 min-[390px]:mb-1.5 sm:mb-4 md:mb-3 shrink-0">
          <p className="font-raleway text-[8px] min-[390px]:text-[9px] sm:text-xs tracking-[0.15em] uppercase text-[hsl(208_74%_42%)] mb-0.5 sm:mb-2 reveal">
            {t.ourServices}
          </p>
          <h2 className="font-display font-bold text-sm min-[390px]:text-base sm:text-2xl md:text-3xl lg:text-4xl text-[hsl(208_80%_18%)] mb-0.5 min-[390px]:mb-1 sm:mb-2 reveal" style={{ transitionDelay: "150ms" }}>
            {t.fullFleet}
          </h2>
          <p className="font-raleway text-[9px] min-[390px]:text-[10px] sm:text-xs md:text-sm tracking-[0.18em] uppercase text-[hsl(208_74%_42%)] font-medium mb-1 sm:mb-3 reveal" style={{ transitionDelay: "200ms" }}>
            {t.servicesTagline}
          </p>
          <p className="font-raleway sm:text-sm md:text-[14px] text-[hsl(215_15%_40%)] max-w-3xl mx-auto leading-snug sm:mb-2 reveal hidden sm:block" style={{ transitionDelay: "250ms" }}>
            {t.servicesIntro}
          </p>
          {/* Desktop — stacked 3-line list */}
          <div className="max-w-3xl mx-auto sm:mb-1.5 reveal hidden sm:block" style={{ transitionDelay: "300ms" }}>
            <p className="font-raleway sm:text-sm md:text-[15px] text-[hsl(208_80%_18%)] leading-relaxed font-medium mb-1.5">
              {t.chartererCoop}
            </p>
            {t.chartererList.map((line, i) => (
              <p
                key={i}
                className="font-raleway text-[11px] sm:text-[12px] md:text-[13px] text-[hsl(215_15%_45%)] leading-relaxed tracking-wide"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Mobile — scrolling marquee */}
          <div className="sm:hidden reveal mt-1 mb-0.5" style={{ transitionDelay: "300ms" }}>
            <p className="font-raleway text-[9px] min-[390px]:text-[10px] text-[hsl(208_80%_18%)] font-medium text-center mb-1">
              {t.chartererCoop}
            </p>
            <div
              className="relative w-full overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <div className="flex whitespace-nowrap animate-marquee w-max">
                {[0, 1].map((dup) => (
                  <span
                    key={dup}
                    aria-hidden={dup === 1}
                    className="inline-flex items-center shrink-0 px-3 font-raleway font-semibold text-[8px] min-[390px]:text-[9px] tracking-[0.06em] uppercase text-[hsl(208_80%_22%)]"
                  >
                    {t.chartererList.join(" · ")} <span className="px-2 text-[hsl(215_15%_65%)]">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="font-raleway sm:text-sm md:text-[13.5px] text-[hsl(215_15%_45%)] max-w-3xl mx-auto leading-snug sm:mb-1 reveal hidden sm:block italic" style={{ transitionDelay: "350ms" }}>
            {t.envStrategy}
          </p>
          <p className="font-raleway sm:text-sm md:text-[13.5px] text-[hsl(215_15%_40%)] max-w-3xl mx-auto leading-snug sm:mb-1 reveal hidden sm:block" style={{ transitionDelay: "400ms" }}>
            {t.safetyCulture}
          </p>
          <p className="font-raleway sm:text-sm md:text-[13.5px] text-[hsl(208_80%_22%)] max-w-3xl mx-auto leading-snug sm:mb-2 reveal hidden sm:block font-medium" style={{ transitionDelay: "450ms" }}>
            {t.trustValue}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-3 min-[390px]:gap-4 sm:gap-8 md:gap-10 mb-1 min-[390px]:mb-1.5 sm:mb-4 reveal" style={{ transitionDelay: "300ms" }}>
            <div className="text-center">
              <p className="font-raleway font-bold text-sm min-[390px]:text-base sm:text-2xl md:text-3xl text-[hsl(208_80%_18%)] tabular-nums">11</p>
              <p className="font-raleway text-[5px] min-[390px]:text-[6px] sm:text-[9px] tracking-[0.1em] uppercase text-[hsl(215_15%_55%)]">{t.statsYears}</p>
            </div>
            <div className="w-px h-4 sm:h-7 bg-[hsl(210_15%_85%)]" />
            <div className="text-center">
              <p className="font-raleway font-bold text-sm min-[390px]:text-base sm:text-2xl md:text-3xl text-[hsl(208_80%_18%)] tabular-nums">9</p>
              <p className="font-raleway text-[5px] min-[390px]:text-[6px] sm:text-[9px] tracking-[0.1em] uppercase text-[hsl(215_15%_55%)]">{t.statsManaged}</p>
            </div>
            <div className="w-px h-4 sm:h-7 bg-[hsl(210_15%_85%)]" />
            <div className="text-center">
              <p className="font-raleway font-bold text-sm min-[390px]:text-base sm:text-2xl md:text-3xl text-[hsl(208_80%_18%)] tabular-nums">5</p>
              <p className="font-raleway text-[5px] min-[390px]:text-[6px] sm:text-[9px] tracking-[0.1em] uppercase text-[hsl(215_15%_55%)]">{t.statsActive}</p>
            </div>
            <div className="w-px h-4 sm:h-7 bg-[hsl(210_15%_85%)]" />
            <div className="text-center">
              <p className="font-raleway font-bold text-[10px] min-[390px]:text-xs sm:text-lg md:text-xl text-[hsl(208_80%_18%)] tabular-nums">19,150,000+</p>
              <p className="font-raleway text-[5px] min-[390px]:text-[6px] sm:text-[9px] tracking-[0.1em] uppercase text-[hsl(215_15%_55%)]">{t.statsCargo}</p>
            </div>
            <div className="w-px h-4 sm:h-7 bg-[hsl(210_15%_85%)]" />
            <div className="text-center">
              <p className="font-raleway font-bold text-sm min-[390px]:text-base sm:text-2xl md:text-3xl text-[hsl(208_80%_18%)] tabular-nums">5/5</p>
              <p className="font-raleway text-[5px] min-[390px]:text-[6px] sm:text-[9px] tracking-[0.1em] uppercase text-[hsl(215_15%_55%)]">{t.statsRightShip}</p>
            </div>
          </div>

          {/* PSC badge + Our Vision trigger — centered below stats */}
          <div className="flex flex-wrap justify-center items-center gap-2 min-[390px]:gap-3 mt-1.5 min-[390px]:mt-2 sm:mt-3 reveal" style={{ transitionDelay: "400ms" }}>
            <button onClick={() => setShowPsc(true)} className="inline-flex items-center gap-2 min-[390px]:gap-2.5 sm:gap-3 px-3 min-[390px]:px-4 sm:px-5 py-1.5 min-[390px]:py-2 sm:py-2.5 bg-[hsl(208_80%_18%)] hover:bg-[hsl(208_80%_22%)] text-white rounded-sm transition-all group cursor-pointer">
              <span className="font-raleway font-bold text-base min-[390px]:text-lg sm:text-2xl">#8</span>
              <span className="font-raleway text-[8px] min-[390px]:text-[9px] sm:text-xs text-white/60">Top 10 PSC Worldwide</span>
              <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-sm sm:text-base">→</span>
            </button>
            {/* Desktop — Our Vision modal trigger */}
            <button
              onClick={() => setShowVision(true)}
              className="hidden md:inline-flex items-center gap-3 px-5 py-2.5 border border-[hsl(208_74%_42%/0.3)] bg-white/60 hover:bg-[hsl(208_74%_42%/0.08)] hover:border-[hsl(208_74%_42%/0.5)] text-[hsl(208_80%_18%)] rounded-sm transition-all group cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-[hsl(208_80%_18%)] flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-[10px]">NV</span>
              </div>
              <span className="font-raleway text-xs tracking-[0.12em] uppercase font-medium">Our Vision</span>
              <ArrowUpRight size={14} strokeWidth={1.75} className="text-[hsl(208_74%_42%)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

        {/* Desktop layout — tabs */}
        <div className="hidden md:block reveal-card" style={{ transitionDelay: "500ms" }}>
          <div className="flex border-b border-[hsl(210_15%_88%)] mb-0">
            {services.map((s, i) => {
              const TabIcon = s.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 lg:py-5 text-left transition-all duration-300 border-b-2 ${
                    active === i
                      ? "border-[hsl(208_74%_42%)] bg-[hsl(208_74%_42%/0.03)]"
                      : "border-transparent hover:bg-[hsl(210_20%_97%)]"
                  }`}
                >
                  <TabIcon
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-colors duration-300 ${
                      active === i ? "text-[hsl(208_74%_42%)]" : "text-[hsl(215_15%_60%)]"
                    }`}
                  />
                  <span
                    className={`font-display font-bold text-sm lg:text-base tracking-wide transition-colors duration-300 ${
                      active === i ? "text-[hsl(208_80%_18%)]" : "text-[hsl(215_15%_50%)]"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div key={`panel-${active}`} className="animate-fadeIn">
            <div className="grid grid-cols-[1fr_auto] gap-8 lg:gap-14 py-4 lg:py-5">
              <div>
                <p className="font-raleway text-xs tracking-[0.12em] uppercase text-[hsl(208_74%_42%)] mb-3">
                  {current.subtitle}
                </p>
                <p className="font-raleway text-sm lg:text-base text-[hsl(215_15%_35%)] leading-relaxed mb-5 max-w-2xl">
                  {current.description}
                </p>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {current.credentials.map((c) => {
                    const CIcon = c.icon;
                    const hasCert = "cert" in c && !!c.cert;
                    const baseClass = "flex items-center gap-2.5 py-2.5 px-5 rounded-sm bg-[hsl(208_80%_18%)] transition-all duration-200";
                    const clickableClass = `${baseClass} ring-1 ring-transparent hover:ring-[hsl(208_74%_65%)]/50 hover:bg-[hsl(208_80%_22%)] cursor-pointer group`;
                    const inner = (
                      <>
                        <CIcon size={14} strokeWidth={1.5} className="text-[hsl(208_74%_65%)]" />
                        <span className="font-raleway text-[12px] tracking-[0.05em] uppercase text-white/90 font-medium">
                          {c.text}
                        </span>
                        {hasCert && (
                          <ArrowUpRight
                            size={12}
                            strokeWidth={1.75}
                            className="text-white/40 -mr-1 transition-all duration-200 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        )}
                      </>
                    );
                    return hasCert ? (
                      <button
                        key={c.text}
                        type="button"
                        onClick={() => setShowCert(true)}
                        className={clickableClass}
                        aria-label={`View ${c.text} certificate`}
                      >
                        {inner}
                      </button>
                    ) : (
                      <div key={c.text} className={baseClass}>{inner}</div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[160px]">
                {[current.credentials[0], current.credentials[1]].map((s) => {
                  const hasCert = "cert" in s && !!s.cert;
                  const cardStyle = { background: "hsl(208 80% 18%)", borderRadius: "3px" };
                  const inner = (
                    <>
                      {hasCert && (
                        <ArrowUpRight
                          size={13}
                          strokeWidth={1.75}
                          className="absolute top-2 right-2 text-white/40 transition-all duration-200 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      )}
                      <s.icon size={18} strokeWidth={1.5} className="text-[hsl(208_74%_65%)] mx-auto mb-2" />
                      <p className="font-raleway font-medium text-xs text-white/80 tracking-wide">{s.text}</p>
                    </>
                  );
                  return hasCert ? (
                    <button
                      key={s.text}
                      type="button"
                      onClick={() => setShowCert(true)}
                      className="relative p-4 lg:p-5 text-center transition-all duration-200 ring-1 ring-transparent hover:ring-[hsl(208_74%_65%)]/50 cursor-pointer group"
                      style={cardStyle}
                      aria-label={`View ${s.text} certificate`}
                    >
                      {inner}
                    </button>
                  ) : (
                    <div key={s.text} className="relative p-4 lg:p-5 text-center" style={cardStyle}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — basic text (servicesIntro + env/safety/trust) inline, above Our Vision dropdown */}
        <div className="md:hidden flex flex-col gap-1 mt-1 mb-1 px-0.5 reveal" style={{ transitionDelay: '320ms' }}>
          <p className="font-raleway text-[9px] min-[390px]:text-[10px] text-[hsl(215_15%_40%)] leading-snug">
            {t.servicesIntro}
          </p>
          <p className="font-raleway text-[8.5px] min-[390px]:text-[9.5px] text-[hsl(215_15%_45%)] leading-snug italic">
            {t.envStrategy}
          </p>
          <p className="font-raleway text-[8.5px] min-[390px]:text-[9.5px] text-[hsl(215_15%_45%)] leading-snug">
            {t.safetyCulture}
          </p>
          <p className="font-raleway text-[9px] min-[390px]:text-[10px] text-[hsl(208_80%_22%)] leading-snug font-medium">
            {t.trustValue}
          </p>
        </div>

        {/* Mobile — "Our Vision" expandable + service cards */}
        <div className="md:hidden flex flex-col gap-1 min-[390px]:gap-1.5 flex-1">
          {/* Our Vision toggle */}
          <button
            onClick={() => setShowVision(!showVision)}
            className="flex items-center justify-between w-full py-1.5 min-[390px]:py-2 px-2.5 min-[390px]:px-3 border border-[hsl(208_74%_42%/0.2)] bg-[hsl(208_74%_42%/0.04)] hover:bg-[hsl(208_74%_42%/0.08)] text-[hsl(208_80%_18%)] rounded-sm reveal-card transition-all"
            style={{ transitionDelay: '350ms' }}
          >
            <div className="flex items-center gap-2 min-[390px]:gap-2.5">
              <div className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 rounded bg-[hsl(208_80%_18%)] flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-[7px] min-[390px]:text-[8px]">NV</span>
              </div>
              <span className="font-raleway text-[10px] min-[390px]:text-[11px] tracking-[0.1em] uppercase font-medium">Our Vision — Read More</span>
            </div>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              className="text-[hsl(208_74%_42%)] transition-transform duration-300 shrink-0"
              style={{ transform: showVision ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {/* Expandable content */}
          <div
            className="overflow-hidden transition-all duration-400 ease-in-out"
            style={{ maxHeight: showVision ? '600px' : '0px', opacity: showVision ? 1 : 0 }}
          >
            <div className="px-1 py-2 min-[390px]:py-3 flex flex-col gap-2 min-[390px]:gap-2.5">
              <p className="font-raleway text-[10px] min-[390px]:text-[11px] text-[hsl(215_15%_40%)] leading-relaxed">
                {t.companyIntro}
              </p>
              <p className="font-raleway text-[9px] min-[390px]:text-[10px] text-[hsl(215_15%_50%)] leading-relaxed">
                {t.companyCerts}
              </p>
              <p className="font-raleway text-[9px] min-[390px]:text-[10px] text-[hsl(215_15%_50%)] leading-relaxed italic">
                {t.companyTeam}
              </p>
            </div>
          </div>

          {/* Service cards — compact */}
          {services.map((s, i) => {
            const MobileIcon = s.icon;
            return (
              <div key={i} className="reveal-card" style={{ transitionDelay: `${400 + i * 100}ms` }}>
                <div className="border border-[hsl(210_15%_88%)] bg-white/70 px-2 py-1.5 min-[390px]:px-2.5 min-[390px]:py-2">
                  <div className="flex items-center gap-2 min-[390px]:gap-2.5 mb-1">
                    <div className="w-6 h-6 min-[390px]:w-7 min-[390px]:h-7 rounded-md bg-[hsl(208_80%_18%)] flex items-center justify-center shrink-0">
                      <MobileIcon size={12} strokeWidth={1.5} className="text-white min-[390px]:w-3.5 min-[390px]:h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-bold text-[12px] min-[390px]:text-[13px] text-[hsl(208_80%_18%)] leading-tight">{s.title}</h3>
                      <p className="font-raleway text-[7px] min-[390px]:text-[8px] tracking-[0.08em] uppercase text-[hsl(208_74%_42%)]">
                        {s.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="font-raleway text-[9px] min-[390px]:text-[10px] text-[hsl(215_15%_45%)] leading-snug mb-1 line-clamp-2">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {s.credentials.map((c) => {
                      const CIcon = c.icon;
                      const hasCert = "cert" in c && !!c.cert;
                      const base = "flex items-center gap-1 py-0.5 px-1.5 min-[390px]:px-2 bg-[hsl(208_80%_18%)] rounded-sm";
                      const inner = (
                        <>
                          <CIcon size={8} strokeWidth={1.5} className="text-[hsl(208_74%_65%)] min-[390px]:w-2.5 min-[390px]:h-2.5" />
                          <span className="font-raleway text-[7px] min-[390px]:text-[8px] tracking-[0.03em] uppercase text-white/90 font-medium">{c.text}</span>
                          {hasCert && (
                            <ArrowUpRight size={8} strokeWidth={1.75} className="text-white/50 -mr-0.5 min-[390px]:w-2.5 min-[390px]:h-2.5" />
                          )}
                        </>
                      );
                      return hasCert ? (
                        <button key={c.text} type="button" onClick={() => setShowCert(true)} className={`${base} active:brightness-125`} aria-label={`View ${c.text} certificate`}>
                          {inner}
                        </button>
                      ) : (
                        <div key={c.text} className={base}>{inner}</div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ISO 9001 Certificate Modal */}
      {showCert && (
        <div
          data-fleet-modal
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(5, 15, 30, 0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowCert(false)}
        >
          <div className="relative w-full max-w-3xl mx-4 sm:mx-6 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowCert(false)} className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors" aria-label="Close">
              <X size={22} strokeWidth={1.5} />
            </button>
            <iframe
              src="/iso-9001-certificate.pdf#view=FitH&toolbar=0"
              title="ISO 9001:2015 Certificate — Bureau Veritas"
              className="w-full flex-1 rounded-sm bg-white"
              style={{ minHeight: "60vh" }}
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="font-raleway text-xs sm:text-sm text-white/50">
                <span className="text-white font-medium">ISO 9001:2015</span> — Bureau Veritas · Cert No. GR005631 · Valid to 20-04-2028
              </p>
              <a
                href="/iso-9001-certificate.pdf"
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

      {/* PSC Modal */}
      {showPsc && (
        <div
          data-fleet-modal
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(5, 15, 30, 0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowPsc(false)}
        >
          <div className="relative w-full max-w-4xl mx-4 sm:mx-6 max-h-[85vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPsc(false)} className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors">
              <X size={22} strokeWidth={1.5} />
            </button>
            <img src="/risk4sea-chart.png" alt="RISK4SEA Top 10 PSC Performers" className="w-full rounded-sm" />
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

      {/* Our Vision Modal — desktop only (mobile keeps inline dropdown) */}
      {showVision && (
        <div
          data-fleet-modal
          className="fixed inset-0 z-[200] hidden md:flex items-center justify-center animate-fadeIn"
          style={{ backgroundColor: "rgba(5, 15, 30, 0.92)", backdropFilter: "blur(10px)" }}
          onClick={() => setShowVision(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 sm:mx-6 max-h-[88vh] overflow-auto bg-white rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVision(false)}
              className="absolute top-4 right-4 text-[hsl(215_15%_50%)] hover:text-[hsl(208_80%_18%)] transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Header band */}
            <div
              className="px-8 sm:px-12 lg:px-16 pt-10 sm:pt-12 pb-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(208 80% 18%) 0%, hsl(208 74% 28%) 100%)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 rounded bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <span className="text-white font-display font-bold text-sm tracking-wide">NV</span>
                </div>
                <div>
                  <p className="font-raleway text-[10px] tracking-[0.25em] uppercase text-[hsl(208_74%_75%)] mb-1">
                    New Vision Shipping
                  </p>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
                    Our Vision
                  </h3>
                </div>
              </div>
              <p className="font-raleway text-xs sm:text-sm tracking-[0.18em] uppercase text-[hsl(208_74%_75%)] font-medium">
                Safety · Efficiency · Excellence
              </p>
            </div>

            {/* Body */}
            <div className="px-8 sm:px-12 lg:px-16 py-8 sm:py-10 flex flex-col gap-5 sm:gap-6">
              <p className="font-raleway text-[15px] sm:text-base lg:text-[17px] text-[hsl(215_15%_30%)] leading-relaxed">
                {t.servicesIntro}
              </p>
              <p className="font-raleway text-[15px] sm:text-base lg:text-[17px] text-[hsl(215_15%_35%)] leading-relaxed italic border-l-2 border-[hsl(208_74%_42%/0.4)] pl-5">
                {t.envStrategy}
              </p>
              <p className="font-raleway text-[15px] sm:text-base lg:text-[17px] text-[hsl(215_15%_30%)] leading-relaxed">
                {t.safetyCulture}
              </p>
              <p className="font-raleway text-base sm:text-[17px] lg:text-lg text-[hsl(208_80%_22%)] leading-relaxed font-medium">
                {t.trustValue}
              </p>

              <div className="h-px bg-[hsl(210_15%_88%)] my-2" />

              <p className="font-raleway text-[14px] sm:text-[15px] text-[hsl(215_15%_40%)] leading-relaxed">
                {t.companyIntro}
              </p>
              <p className="font-raleway text-[14px] sm:text-[15px] text-[hsl(215_15%_45%)] leading-relaxed">
                {t.companyCerts}
              </p>
              <p className="font-raleway text-[14px] sm:text-[15px] text-[hsl(215_15%_45%)] leading-relaxed italic">
                {t.companyTeam}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
