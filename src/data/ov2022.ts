export type OVItemType = 'ígéret' | 'befagyasztás' | 'folytatjuk';
export type OVItemStatus = 'folyamatban' | 'teljesítve' | 'nincs-információ';

export interface OVItem {
  id: string;
  tema: string;
  tipus: OVItemType;
  tetel: string;
  datum: string; // ISO date
  forrasCim: string;
  forrasUrl: string;
  status: OVItemStatus;
}

export const ov2022Items: OVItem[] = [
  {
    id: 'ov-1',
    tema: 'Energia/rezsi',
    tipus: 'folytatjuk',
    tetel: 'Lakossági energiaár-védelem fenntartása (rezsivédelem)',
    datum: '2024-12-03',
    forrasCim: 'Németh: Household energy prices are lowest in Europe (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/news-in-brief/nemeth-household-energy-prices-in-hungary-are-lowest-in-europe',
    status: 'folyamatban',
  },
  {
    id: 'ov-2',
    tema: 'Infláció',
    tipus: 'ígéret',
    tetel: 'Infláció egyszámjegyűre szorítása 2023 végére (14 pontos terv)',
    datum: '2023-08-16',
    forrasCim: 'Hungary’s 14-point plan to crack down on inflation (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/blog/hungarys-14-point-plan-to-crack-down-on-inflation-is-coming-to-fruition',
    status: 'folyamatban',
  },
  {
    id: 'ov-3',
    tema: 'Vállalkozások/energia',
    tipus: 'ígéret',
    tetel: 'Energiaintenzív KKV-k támogatási programja (2022–2023)',
    datum: '2022-09-19',
    forrasCim: 'Support scheme for energy-intensive SMEs (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/news-in-brief/government-announces-support-scheme-for-energy-intensive-smes',
    status: 'teljesítve',
  },
  {
    id: 'ov-4',
    tema: 'Kormányprogram/évértékelő',
    tipus: 'folytatjuk',
    tetel: 'Munkaalapú gazdaság és családpolitika folytatása (Évértékelő beszéd)',
    datum: '2024-02-17',
    forrasCim: 'State of the Nation address – 2024 (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/speeches-and-remarks/prime-minister-viktor-orbans-state-of-the-nation-address-65d1111228cc6',
    status: 'folyamatban',
  },
  {
    id: 'ov-5',
    tema: 'Programbeszéd/Tusványos',
    tipus: 'folytatjuk',
    tetel: 'Szuverenitásvédelmi és demográfiai célok hangsúlyozása (Tusnádfürdő)',
    datum: '2023-07-22',
    forrasCim: 'Speech at the 32nd Bálványos Summer Free University (miniszterelnok.hu)',
    forrasUrl: 'https://miniszterelnok.hu/en/speech-by-prime-minister-viktor-orban-at-the-32nd-balvanyos-summer-free-university-and-student-camp/',
    status: 'folyamatban',
  },
  {
    id: 'ov-6',
    tema: 'Védelem/NATO',
    tipus: 'folytatjuk',
    tetel: 'Védelmi kiadások NATO 2% céljának teljesítése és fenntartása',
    datum: '2025-02-14',
    forrasCim: 'Defense Minister: NATO commitments on defense spending (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/news-in-brief/defense-minister-hungary-makes-notable-contribution-to-collective-defense-of-nato-allies',
    status: 'folyamatban',
  },
  {
    id: 'ov-7',
    tema: 'Kormányprogram/évértékelő',
    tipus: 'folytatjuk',
    tetel: 'Gazdasági stabilitás és növekedés helyreállítása (Évértékelő és kormányzati kommunikáció)',
    datum: '2025-02-22',
    forrasCim: 'State of the Nation address – 2025 (miniszterelnok.hu)',
    forrasUrl: 'https://miniszterelnok.hu/en/prime-minister-viktor-orbans-state-of-the-nation-address-2025-02-22/',
    status: 'folyamatban',
  },
];
