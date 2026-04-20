import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'gr';

const translations = {
  en: {
    // Navbar / Menu
    home: 'Home',
    services: 'Services',
    fleet: 'Fleet',
    contact: 'Contact',
    getInTouch: 'Get in Touch',

    // Hero
    boutique: 'Boutique Ship Management',
    heroTitle: 'New Vision Shipping',
    heroWords: ['Safety', 'Efficiency', 'Excellence'],
    statsYears: 'Years',
    statsYearsFull: 'Years of Presence',
    statsManaged: 'Managed',
    statsManagedFull: 'Vessels Managed',
    statsActive: 'Active',
    statsActiveFull: 'Under Management',
    statsNewbuilds: 'Newbuilds',
    statsNewbuildsFull: 'New Building Projects',
    statsCargo: 'MT Cargo',
    statsCargoFull: 'MT Cargo',
    statsRightShip: 'RightShip',
    statsRightShipFull: 'RightShip',

    // Services
    ourServices: 'Our Services',
    fullFleet: 'Management Services',
    companyIntro: 'NEW VISION SHIPPING S.A. (NV) is a boutique shipmanagement company operating from the center of the Piraeus global shipping hub, in the historical Ionian Building. Our expertise is the management of Bulk Carriers with high efficiency and accountability.',
    companyCerts: 'NV holds a steady 5/5 top rating with RightShip as a Manager of vessels throughout the years, is a Certified Ship Manager as per ISO 9001:2015 by Bureau Veritas, a member of GARD P&I Club, of RightShip and a full member of INTERCARGO, and runs the vessels under a DOC (Document of Compliance with the requirements of the International Safety Maritime code - ISM) by Bureau Veritas.',
    companyPsc: 'Our commitment to excellence has placed us in the Top 10 Port State Control Performers Worldwide in our sector: New Vision has been ranked number 8 in 2025 basis data of the last 3 years, according to',
    companyPscLink: 'RISK4SEA report',
    companyPscAfter: '(an independent company dedicated to provide actionable PSC intelligence).',
    servicesIntro: 'As a boutique firm, and to maintain our high management standards of excellence and reputation, we offer to selected only clients the Management of their fleet, including Commercial & Technical Management, Operations and Crewing, as well as Accounting Services and S&P.',
    companyTeam: "NV's management and executives have decades of experience and in-depth knowledge of the shipping industry and strong relations with industry's key players, which guarantee competent and reliable support to all its customers and business associates. These individuals have combined powers under a 'New Vision' for a model ship management company of the highest standards and efficiency in strict and up-to-date conformity with international rules and regulations.",
    commercial: 'Commercial Management',
    commercialSub: 'Chartering · S&P · Operations',
    commercialDesc: 'Full commercial management from our Piraeus headquarters — chartering with direct access to major global charterers, Sale & Purchase advisory, voyage optimization, and transparent P&L reporting on every fixture.',
    technical: 'Technical Management',
    technicalSub: 'Maintenance · Class · Dry-docking',
    technicalDesc: 'In-house superintendents running proactive planned maintenance across the fleet. Certified Ship Manager per ISO 9001:2015 by Bureau Veritas, operating under full DOC compliance with the ISM Code. DNV and ClassNK classed vessels.',
    crew: 'Crew Management',
    crewSub: 'Recruitment · Training · Welfare',
    crewDesc: 'Global crew recruitment with STCW-certified officers, continuous training programs, and industry-leading retention rates. Complete crew accounting, welfare services, and full MLC 2006 compliance across the fleet.',

    chartererCoop: 'We co-operate with top-tier Charterers like OLDENDORFF, TATA, PACIFIC BASIN, WESTERN BULK, TONGLI, G2 OCEAN, NORDEN, HYUNDAI GLOVIS, MUR, LOUIS DREYFUS COMPANY, BAINBRIDGE, TEAMBULK, DAIFU, PROPEL, PANOCEAN, BULK ASIA, XO SHIPPING etc.',
    envStrategy: 'In line with our Environmental strategy for lower fuel consumption and \'over and above\' regulatory compliance, we are investing in modern Tier III eco-friendly technology vessels.',

    // Fleet
    ourFleet: 'Our Fleet',
    vesselsUnder: 'Vessels under management',
    viewDetails: 'View details',
    aboutVessel: 'About this vessel',
    historicalFleet: 'Historical Fleet',

    // Contact
    contactUs: 'Contact Us',
    sendEmail: 'Send us an Email',
    deptContacts: 'Department Contacts',

    // Footer
    allRights: 'All rights reserved.',
  },
  gr: {
    home: 'Αρχική',
    services: 'Υπηρεσίες',
    fleet: 'Στόλος',
    contact: 'Επικοινωνία',
    getInTouch: 'Επικοινωνήστε',

    boutique: 'Boutique Διαχείριση Πλοίων',
    heroTitle: 'New Vision Shipping',
    heroWords: ['Ασφάλεια', 'Αποτελεσματικότητα', 'Αριστεία'],
    statsYears: 'Χρόνια',
    statsYearsFull: 'Χρόνια Παρουσίας',
    statsManaged: 'Διαχ/ση',
    statsManagedFull: 'Πλοία υπό Διαχείριση',
    statsActive: 'Ενεργά',
    statsActiveFull: 'Υπό Διαχείριση',
    statsNewbuilds: 'Νεότευκτα',
    statsNewbuildsFull: 'Νέες Κατασκευές',
    statsCargo: 'MT Cargo',
    statsCargoFull: 'MT Cargo',
    statsRightShip: 'RightShip',
    statsRightShipFull: 'RightShip',

    ourServices: 'Οι Υπηρεσίες μας',
    fullFleet: 'Υπηρεσίες Διαχείρισης',
    companyIntro: 'Η NEW VISION SHIPPING S.A. (NV) είναι μια boutique εταιρεία διαχείρισης πλοίων που λειτουργεί από το κέντρο του παγκόσμιου ναυτιλιακού κόμβου του Πειραιά, στο ιστορικό κτίριο Ionian Building. Η εξειδίκευσή μας είναι η διαχείριση Bulk Carriers με υψηλή αποδοτικότητα και αξιοπιστία.',
    companyCerts: 'Η NV διατηρεί σταθερή αξιολόγηση 5/5 στο RightShip ως Διαχειριστής πλοίων, είναι Πιστοποιημένος Διαχειριστής Πλοίων κατά ISO 9001:2015 από τον Bureau Veritas, μέλος του GARD P&I Club, του RightShip και πλήρες μέλος του INTERCARGO, και λειτουργεί τα πλοία υπό DOC (Document of Compliance με τον Διεθνή Κώδικα Ασφαλούς Διαχείρισης - ISM) από τον Bureau Veritas.',
    companyPsc: 'Η δέσμευσή μας στην αριστεία μας έχει τοποθετήσει στο Top 10 Port State Control Performers Παγκοσμίως στον τομέα μας: Η New Vision κατατάχθηκε στη θέση 8 το 2025 βάσει δεδομένων των τελευταίων 3 ετών, σύμφωνα με την',
    companyPscLink: 'αναφορά RISK4SEA',
    companyPscAfter: '(ανεξάρτητη εταιρεία αφιερωμένη στην παροχή PSC intelligence).',
    servicesIntro: 'Ως boutique εταιρεία, και για να διατηρήσουμε τα υψηλά πρότυπα διαχείρισης αριστείας και φήμης μας, προσφέρουμε σε επιλεγμένους μόνο πελάτες τη Διαχείριση του στόλου τους, συμπεριλαμβανομένης Εμπορικής & Τεχνικής Διαχείρισης, Λειτουργιών και Crewing, καθώς και Λογιστικών Υπηρεσιών και S&P.',
    companyTeam: 'Η διοίκηση και τα στελέχη της NV διαθέτουν δεκαετίες εμπειρίας και εις βάθος γνώση της ναυτιλιακής βιομηχανίας και ισχυρές σχέσεις με βασικούς παράγοντες του κλάδου, που εγγυώνται ικανή και αξιόπιστη υποστήριξη σε όλους τους πελάτες και συνεργάτες. Αυτά τα άτομα έχουν ενώσει τις δυνάμεις τους υπό ένα «New Vision» για μια πρότυπη εταιρεία διαχείρισης πλοίων των υψηλότερων προτύπων.',
    commercial: 'Εμπορική Διαχείριση',
    commercialSub: 'Ναυλώσεις · S&P · Λειτουργίες',
    commercialDesc: 'Πλήρης εμπορική διαχείριση από τα κεντρικά μας στον Πειραιά — ναυλώσεις με άμεση πρόσβαση σε μεγάλους ναυλωτές παγκοσμίως, συμβουλές Sale & Purchase, βελτιστοποίηση ταξιδιών και διαφανής αναφορά P&L.',
    technical: 'Τεχνική Διαχείριση',
    technicalSub: 'Συντήρηση · Κλάση · Δεξαμενισμός',
    technicalDesc: 'Εσωτερικοί επιθεωρητές με προληπτική συντήρηση σε όλο τον στόλο. Πιστοποιημένος Διαχειριστής Πλοίων κατά ISO 9001:2015 από Bureau Veritas, με πλήρη συμμόρφωση DOC με τον Κώδικα ISM.',
    crew: 'Διαχείριση Πληρώματος',
    crewSub: 'Στρατολόγηση · Εκπαίδευση · Πρόνοια',
    crewDesc: 'Παγκόσμια στρατολόγηση πληρώματος με STCW-πιστοποιημένους αξιωματικούς, συνεχή εκπαίδευση και κορυφαία ποσοστά διατήρησης. Πλήρης λογιστική πληρώματος και συμμόρφωση MLC 2006.',

    chartererCoop: 'Συνεργαζόμαστε με κορυφαίους Ναυλωτές όπως OLDENDORFF, TATA, PACIFIC BASIN, WESTERN BULK, TONGLI, G2 OCEAN, NORDEN, HYUNDAI GLOVIS, MUR, LOUIS DREYFUS COMPANY, BAINBRIDGE, TEAMBULK, DAIFU, PROPEL, PANOCEAN, BULK ASIA, XO SHIPPING κ.ά.',
    envStrategy: 'Σε συμφωνία με την Περιβαλλοντική μας στρατηγική για χαμηλότερη κατανάλωση καυσίμων και συμμόρφωση πέραν των κανονιστικών απαιτήσεων, επενδύουμε σε σύγχρονα πλοία φιλικής τεχνολογίας Tier III.',

    ourFleet: 'Ο Στόλος μας',
    vesselsUnder: 'Πλοία υπό διαχείριση',
    viewDetails: 'Λεπτομέρειες',
    aboutVessel: 'Σχετικά με το πλοίο',
    historicalFleet: 'Ιστορικός Στόλος',

    contactUs: 'Επικοινωνία',
    sendEmail: 'Στείλτε μας Email',
    deptContacts: 'Τμήματα Επικοινωνίας',

    allRights: 'Με επιφύλαξη παντός δικαιώματος.',
  },
} as const;

type Translations = typeof translations.en;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
