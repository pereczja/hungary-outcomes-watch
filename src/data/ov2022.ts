export type OVItemType = 'ígéret' | 'befagyasztás' | 'folytatjuk';
export type OVItemStatus = 'folyamatban' | 'teljesítve' | 'nincs-információ' | 'csúszik' | 'nem-teljesült';

export interface OVItem {
  id: string;
  tema: string;
  tipus: OVItemType;
  tetel: string;
  datum: string; // ISO date
  forrasCim: string;
  forrasUrl: string;
  status: OVItemStatus;
  megjegyzes?: string;
}

export const ov2022Items: OVItem[] = [
  // ==================== ENERGIA / REZSI ====================
  {
    id: 'ov-1',
    tema: 'Energia/rezsi',
    tipus: 'folytatjuk',
    tetel: 'Lakossági energiaár-védelem fenntartása (rezsivédelem)',
    datum: '2024-12-03',
    forrasCim: 'Németh: Household energy prices are lowest in Europe (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/news-in-brief/nemeth-household-energy-prices-in-hungary-are-lowest-in-europe',
    status: 'folyamatban',
    megjegyzes: '2022 augusztusában részlegesen feloldva (átlagfogyasztás felett piaci ár). Költségvetési teher ~1500 Mrd Ft/év.',
  },
  {
    id: 'ov-12',
    tema: 'Energia/nukleáris',
    tipus: 'folytatjuk',
    tetel: 'Paks II beruházás megvalósítása',
    datum: '2024-08-27',
    forrasCim: 'FM: Paks 2 construction will intensify (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/news-in-brief/fm-paks-2-construction-will-intensify-as-investment-moves-into-higher-gear',
    status: 'csúszik',
    megjegyzes: 'Eredeti céldátum: 2025-2026. Jelenlegi prognózis: 2033-2034 (~8 év csúszás). Első betonöntés 2019-ről többször halasztva, legutóbb 2026. febr. 5-re. Orosz hitel, Roszatom kivitelező.',
  },

  // ==================== INFLÁCIÓ / GAZDASÁG ====================
  {
    id: 'ov-2',
    tema: 'Infláció',
    tipus: 'ígéret',
    tetel: 'Infláció egyszámjegyűre szorítása 2023 végére',
    datum: '2023-08-16',
    forrasCim: "Hungary's 14-point plan to crack down on inflation (AboutHungary)",
    forrasUrl: 'https://abouthungary.hu/blog/hungarys-14-point-plan-to-crack-down-on-inflation-is-coming-to-fruition',
    status: 'teljesítve',
    megjegyzes: '2023 Q4: 9,2% (egyszámjegyű). 2024: 3-4%. Cél teljesült, de 2022-23-ban EU-csúcs volt (~25%).',
  },
  {
    id: 'ov-7',
    tema: 'Gazdaság',
    tipus: 'folytatjuk',
    tetel: 'Gazdasági stabilitás és növekedés helyreállítása',
    datum: '2025-02-22',
    forrasCim: 'State of the Nation address – 2025 (miniszterelnok.hu)',
    forrasUrl: 'https://miniszterelnok.hu/en/prime-minister-viktor-orbans-state-of-the-nation-address-2025-02-22/',
    status: 'csúszik',
    megjegyzes: '2023: -0,9% GDP (recesszió). 2024: ~0,5% növekedés. 2025 Q1: 0,4%. EU-átlag alatt. "Fordulat éve" többször kommunikálva.',
  },
  {
    id: 'ov-3',
    tema: 'Vállalkozások',
    tipus: 'ígéret',
    tetel: 'Energiaintenzív KKV-k támogatási programja (2022–2023)',
    datum: '2022-09-19',
    forrasCim: 'Support scheme for energy-intensive SMEs (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/news-in-brief/government-announces-support-scheme-for-energy-intensive-smes',
    status: 'teljesítve',
  },

  // ==================== BÉREK / FOGLALKOZTATÁS ====================
  {
    id: 'ov-11',
    tema: 'Bérek',
    tipus: 'folytatjuk',
    tetel: 'Minimálbér és garantált bérminimum emelése (2024–2025)',
    datum: '2024-12-12',
    forrasCim: '394/2024. (XII.12.) Korm. rendelet (kormanyhivatalok.hu)',
    forrasUrl: 'https://kormanyhivatalok.hu/sites/default/files/2025-02/mennyi-is-2025-ben_1.pdf',
    status: 'teljesítve',
    megjegyzes: '2025: minimálbér 290.800 Ft (+9%), garantált bérminimum 348.800 Ft (+7%). Reálértéken 2021-es szint körül.',
  },
  {
    id: 'ov-16',
    tema: 'Foglalkoztatás/fiatalok',
    tipus: 'ígéret',
    tetel: 'Munkáshitel – 4M Ft kamatmentes (17-25 évesek)',
    datum: '2025-01-01',
    forrasCim: 'Munkáshitel feltételei (money.hu)',
    forrasUrl: 'https://tudastar.money.hu/ismerteto/tamogatasok-fiataloknak/',
    status: 'teljesítve',
    megjegyzes: 'Szabad felhasználás, fedezet nélkül, 3 hó TB jogviszony kell. Max. 10 év futamidő.',
  },

  // ==================== CSALÁDPOLITIKA / LAKHATÁS ====================
  {
    id: 'ov-8',
    tema: 'Családpolitika/lakhatás',
    tipus: 'ígéret',
    tetel: 'CSOK Plusz bevezetése és működtetése',
    datum: '2024-10-01',
    forrasCim: 'CSOK Plusz – könnyített igénylés (kormany.hu)',
    forrasUrl: 'https://kormany.hu/hirek/oktober-1-jetol-konnyebben-vehetik-igenybe-a-csok-pluszt-a-falusi-csok-ot-es-a-babavaro-tamogatast-a-specialisan-adozok-es-az-ostermelok',
    status: 'folyamatban',
    megjegyzes: 'Max 3% kamat, 10-25 év, min. 10-20% önerő. Értékhatár emelve: lakás 100M, ház 150M Ft.',
  },
  {
    id: 'ov-9',
    tema: 'Családpolitika',
    tipus: 'folytatjuk',
    tetel: 'Babaváró támogatás folytatása',
    datum: '2024-10-01',
    forrasCim: 'Babaváró – könnyített igénylés (kormany.hu)',
    forrasUrl: 'https://kormany.hu/hirek/oktober-1-jetol-konnyebben-vehetik-igenybe-a-csok-pluszt-a-falusi-csok-ot-es-a-babavaro-tamogatast-a-specialisan-adozok-es-az-ostermelok',
    status: 'folyamatban',
    megjegyzes: 'Max 11M Ft, 20 év futamidő. Gyermekvállalás esetén kamattámogatott/elengedett.',
  },
  {
    id: 'ov-10',
    tema: 'Adózás/családpolitika',
    tipus: 'ígéret',
    tetel: '30 év alatti anyák SZJA-mentessége',
    datum: '2023-01-01',
    forrasCim: 'NAV: 30 év alatti anyák kedvezménye',
    forrasUrl: 'https://nav.gov.hu/ado/szja/30_ev_alatti_anyak_kedvezmenye',
    status: 'teljesítve',
  },
  {
    id: 'ov-13',
    tema: 'Lakhatás/közszolgálat',
    tipus: 'ígéret',
    tetel: 'Közszolgálati otthontámogatás – évi nettó 1M Ft lakáshitel-törlesztésre',
    datum: '2026-01-01',
    forrasCim: 'Közszolgálati otthontámogatás részletei (Portfolio)',
    forrasUrl: 'https://www.portfolio.hu/bank/20251127/otthontamogatas-2026-az-1-millios-kozszolgalati-tamogatas-reszletes-feltetelei-tudnivaloi-egy-helyen-802614',
    status: 'folyamatban',
    megjegyzes: '~800 ezer jogosult (tanárok, rendőrök, orvosok, önkormányzati dolgozók). Házaspárnál 2M Ft/év. Önerőként is felhasználható.',
  },
  {
    id: 'ov-14',
    tema: 'Lakhatás/fiatalok',
    tipus: 'ígéret',
    tetel: 'Otthon Start Program – 3%-os kamattámogatott hitel max. 50M Ft',
    datum: '2025-07-01',
    forrasCim: 'Otthon Start Program (Magyar Nemzet)',
    forrasUrl: 'https://magyarnemzet.hu/gazdasag/2025/07/otthon-start-program-ingatlanpiac-lakasvasarlas-hitel',
    status: 'folyamatban',
    megjegyzes: 'Első lakásvásárlóknak, max. 25 év futamidő. Nincs gyermekvállalási feltétel.',
  },
  {
    id: 'ov-15',
    tema: 'Lakhatás/fiatalok',
    tipus: 'ígéret',
    tetel: 'Munkáltatói lakhatási támogatás – havi max. 150 ezer Ft (35 év alatt)',
    datum: '2025-01-01',
    forrasCim: 'NAV: 35 év alattiak lakhatási támogatása',
    forrasUrl: 'https://nav.gov.hu/ado/szja/35_ev_alattiak_lakhatasi_tamogatasa',
    status: 'teljesítve',
    megjegyzes: 'Béren kívüli juttatás, kedvező adózás (28%). Lakbérre vagy hiteltörlesztésre. Évi max. 1,8M Ft.',
  },
  {
    id: 'ov-17',
    tema: 'Lakhatás/fiatalok',
    tipus: 'ígéret',
    tetel: '5%-os kedvezményes lakáshitel – 35 év alattiak, A+ lakás',
    datum: '2025-04-01',
    forrasCim: 'Kedvezményes hitel fiataloknak (e-ingatlanugyvedek.hu)',
    forrasUrl: 'https://e-ingatlanugyvedek.hu/blog/kedvezmenyes-hitel-35-ev-alatti-fiatalok-otthonteremtesenek-tamogatasara',
    status: 'folyamatban',
    megjegyzes: 'Önkéntes banki részvétel, 2025. ápr. 1 – okt. 31. Max. 60 m², 1,2M Ft/m². Első 5 év kedvezményes.',
  },

  // ==================== KORMÁNYPROGRAM / VÉDELEM ====================
  {
    id: 'ov-4',
    tema: 'Kormányprogram',
    tipus: 'folytatjuk',
    tetel: 'Munkaalapú gazdaság és családpolitika folytatása',
    datum: '2024-02-17',
    forrasCim: 'State of the Nation address – 2024 (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/speeches-and-remarks/prime-minister-viktor-orbans-state-of-the-nation-address-65d1111228cc6',
    status: 'folyamatban',
  },
  {
    id: 'ov-5',
    tema: 'Programbeszéd',
    tipus: 'folytatjuk',
    tetel: 'Szuverenitásvédelmi és demográfiai célok (Tusnádfürdő)',
    datum: '2023-07-22',
    forrasCim: 'Speech at Bálványos (miniszterelnok.hu)',
    forrasUrl: 'https://miniszterelnok.hu/en/speech-by-prime-minister-viktor-orban-at-the-32nd-balvanyos-summer-free-university-and-student-camp/',
    status: 'folyamatban',
    megjegyzes: 'Éves tusványosi beszéd. 2023-ban "fajkeveredés" kijelentés miatt nemzetközi kritika.',
  },
  {
    id: 'ov-6',
    tema: 'Védelem/NATO',
    tipus: 'folytatjuk',
    tetel: 'Védelmi kiadások NATO 2% céljának teljesítése',
    datum: '2025-02-14',
    forrasCim: 'Defense Minister: NATO commitments (AboutHungary)',
    forrasUrl: 'https://abouthungary.hu/news-in-brief/defense-minister-hungary-makes-notable-contribution-to-collective-defense-of-nato-allies',
    status: 'teljesítve',
    megjegyzes: '2024-től teljesül a 2%-os GDP-arányos védelmi kiadás. Zrínyi 2026 program.',
  },
];
