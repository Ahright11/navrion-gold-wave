import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import portsData from '@/data/ports.json';
import portImages from '@/data/port-images.json';

interface Port {
  port: string;
  country: string;
  lat: number;
  lng: number;
}

const isTouch = typeof window !== 'undefined' &&
  (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));

export default function PortsMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const ports = (portsData as Port[]).filter(p => p.lat && p.lng);
    const imgMap = portImages as Record<string, string | null>;

    const map = L.map(mapRef.current, {
      center: [20, 40],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      scrollWheelZoom: true,
      zoomControl: true,
      attributionControl: false,
      dragging: true,
      preferCanvas: true,
      tap: true,
      tapTolerance: 20,
      worldCopyJump: true,
    });

    // Dark navy map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
    }).addTo(map);

    // Shared canvas renderer — draws all markers in one pass instead of 225 SVG nodes
    const canvasRenderer = L.canvas({ padding: 0.5 });

    const countryCounts: Record<string, number> = {};
    ports.forEach(p => {
      countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
    });

    // Individual markers on a shared canvas layer — no clustering, so every
    // port is hoverable/clickable directly (desktop UX: tooltips with pics).
    const portsLayer = L.layerGroup();

    const baseRadius = isTouch ? 7 : 4;
    const hoverRadius = isTouch ? 9 : 6;

    // Cache of successfully-loaded image URLs. Once a port's image has loaded
    // once, future tooltipopens can inject <img src> directly — browser HTTP
    // cache serves it instantly, no network queue, no async callback churn.
    const loadedSrcs = new Set<string>();
    // In-flight loads so repeated hovers on the same port don't kick off
    // multiple parallel Image() requests.
    const inFlight = new Map<string, HTMLImageElement>();
    // Hover-intent timer per marker — sweeping across many ports no longer
    // triggers loads because the mouse never dwells long enough.
    const HOVER_INTENT_MS = 140;

    ports.forEach((p) => {
      const marker = L.circleMarker([p.lat, p.lng], {
        renderer: canvasRenderer,
        radius: baseRadius,
        fillColor: '#4A9FE5',
        color: '#4A9FE5',
        fillOpacity: 0.55,
        weight: 1.2,
        opacity: 0.85,
        // Bigger hit tolerance for touch (canvas hit-testing)
        bubblingMouseEvents: false,
      });

      const countInCountry = countryCounts[p.country];
      const countryClean = p.country.split(' -')[0].trim();
      const imgSrc = imgMap[p.port];

      // Placeholder spot for the image — real <img> injected on tooltipopen (lazy)
      const imgHtml = imgSrc
        ? `<div class="port-tip-img-slot" data-src="${imgSrc}"></div>`
        : '';
      marker.bindTooltip(
        `${imgHtml}<div class="port-tip-header">⚓ ${p.port}</div><div class="port-tip-body">${countryClean}${countInCountry > 1 ? `<span class="port-tip-count">${countInCountry} ports in country</span>` : ''}</div>`,
        {
          className: 'port-tooltip',
          direction: 'auto',
          offset: [0, -8],
          opacity: 1,
          sticky: false,
        }
      );

      let hoverTimer: number | undefined;

      // Inject the <img> into the current tooltip DOM. Slot has a reserved
      // 100px height in CSS so swapping in the image does NOT resize the
      // tooltip — no reflow, no reposition, no layer thrash.
      const injectImage = (src: string) => {
        const tip = marker.getTooltip();
        const el = tip?.getElement() as HTMLElement | null;
        if (!el) return; // tooltip already closed — skip
        const slot = el.querySelector('.port-tip-img-slot') as HTMLElement | null;
        if (!slot) return; // already replaced
        const img = document.createElement('img');
        img.className = 'port-tip-img';
        img.decoding = 'async';
        img.src = src;
        slot.replaceWith(img);
      };

      marker.on('mouseover', () => {
        marker.setStyle({ radius: hoverRadius, fillOpacity: 1, opacity: 1 });
        if (!imgSrc) return;
        // Already cached → inject directly from browser cache on the current
        // tooltipopen (runs after this handler).
        if (loadedSrcs.has(imgSrc)) return;
        // Hover-intent: sweeping across ports won't linger this long, so we
        // don't queue up dozens of image requests while the user is just
        // moving the mouse across the map.
        hoverTimer = window.setTimeout(() => {
          let img = inFlight.get(imgSrc);
          if (!img) {
            img = new Image();
            img.decoding = 'async';
            inFlight.set(imgSrc, img);
            img.addEventListener('load', () => {
              loadedSrcs.add(imgSrc);
              inFlight.delete(imgSrc);
              // Only inject if this marker's tooltip is still open — avoids
              // the old bug where late onloads thrashed the tooltip layer for
              // ports the user had long moved past.
              if (marker.isTooltipOpen()) injectImage(imgSrc);
            }, { once: true });
            img.addEventListener('error', () => { inFlight.delete(imgSrc); }, { once: true });
            img.src = imgSrc;
          } else if (img.complete) {
            if (marker.isTooltipOpen()) injectImage(imgSrc);
          }
        }, HOVER_INTENT_MS);
      });
      marker.on('mouseout', () => {
        marker.setStyle({ radius: baseRadius, fillOpacity: 0.55, opacity: 0.85 });
        if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = undefined; }
      });
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        marker.setStyle({ radius: hoverRadius, fillOpacity: 1, opacity: 1 });
        marker.openTooltip();
      });
      // When tooltip opens and the image is already in our cache, inject it
      // synchronously so there's no blank-slot flash.
      marker.on('tooltipopen', () => {
        if (imgSrc && loadedSrcs.has(imgSrc)) injectImage(imgSrc);
      });

      marker.addTo(portsLayer);
    });

    portsLayer.addTo(map);

    // Tap on empty map area closes any open tooltip (mobile)
    map.on('click', () => {
      portsLayer.eachLayer((layer) => {
        (layer as L.CircleMarker).closeTooltip?.();
      });
    });

    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('© OpenStreetMap')
      .addTo(map);

    mapInstance.current = map;

    // Force Leaflet to recalc container size after layout settles (mobile fix)
    const kick = () => map.invalidateSize();
    const t1 = setTimeout(kick, 100);
    const t2 = setTimeout(kick, 500);
    const t3 = setTimeout(kick, 1200);

    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(mapRef.current);

    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        requestAnimationFrame(() => map.invalidateSize());
      }
    }, { threshold: 0.1 });
    io.observe(mapRef.current);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      ro.disconnect();
      io.disconnect();
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Reveal observer (self-contained; Index.tsx's global observer runs before
  // this lazy-loaded component mounts so it misses these elements)
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal, .reveal-card, .reveal-icon, .reveal-left, .reveal-right');
    if (window.innerWidth >= 768) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    if (active) {
      mapInstance.current.scrollWheelZoom.enable();
    } else {
      mapInstance.current.scrollWheelZoom.disable();
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const ports = (portsData as Port[]).filter(p => p.lat && p.lng);
  const countries = new Set((portsData as Port[]).map(p => p.country));

  return (
    <section ref={sectionRef} className="relative bg-[hsl(208_80%_8%)] py-10 sm:py-14 md:py-0 md:h-full md:flex md:flex-col md:justify-center">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="font-raleway text-[9px] sm:text-xs tracking-[0.15em] uppercase text-[hsl(208_74%_65%)] mb-1 sm:mb-2 reveal">
            Global Presence
          </p>
          <h2 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3 reveal" style={{ transitionDelay: '150ms' }}>
            Worldwide Trading
          </h2>
          <p className="font-raleway text-[10px] sm:text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed reveal" style={{ transitionDelay: '250ms' }}>
            Our Fleet has transported over 19,150,000 metric Tonnes of Cargo worldwide from/to the below ports:
          </p>
        </div>

        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-[250px] sm:h-[350px] md:h-[420px] lg:h-[480px] rounded-sm overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        <p className="font-raleway text-[9px] sm:text-[10px] text-white/30 text-center mt-2 sm:mt-3 reveal" style={{ transitionDelay: '500ms' }}>
          {ports.length} ports across {countries.size} countries
        </p>
      </div>

      <style>{`
        .port-tooltip {
          background: hsl(208 80% 12%);
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          padding: 0;
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          line-height: 1.4;
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
          overflow: hidden;
          min-width: 160px;
          max-width: 200px;
        }
        .port-tip-img, .port-tip-img-slot {
          width: 100%;
          height: 100px;
          object-fit: cover;
          display: block;
          background: hsl(208 80% 10%);
        }
        .port-tip-header {
          background: hsl(208 74% 42%);
          padding: 5px 10px;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.3px;
        }
        .port-tip-body {
          padding: 5px 10px 6px;
          color: rgba(255,255,255,0.6);
          font-size: 10px;
        }
        .port-tip-count {
          display: block;
          margin-top: 2px;
          font-size: 9px;
          color: rgba(255,255,255,0.35);
        }
        .leaflet-control-zoom a {
          background: hsl(208 80% 12%) !important;
          color: white !important;
          border-color: rgba(255,255,255,0.1) !important;
          font-size: 14px !important;
        }
        .leaflet-control-zoom a:hover {
          background: hsl(208 80% 18%) !important;
        }
        .leaflet-container {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><g fill='none' stroke='%23000' stroke-opacity='0.55' stroke-width='3' stroke-linecap='round'><circle cx='12' cy='12' r='7'/><path d='M12 2v4M12 18v4M2 12h4M18 12h4'/></g><g fill='none' stroke='white' stroke-width='1.1' stroke-linecap='round'><circle cx='12' cy='12' r='7'/><path d='M12 2v4M12 18v4M2 12h4M18 12h4'/></g><circle cx='12' cy='12' r='1' fill='white'/></svg>") 12 12, crosshair !important;
          background: hsl(208 80% 8%);
        }
        .leaflet-container:active {
          cursor: grabbing !important;
        }
        .leaflet-interactive {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><g fill='none' stroke='%23000' stroke-opacity='0.6' stroke-width='3' stroke-linecap='round'><circle cx='12' cy='12' r='5.5'/><path d='M12 4v3M12 17v3M4 12h3M17 12h3'/></g><g fill='none' stroke='%234A9FE5' stroke-width='1.3' stroke-linecap='round'><circle cx='12' cy='12' r='5.5'/><path d='M12 4v3M12 17v3M4 12h3M17 12h3'/></g><circle cx='12' cy='12' r='1.5' fill='%234A9FE5'/></svg>") 12 12, pointer !important;
        }
      `}</style>
    </section>
  );
}
