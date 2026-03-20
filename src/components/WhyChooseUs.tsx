import { Clock, Anchor, Globe, ShieldCheck } from "lucide-react";

const points = [
  { icon: Clock, title: "24/7 Operations Center", description: "Round-the-clock monitoring and support for every vessel in our fleet." },
  { icon: Anchor, title: "Greek-owned & operated", description: "Rooted in the world's most storied maritime tradition since 1999." },
  { icon: Globe, title: "Global crew network", description: "Access to qualified seafarers across 18 nationalities worldwide." },
  { icon: ShieldCheck, title: "Full ISM & MLC compliance", description: "Certified management systems exceeding international safety standards." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h2 className="text-sm tracking-[0.3em] uppercase text-primary mb-4 reveal">
          Why Navrion
        </h2>
        <p className="font-display text-3xl lg:text-4xl text-foreground mb-16 reveal stagger-1">
          Built on trust, driven by excellence
        </p>

        <div className="grid sm:grid-cols-2 gap-10">
          {points.map((p, i) => (
            <div key={p.title} className={`flex gap-5 reveal stagger-${i + 1}`}>
              <div className="shrink-0 mt-1">
                <p.icon className="text-primary" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1.5">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
