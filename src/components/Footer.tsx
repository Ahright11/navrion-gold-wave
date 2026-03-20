import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm tracking-[0.2em] uppercase text-foreground font-semibold">
          Navrion
        </span>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Navrion. All rights reserved.
        </p>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </footer>
  );
}
