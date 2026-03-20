const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "40+", label: "Vessels Managed" },
  { value: "18", label: "Nationalities" },
  { value: "100%", label: "ISM Certified" },
];

export default function Stats() {
  return (
    <section id="stats" className="bg-secondary py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center reveal stagger-${i + 1}`}>
              <div className="text-4xl lg:text-5xl font-display font-bold text-primary mb-2 tabular-nums">
                {s.value}
              </div>
              <div className="text-sm tracking-widest uppercase text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
