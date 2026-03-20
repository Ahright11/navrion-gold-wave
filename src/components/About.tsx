import aboutImage from "@/assets/about-port.jpg";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-sm tracking-[0.3em] uppercase text-primary mb-4 reveal">
              About Us
            </h2>
            <p className="font-display text-3xl lg:text-4xl text-foreground mb-8 leading-snug reveal stagger-1">
              Founded in Piraeus, built for the world.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 reveal stagger-2">
              Navrion was established by a team of seasoned maritime professionals with decades of
              combined experience in vessel operations, chartering, and crew management. From our
              headquarters in Piraeus — the historic heart of Greek shipping — we provide
              third-party management services to owners of bulk carriers trading worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed reveal stagger-3">
              Our philosophy is simple: treat every vessel as if it were our own. We combine the
              personal attention of a boutique manager with the systems and processes of a
              world-class operator, ensuring safety, efficiency, and value at every stage.
            </p>
          </div>

          <div className="reveal stagger-2">
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-black/30">
              <img
                src={aboutImage}
                alt="Port operations at dusk with cargo vessels and cranes"
                className="w-full h-[400px] lg:h-[480px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
