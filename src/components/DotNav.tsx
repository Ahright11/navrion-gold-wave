interface DotNavProps {
  total: number;
  current: number;
  onNavigate: (idx: number) => void;
  darkSections?: number[];
}

export default function DotNav({ total, current, onNavigate, darkSections = [] }: DotNavProps) {
  const isDark = darkSections.includes(current);

  return (
    <nav
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current;

        const activeColor = isDark ? "rgba(255,255,255,1)" : "rgba(28,117,188,1)";
        const inactiveColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(28,117,188,0.35)";
        const activeBorder = isDark ? "rgba(255,255,255,1)" : "rgba(28,117,188,1)";
        const inactiveBorder = isDark ? "rgba(255,255,255,0.7)" : "rgba(28,117,188,0.55)";

        return (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            aria-label={`Go to section ${i + 1}`}
            style={{
              width: active ? "10px" : "8px",
              height: active ? "10px" : "8px",
              borderRadius: "50%",
              border: `1.5px solid ${active ? activeBorder : inactiveBorder}`,
              background: active ? activeColor : inactiveColor,
              transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
              padding: 0,
              cursor: "pointer",
              display: "block",
              flexShrink: 0,
              outline: 'none',
            }}
            onMouseEnter={e => {
              if (!active) {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.35)';
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
            }}
          />
        );
      })}
    </nav>
  );
}
