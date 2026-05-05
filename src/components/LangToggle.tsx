import { useI18n } from '@/i18n';

export default function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useI18n();

  const base = dark ? 'text-white/40' : 'text-[hsl(215_35%_55%)]';
  const active = dark ? 'text-white' : 'text-[hsl(208_80%_18%)]';

  return (
    <div className="flex items-center gap-0.5 font-raleway text-[10px] sm:text-xs tracking-wider">
      <button
        onClick={() => setLang('en')}
        className={`px-1.5 py-0.5 transition-colors duration-200 ${lang === 'en' ? active + ' font-semibold' : base + ' hover:opacity-80'}`}
      >
        EN
      </button>
      <span className={`${dark ? 'text-white/20' : 'text-[hsl(215_15%_75%)]'}`}>|</span>
      <button
        onClick={() => setLang('gr')}
        className={`px-1.5 py-0.5 transition-colors duration-200 ${lang === 'gr' ? active + ' font-semibold' : base + ' hover:opacity-80'}`}
      >
        GR
      </button>
    </div>
  );
}
