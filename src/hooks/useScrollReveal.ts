import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    document
      .querySelectorAll(".reveal, .reveal-icon, .reveal-left, .reveal-right, .underline-draw")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
