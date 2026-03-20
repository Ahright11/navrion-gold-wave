import heroImage from "@/assets/hero-ocean.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center max-w-4xl">
        <h1 className="font-display italic text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-foreground mb-8 reveal">
          Ship Management Excellence
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed reveal stagger-1">
          Third-party management for bulk carriers worldwide — commercial, technical &amp; crew.
        </p>
        <a href="#contact" className="btn-gold reveal stagger-2">
          Get in Touch
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-muted-foreground/40" />
      </div>
    </section>
  );
}
