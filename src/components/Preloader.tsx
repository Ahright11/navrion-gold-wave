import { useState, useEffect } from 'react';

export default function Preloader() {
  const [gone, setGone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for hero video to have enough data, or timeout after 3s
    const video = document.querySelector('video') as HTMLVideoElement | null;
    let resolved = false;

    const finish = () => {
      if (resolved) return;
      resolved = true;
      setFadeOut(true);
      window.dispatchEvent(new Event('preloader-done'));
      setTimeout(() => setGone(true), 600);
    };

    if (video) {
      if (video.readyState >= 2) {
        // Already loaded — short delay so logo is visible
        setTimeout(finish, 800);
      } else {
        video.addEventListener('canplay', () => setTimeout(finish, 400), { once: true });
      }
    }

    // Fallback timeout
    const fallback = setTimeout(finish, 3000);
    return () => clearTimeout(fallback);
  }, []);

  if (gone) return null;

  return (
    <div
      data-preloader
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: 'hsl(208 80% 8%)',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Logo */}
      <img
        src="/nv-logo.png"
        alt=""
        className="h-8 sm:h-10 md:h-14 w-auto mb-8"
        style={{
          filter: 'brightness(0) invert(1)',
          animation: 'pulse-subtle 2s ease-in-out infinite',
        }}
      />

      {/* Loading line */}
      <div className="w-24 sm:w-32 h-px bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-white/50 rounded-full"
          style={{
            animation: 'loading-line 1.5s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes loading-line {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
