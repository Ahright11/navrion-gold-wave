import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-sm tracking-[0.3em] uppercase text-primary mb-4 reveal">
          Contact
        </h2>
        <p className="font-display text-3xl lg:text-4xl text-foreground mb-16 reveal stagger-1">
          Let's talk
        </p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-8 reveal stagger-1">
            <div className="flex gap-4 items-start">
              <MapPin className="text-primary shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
              <div>
                <p className="text-foreground font-medium mb-1">Address</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Akti Miaouli 93<br />
                  Piraeus 18538, Greece
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Phone className="text-primary shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
              <div>
                <p className="text-foreground font-medium mb-1">Phone</p>
                <p className="text-muted-foreground text-sm">+30 210 429 0000</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Mail className="text-primary shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
              <div>
                <p className="text-foreground font-medium mb-1">Email</p>
                <p className="text-muted-foreground text-sm">info@navrion.com</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal stagger-2">
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <div className="text-primary text-4xl mb-4">✓</div>
                  <p className="text-foreground text-lg font-medium mb-2">Message sent</p>
                  <p className="text-muted-foreground text-sm">We'll be in touch shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                />
                <textarea
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow resize-none"
                />
                <button type="submit" className="btn-gold w-full sm:w-auto">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
