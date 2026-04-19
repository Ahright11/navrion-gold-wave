import { useEffect, useRef, useState } from "react";
import { X, Maximize2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import aboutImage from "@/assets/about-port.jpg";
import { useI18n } from "@/i18n";

const HISTORICAL_VESSELS = [
  {
    name: "New Spirit",
    image: "/ships/new-spirit.png",
    type: "Supramax",
    dwt: "58,096 MT",
    built: "2010 — Tsuneishi (Cebu)",
    imo: "9425801",
  },
  {
    name: "New Victory",
    image: "/ships/image003.png",
    type: "Supramax",
    dwt: "58,713 MT",
    built: "2008 — Tsuneishi (Cebu)",
    imo: "9403047",
  },
  {
    name: "New Kosmos",
    image: "/ships/kosmos2018.PNG",
    type: "Supramax",
    dwt: "56,011 MT",
    built: "2005 — Mitsui Japan",
    imo: "9329837",
  },
  {
    name: "New Era",
    image: "/ships/NEW_ERA - Copy.jpg",
    type: "Supramax",
    dwt: "53,125 MT",
    built: "2003 — Iwagi Zosen Japan",
    imo: "9393105",
  },
];

const VESSELS = [
  {
    name: "New Fortune",
    video: "/videos/new-fortune.mp4",
    poster: "/videos/new-fortune-poster.jpg",
    photos: ["/images/fortune/fortune-1.jpg", "/images/fortune/fortune-2.jpg"],
    type: "Ultramax Bulk Carrier",
    dwt: "63,894 MT",
    built: "2026 — COSCO Shipping Heavy Industry",
    flag: "Marshall Islands",
    imo: "1025942",
    class: "DNV",
    holds: "5 / 4 / 4",
    blueprint: "/blueprints/new-fortune.png",
    description: "Newly delivered Ultramax bulk carrier built at COSCO Zhoushan. Fitted with five cargo holds, four cranes and four grabs for maximum cargo handling flexibility.",
  },
  {
    name: "New Providence",
    video: "/videos/new-providence.mp4",
    poster: "/videos/new-providence-poster.jpg",
    photos: [] as string[],
    type: "Ultramax Bulk Carrier",
    dwt: "63,600 MT",
    built: "2026 — COSCO Shipping Heavy Industry",
    flag: "Marshall Islands",
    imo: "1025954",
    class: "DNV",
    holds: "5 / 4 / 4",
    blueprint: "/blueprints/new-providence.png",
    description: "Sister vessel to New Fortune, expected delivery end of May 2026. Ultramax newbuild from COSCO Zhoushan with identical specifications and cargo handling configuration.",
  },
  {
    name: "New Destiny",
    video: "/videos/new-destiny.mp4",
    poster: "/videos/new-destiny-poster.jpg",
    photos: [] as string[],
    type: "Ultramax Bulk Carrier",
    dwt: "61,654 MT",
    built: "2011 — Oshima Shipbuilding, Japan",
    flag: "Marshall Islands",
    imo: "9557056",
    class: "Class NK",
    holds: "5 / 4 / 4",
    blueprint: "/blueprints/new-destiny.png",
    description: "Japanese-built Ultramax bulk carrier with proven reliability across all major dry bulk routes. Equipped with five cargo holds and four deck cranes for self-loading capability.",
  },
  {
    name: "New Galaxy",
    video: "/videos/new-galaxy.mp4",
    poster: "/videos/new-galaxy-poster.jpg",
    photos: [] as string[],
    type: "Supramax Bulk Carrier",
    dwt: "55,594 MT",
    built: "2011 — Mitsui Tamano, Japan",
    flag: "Portugal",
    imo: "9478884",
    class: "Class NK",
    holds: "5 / 4 / 4",
    blueprint: "/blueprints/new-galaxy.png",
    description: "Japanese-built Supramax with optimised hull design from Mitsui Engineering & Shipbuilding. Versatile bulk carrier trading worldwide across all major routes.",
  },
  {
    name: "New Horizon",
    video: "/videos/new-horizon.mp4",
    poster: "/videos/new-horizon-poster.jpg",
    photos: [] as string[],
    type: "Supramax Bulk Carrier",
    dwt: "55,455 MT",
    built: "2010 — Kawasaki, Japan",
    flag: "Marshall Islands",
    imo: "9420318",
    class: "Class NK",
    holds: "5 / 4 / 4",
    blueprint: "/blueprints/new-horizon.png",
    description: "Kawasaki-built Supramax with excellent performance record. Five cargo holds with four cranes providing full self-loading capability for worldwide trading.",
  },
];

type Vessel = typeof VESSELS[0];

// Derive WebP paths from the original .png. Preview is ~1000px wide (~100-170 KB)
// and used in the modal thumbnail; full WebP is used in the zoom viewer.
function blueprintSources(src: string) {
  const base = src.replace(/\.png$/i, "");
  return {
    png: src,
    webp: `${base}.webp`,
    previewWebp: `${base}-preview.webp`,
  };
}

const SPECS: { key: keyof Vessel; label: string }[] = [
  { key: "type", label: "Type" },
  { key: "dwt", label: "DWT" },
  { key: "built", label: "Built" },
  { key: "flag", label: "Flag" },
  { key: "imo", label: "IMO" },
  { key: "class", label: "Class" },
  { key: "holds", label: "Holds / Cranes / Grabs" },
];

function BlueprintViewer({ src, vesselName, onClose }: { src: string; vesselName: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [visible, setVisible] = useState(false);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 250); };

  const clamp = (s: number) => Math.max(0.5, Math.min(6, s));

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = -e.deltaY * 0.002;
    const newScale = clamp(scale * (1 + delta));
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    const k = newScale / scale;
    setTx(cx - (cx - tx) * k);
    setTy(cy - (cy - ty) * k);
    setScale(newScale);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setTx((v) => v + (e.clientX - lastPos.current.x));
    setTy((v) => v + (e.clientY - lastPos.current.y));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => { dragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStart.current = { dist: Math.hypot(dx, dy), scale };
    } else if (e.touches.length === 1) {
      dragging.current = true;
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStart.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      setScale(clamp(pinchStart.current.scale * (dist / pinchStart.current.dist)));
    } else if (e.touches.length === 1 && dragging.current) {
      setTx((v) => v + (e.touches[0].clientX - lastPos.current.x));
      setTy((v) => v + (e.touches[0].clientY - lastPos.current.y));
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) { dragging.current = false; pinchStart.current = null; }
  };

  const reset = () => { setScale(1); setTx(0); setTy(0); };

  return (
    <div
      data-blueprint-viewer
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{
        backgroundColor: visible ? "rgba(3, 10, 22, 0.97)" : "rgba(3, 10, 22, 0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "background-color 0.25s ease, backdrop-filter 0.25s ease",
      }}
      onClick={handleClose}
    >
      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease 0.1s" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="font-raleway text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[hsl(208_74%_65%)] mb-0.5">
            General Arrangement
          </p>
          <h3 className="font-display font-bold text-lg sm:text-2xl text-white">
            M/V {vesselName}
          </h3>
        </div>
        <button
          onClick={handleClose}
          className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
          aria-label="Close"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Blueprint canvas */}
      <div
        className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "none" }}
      >
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${scale})`,
            transition: dragging.current ? "none" : "transform 0.12s ease-out",
            opacity: visible ? 1 : 0,
          }}
        >
          <picture>
            <source srcSet={blueprintSources(src).webp} type="image/webp" />
            <img
              src={src}
              alt={`${vesselName} General Arrangement`}
              draggable={false}
              decoding="async"
              className="max-w-[92vw] max-h-[82vh]"
              style={{
                // Wrapper shadow (non-rasterizing) instead of drop-shadow filter
                boxShadow: "0 0 40px rgba(120,180,255,0.18)",
              }}
            />
          </picture>
        </div>
      </div>

      {/* Zoom controls */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 p-1.5 rounded-full"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease 0.1s",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setScale((s) => clamp(s / 1.3))}
          className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          aria-label="Zoom out"
        >
          <ZoomOut size={18} strokeWidth={1.5} />
        </button>
        <span className="font-raleway text-[10px] tracking-[0.1em] text-white/60 px-2 tabular-nums min-w-[48px] text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale((s) => clamp(s * 1.3))}
          className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          aria-label="Zoom in"
        >
          <ZoomIn size={18} strokeWidth={1.5} />
        </button>
        <div className="w-px h-5 bg-white/15 mx-1" />
        <button
          onClick={reset}
          className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          aria-label="Reset"
        >
          <RotateCcw size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function VesselCard({ vessel, index, onClick }: { vessel: Vessel; index: number; onClick: () => void }) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;
    const obs = new MutationObserver(() => {
      if (card.classList.contains("visible")) video.play().catch(() => {});
      else { video.pause(); video.currentTime = 0; }
    });
    obs.observe(card, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="reveal-card group cursor-pointer"
      style={{ transitionDelay: `${400 + index * 250}ms` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-sm aspect-[16/4] min-[390px]:aspect-[16/4.5] sm:aspect-[16/6] md:aspect-[16/9] 2xl:aspect-[16/8]">
        {/* Poster image as guaranteed fallback */}
        <img
          src={vessel.poster}
          alt={vessel.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          ref={videoRef}
          src={vessel.video}
          poster={vessel.poster}
          muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(8,32,60,0.8) 0%, rgba(8,32,60,0.15) 45%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 flex items-end justify-between">
          <div>
            <span className="font-raleway text-[8px] sm:text-[11px] tracking-[0.12em] uppercase text-white/50 block mb-0.5">M/V</span>
            <h3 className="font-display font-bold text-sm sm:text-xl lg:text-2xl text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
              &ldquo;{vessel.name.toUpperCase()}&rdquo;
            </h3>
            <p className="font-raleway text-[9px] sm:text-[11px] text-white/70 mt-0.5 sm:mt-1" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
              {vessel.type}, {vessel.built.slice(0, 4)} / DWT: {vessel.dwt.replace(/ MT$/, "")}
            </p>
          </div>
          <span className="font-raleway text-[10px] tracking-[0.12em] uppercase text-white/0 group-hover:text-white/50 transition-all duration-300 hidden sm:inline">
            {t.viewDetails}
          </span>
        </div>
      </div>
    </div>
  );
}

function VesselModal({ vessel, onClose }: { vessel: Vessel; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [blueprintOpen, setBlueprintOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    videoRef.current?.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[data-blueprint-viewer]')) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Warm the cache for the full-res blueprint while the user reads specs, so
    // clicking Expand opens instantly instead of waiting on a 500–700 KB fetch.
    // fetchpriority="low" keeps it from competing with the video.
    let preloadTimer: number | undefined;
    if (vessel.blueprint) {
      preloadTimer = window.setTimeout(() => {
        const img = new Image();
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
        img.decoding = "async";
        img.src = blueprintSources(vessel.blueprint).webp;
      }, 800);
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      if (preloadTimer) clearTimeout(preloadTimer);
    };
  }, [onClose, vessel.blueprint]);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 350); };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        backgroundColor: visible ? "rgba(5, 15, 30, 0.92)" : "rgba(5, 15, 30, 0)",
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        transition: "background-color 0.35s ease, backdrop-filter 0.35s ease",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 sm:mx-6 max-h-[90vh] overflow-y-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-2 right-2 sm:-top-12 sm:right-0 text-white/70 hover:text-white transition-colors z-10 bg-black/40 sm:bg-transparent rounded-full p-1.5 sm:p-0" aria-label="Close">
          <X size={20} strokeWidth={1.5} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 sm:gap-3">
          {/* Video — 3/5 on desktop, full on mobile */}
          <div className="md:col-span-3 relative overflow-hidden rounded-sm" style={{ aspectRatio: "16 / 9" }}>
            <video ref={videoRef} src={vessel.video} poster={vessel.poster} muted loop playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(8,32,60,0.7) 0%, transparent 40%)" }} />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-6">
              <span className="font-raleway text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-white/50 block mb-0.5 sm:mb-1">M/V</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>&ldquo;{vessel.name.toUpperCase()}&rdquo;</h2>
            </div>
          </div>

          {/* Blueprint — 2/5 on desktop, full below on mobile. Click to expand */}
          {vessel.blueprint && (
            <button
              type="button"
              onClick={() => setBlueprintOpen(true)}
              className="group md:col-span-2 relative overflow-hidden rounded-sm flex flex-col text-left cursor-zoom-in transition-all duration-300 hover:scale-[1.015]"
              style={{
                aspectRatio: "16 / 9",
                background: "linear-gradient(180deg, hsl(210 70% 14%) 0%, hsl(210 75% 10%) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              aria-label="Expand General Arrangement"
            >
              <div className="flex items-center justify-between px-3 sm:px-4 pt-2 sm:pt-3 pb-1">
                <span className="font-raleway text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[hsl(208_74%_65%)]">
                  General Arrangement
                </span>
                <span className="font-raleway text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-white/30">
                  Scale 1:200
                </span>
              </div>
              <div
                className="flex-1 flex items-center justify-center px-3 pb-3 min-h-0 relative"
                style={{ filter: "drop-shadow(0 0 14px rgba(120,180,255,0.22))" }}
              >
                <picture>
                  <source
                    srcSet={blueprintSources(vessel.blueprint).previewWebp}
                    type="image/webp"
                  />
                  <img
                    src={vessel.blueprint}
                    alt={`${vessel.name} General Arrangement`}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105"
                  />
                </picture>
                {/* Hover shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(120,180,255,0.12) 0%, transparent 70%)",
                  }}
                />
              </div>
              {/* Expand badge */}
              <div
                className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1.5 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Maximize2 size={10} strokeWidth={2} className="text-white/80" />
                <span className="font-raleway text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-white/80">
                  Expand
                </span>
              </div>
              {/* Mobile hint (always visible) */}
              <div
                className="md:hidden absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Maximize2 size={9} strokeWidth={2} className="text-white/60" />
              </div>
            </button>
          )}
        </div>

        {blueprintOpen && vessel.blueprint && (
          <BlueprintViewer
            src={vessel.blueprint}
            vesselName={vessel.name}
            onClose={() => setBlueprintOpen(false)}
          />
        )}
        <div className="mt-3 sm:mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 p-3 sm:p-5 md:p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "3px" }}>
            {SPECS.map((s) => (
              <div key={s.key}>
                <p className="font-raleway text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-[hsl(208_74%_65%)] mb-0.5">{s.label}</p>
                <p className="font-raleway text-xs sm:text-sm text-white/90 font-medium">{vessel[s.key]}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Fleet() {
  const { t } = useI18n();
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

  useEffect(() => {
    if (selectedVessel) {
      document.body.style.pointerEvents = "none";
      const modal = document.querySelector("[data-fleet-modal]");
      if (modal) (modal as HTMLElement).style.pointerEvents = "auto";
    } else {
      document.body.style.pointerEvents = "";
    }
    return () => { document.body.style.pointerEvents = ""; };
  }, [selectedVessel]);

  return (
    <section className="relative h-full md:h-full flex flex-col justify-center overflow-hidden py-12 md:py-0">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${aboutImage})` }} />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(8, 32, 60, 0.88)" }} />

      <div className="relative z-10 px-3 sm:px-6 lg:px-[5%] 2xl:px-[8%] w-full">
        <div className="text-center mb-2 sm:mb-5 md:mb-6">
          <p className="font-raleway text-[9px] sm:text-xs tracking-[0.15em] uppercase text-[hsl(208_74%_65%)] mb-1 sm:mb-2 reveal">
            {t.ourFleet}
          </p>
          <h2 className="font-display font-bold text-lg sm:text-3xl md:text-4xl lg:text-5xl text-white reveal" style={{ transitionDelay: "250ms" }}>
            {t.vesselsUnder}
          </h2>
        </div>

        {/* Top row: 3 ships */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
          {VESSELS.slice(0, 3).map((v, i) => (
            <VesselCard key={v.name} vessel={v} index={i} onClick={() => setSelectedVessel(v)} />
          ))}
        </div>
        {/* Bottom row: 2 ships centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 md:max-w-[66.666%] md:mx-auto">
          {VESSELS.slice(3).map((v, i) => (
            <VesselCard key={v.name} vessel={v} index={i + 3} onClick={() => setSelectedVessel(v)} />
          ))}
        </div>

        {/* Historical Fleet */}
        <div className="mt-4 sm:mt-6 md:mt-8">
          <h3 className="font-display font-bold text-sm sm:text-xl md:text-2xl text-white/60 text-center mb-2 sm:mb-4 reveal" style={{ transitionDelay: "1200ms" }}>
            {t.historicalFleet}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {HISTORICAL_VESSELS.map((v, i) => (
              <div key={v.name} className="reveal-card group" style={{ transitionDelay: `${1300 + i * 150}ms` }}>
                <div className="relative overflow-hidden rounded-sm aspect-[16/10]">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(8,32,60,0.85) 0%, rgba(8,32,60,0.2) 50%, transparent 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                    <span className="font-raleway text-[6px] sm:text-[8px] tracking-[0.1em] uppercase text-white/40 block">M/V</span>
                    <h4 className="font-display font-bold text-[10px] sm:text-sm text-white/80 leading-tight">{v.name}</h4>
                    <p className="font-raleway text-[6px] sm:text-[8px] text-white/40 mt-0.5">{v.type} &middot; {v.dwt}</p>
                    <p className="font-raleway text-[6px] sm:text-[8px] text-white/30">{v.built}</p>
                    <p className="font-raleway text-[5px] sm:text-[7px] text-white/20">IMO {v.imo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedVessel && (
        <div data-fleet-modal>
          <VesselModal vessel={selectedVessel} onClose={() => setSelectedVessel(null)} />
        </div>
      )}
    </section>
  );
}
