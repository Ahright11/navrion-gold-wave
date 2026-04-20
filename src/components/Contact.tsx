import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useI18n } from "@/i18n";

const departments = [
  { name: "Crewing", email: "crew@nvshipping.com" },
  { name: "Chartering", email: "chartering@nvshipping.com" },
  { name: "SnP", email: "snp@nvshipping.com" },
  { name: "Purchasing", email: "supply@nvshipping.com" },
  { name: "Technical", email: "technical@nvshipping.com" },
];

export default function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="relative flex-1 flex flex-col justify-center px-3 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-8 overflow-hidden">
      {/* Background — reception photo blurred + NV emblem overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/office/reception.webp"
          alt=""
          aria-hidden
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(8px) saturate(0.95)", transform: "scale(1.06)" }}
        />
        {/* Light wash so text stays readable */}
        <div className="absolute inset-0" style={{ background: "rgba(240, 244, 249, 0.55)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/nv-emblem-grey.png"
            alt=""
            aria-hidden
            className="h-full w-auto max-w-none opacity-[0.06]"
          />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3 sm:mb-4 md:mb-6">
          <p className="font-raleway text-[9px] sm:text-xs tracking-[0.15em] uppercase text-[hsl(208_74%_42%)] mb-1 sm:mb-1.5 reveal">
            {t.contact}
          </p>
          <h2 className="font-display font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[hsl(208_80%_22%)] reveal" style={{ transitionDelay: '200ms' }}>
            {t.contactUs}
          </h2>
        </div>

        {/* Two columns: info + map */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 sm:gap-5 md:gap-8 reveal" style={{ transitionDelay: '400ms' }}>
          {/* Left — contact info */}
          <div className="flex flex-col justify-center">
            <p className="font-raleway text-xs sm:text-sm font-semibold text-[hsl(208_80%_18%)] mb-3">
              NEW VISION SHIPPING S.A.
            </p>
            <div className="flex flex-col gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[hsl(208_74%_42%)] opacity-60 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-raleway text-[11px] sm:text-xs text-[hsl(215_15%_40%)] leading-relaxed">
                  Akti Miaouli & 2, II Merarchias str.<br />
                  18535 Piraeus<br />
                  Greece
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[hsl(208_74%_42%)] opacity-60 shrink-0" strokeWidth={1.5} />
                <span className="font-raleway text-[11px] sm:text-xs text-[hsl(215_15%_40%)]">+30 2110130400, +30 2110130500</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[hsl(208_74%_42%)] opacity-60 shrink-0" strokeWidth={1.5} />
                <span className="font-raleway text-[11px] sm:text-xs text-[hsl(215_15%_40%)]">info@nvshipping.com</span>
              </div>
            </div>

            {/* Email CTA */}
            <a
              href="mailto:info@nvshipping.com"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 bg-[hsl(208_80%_18%)] text-white font-raleway text-[11px] sm:text-xs tracking-widest uppercase transition-colors hover:bg-[hsl(208_80%_22%)] w-full sm:w-auto"
            >
              <Send size={13} strokeWidth={1.5} />
              {t.sendEmail}
            </a>

            {/* Department contacts */}
            <div className="mt-4 sm:mt-5">
              <p className="font-raleway text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-[hsl(215_15%_55%)] mb-2 sm:mb-3">
                {t.deptContacts}
              </p>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-1 sm:gap-y-1.5">
                {departments.map((d) => (
                  <a
                    key={d.name}
                    href={`mailto:${d.email}`}
                    className="flex items-center gap-1.5 group"
                  >
                    <span className="font-raleway text-[9px] sm:text-[10px] font-medium text-[hsl(208_80%_18%)]">{d.name}</span>
                    <span className="font-raleway text-[9px] sm:text-[10px] text-[hsl(208_74%_42%)] group-hover:underline">{d.email}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Google Maps */}
          <div className="rounded-sm overflow-hidden h-[180px] min-[390px]:h-[200px] sm:h-[240px] md:h-full md:min-h-[280px]" style={{ border: '1px solid hsl(210 15% 88%)' }}>
            <iframe
              src="https://maps.google.com/maps?q=37.941568,23.642267&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Vision Shipping S.A. — Piraeus Office"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
