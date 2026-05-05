import { useI18n } from "@/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[hsl(208_80%_12%)] py-2.5 sm:py-3 md:py-4 shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex gap-3 sm:gap-4">
            {["ISO 9001:2015", "RightShip 5/5", "INTERCARGO", "GARD P&I"].map((m) => (
              <span key={m} className="font-raleway text-[8px] sm:text-[10px] tracking-[0.1em] text-white/20 uppercase">{m}</span>
            ))}
          </div>

          <p className="font-raleway text-[8px] sm:text-[10px] text-white/25">
            &copy; {new Date().getFullYear()} New Vision Shipping S.A. {t.allRights}
          </p>
        </div>
      </div>
    </footer>
  );
}
