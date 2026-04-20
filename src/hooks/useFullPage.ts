import { useState, useRef, useEffect, useCallback } from 'react';

export const SLIDE_DURATION = 800;   // section fade+scale
export const REVEAL_DELAY  = 500;    // ms before content starts animating
const LOCK_MS = 1400;

export type Direction = 'down' | 'up';

export function useFullPage(totalSections: number) {
  const [current, setCurrent]   = useState(0);
  const [prev,    setPrev]      = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>('down');

  const currentRef  = useRef(0);
  const locked      = useRef(false);
  const touchStartY = useRef(0);
  const touchStartT = useRef(0);

  const navigate = useCallback((to: number) => {
    const from = currentRef.current;
    // Block navigation when a modal is open
    if (document.querySelector('[data-fleet-modal]')) return;
    if (locked.current || to === from || to < 0 || to >= totalSections) return;

    locked.current    = true;
    currentRef.current = to;

    setDirection(to > from ? 'down' : 'up');
    setPrev(from);
    setCurrent(to);

    setTimeout(() => { setPrev(null); locked.current = false; }, LOCK_MS);
  }, [totalSections]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return; // normal scroll on mobile
      // Allow native scrolling inside modals (e.g. vessel detail)
      if (document.querySelector('[data-fleet-modal]')) return;
      // Let the map consume wheel events for zoom; don't hijack for section nav
      const target = e.target as Element | null;
      if (target && target.closest('.leaflet-container')) return;
      e.preventDefault();
      navigate(currentRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[data-fleet-modal]')) return;
      if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); navigate(currentRef.current + 1); }
      if (['ArrowUp','PageUp'].includes(e.key))         { e.preventDefault(); navigate(currentRef.current - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (window.innerWidth < 768) return; // normal scroll on mobile
      touchStartY.current = e.touches[0].clientY;
      touchStartT.current = Date.now();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth < 768) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      const elapsed = Date.now() - touchStartT.current;
      const absDiff = Math.abs(diff);
      const velocity = absDiff / Math.max(elapsed, 1);

      const isFastSwipe = velocity > 0.3 && absDiff > 40;
      const isLongDrag = absDiff > 100;

      if (isFastSwipe || isLongDrag) {
        navigate(currentRef.current + (diff > 0 ? 1 : -1));
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (window.innerWidth < 768) return; // allow normal scroll on mobile
      if (!document.querySelector('[data-fleet-modal]')) {
        e.preventDefault();
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [navigate]);

  return { current, prevSection: prev, direction, goTo: navigate };
}
