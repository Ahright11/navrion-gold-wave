import { RotateCcw } from 'lucide-react';

export default function OrientationGuard() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex-col items-center justify-center gap-4 bg-[hsl(208_80%_8%)] text-white hidden landscape:flex portrait:hidden"
      style={{
        /* Only show on mobile-sized screens in landscape */
      }}
    >
      <style>{`
        @media (orientation: landscape) and (max-height: 500px) {
          [data-orientation-guard] { display: flex !important; }
        }
        @media (orientation: portrait), (min-height: 501px) {
          [data-orientation-guard] { display: none !important; }
        }
      `}</style>
      <div data-orientation-guard className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-[hsl(208_80%_8%)] text-white">
        <RotateCcw size={40} strokeWidth={1.2} className="text-white/60 animate-spin" style={{ animationDuration: '3s' }} />
        <p className="font-display font-bold text-xl text-white">Rotate your device</p>
        <p className="font-raleway text-sm text-white/50 text-center max-w-xs">
          This site is optimised for portrait mode. Please rotate your phone to continue.
        </p>
      </div>
    </div>
  );
}
