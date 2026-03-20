import { Wrench, BarChart3, Users } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Technical Management",
    description:
      "Comprehensive vessel maintenance, dry-docking supervision, planned maintenance systems, and full regulatory compliance across all flag states.",
  },
  {
    icon: BarChart3,
    title: "Commercial Management",
    description:
      "Chartering strategy, voyage optimization, post-fixture operations, and financial reporting to maximize vessel earnings and minimize costs.",
  },
  {
    icon: Users,
    title: "Crew Management",
    description:
      "Global recruitment, training, certification, and welfare programs ensuring competent, motivated crews that meet the highest industry standards.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-sm tracking-[0.3em] uppercase text-primary mb-4 reveal">
          What We Do
        </h2>
        <p className="font-display text-3xl lg:text-4xl text-foreground mb-16 max-w-lg reveal stagger-1">
          Full-spectrum ship management
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`group border border-border rounded-lg p-8 lg:p-10 bg-card hover:border-primary/30 transition-all duration-500 reveal stagger-${i + 1}`}
            >
              <s.icon className="text-primary mb-6" size={28} strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
