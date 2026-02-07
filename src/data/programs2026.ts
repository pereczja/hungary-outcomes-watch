// 2026-os választási programok - Fidesz vs Tisza
// Struktúra: tématerület alapú összehasonlítás, forrásokkal

export type PartyId = 'fidesz' | 'tisza';

export type PolicyStatus =
  | 'announced'      // Bejelentve, de nincs részlet
  | 'detailed'       // Részletes program pont
  | 'in-government'  // Kormányon lévő párt - folyamatban
  | 'track-record'   // Van múltbeli track record
  | 'pending';       // Még nem ismert (pl. Tisza szombat előtt)

export interface PolicySource {
  label: string;
  url: string;
  date: string; // ISO date
}

export interface PolicyPosition {
  summary: string;           // Rövid összefoglaló (1-2 mondat)
  details?: string;          // Részletes leírás
  status: PolicyStatus;
  sources: PolicySource[];
  trackRecord?: string;      // Korábbi teljesítmény (ha releváns)
}

export interface PolicyArea {
  id: string;
  name: string;
  nameEn: string;
  icon: string;              // Lucide icon name
  description: string;
  positions: Record<PartyId, PolicyPosition>;
  lastUpdated: string;
}

export interface Party {
  id: PartyId;
  name: string;
  shortName: string;
  color: string;             // Tailwind color
  leader: string;
  programUrl?: string;
  programDate?: string;      // Mikor publikálták a programot
}

// ==================== PÁRTOK ====================

export const parties: Party[] = [
  {
    id: 'fidesz',
    name: 'Fidesz–KDNP',
    shortName: 'Fidesz',
    color: 'orange',
    leader: 'Orbán Viktor',
    programUrl: 'https://fidesz.hu',
    programDate: '2026-01-15', // 21 pontos nemzeti konzultáció
  },
  {
    id: 'tisza',
    name: 'Tisza Párt',
    shortName: 'Tisza',
    color: 'blue',
    leader: 'Magyar Péter',
    programUrl: 'https://magyartisza.hu/program',
    programDate: '2026-02-07',
  },
];

// ==================== TÉMATERÜLETEK ====================

export const policyAreas: PolicyArea[] = [
  {
    id: 'economy-tax',
    name: 'Gazdaság és Adózás',
    nameEn: 'Economy & Taxation',
    icon: 'TrendingUp',
    description: 'Adópolitika, gazdasági növekedés, versenyképesség',
    positions: {
      fidesz: {
        summary: 'Flat 15% SZJA fenntartása, minimálbér emelés, KKV támogatás folytatása.',
        details: 'A kormány a lapos adórendszer mellett áll ki, 2026-ra 400.000 Ft feletti minimálbért céloz. A KATA rendszer korlátozásait fenntartja.',
        status: 'in-government',
        trackRecord: '2010 óta: SZJA 16%→15%, de közvetett adók (ÁFA 27%) magasak maradtak. GDP növekedés ciklikus.',
        sources: [
          { label: 'Nemzeti konzultáció 2025', url: 'https://kormany.hu/nemzeti-konzultacio', date: '2025-12-15' },
        ],
      },
      tisza: {
        summary: 'Minimálbér SZJA-mentessége, mediánbér alatti jövedelmek adócsökkentése, milliárdosadó.',
        details: 'SZJA 15%→9% minimálbérnél, mediánbér alatti 2,2M munkavállaló adóterhe csökken. Ganz Ábrahám Gazdaságfejlesztési Program: EU-források hazahozatala, KKV-k adminisztratív terheinek felezése, innovációs kiadások 1,5×-ösre emelése. Költségvetési hiány 3% alá 2030-ra.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: 'Portfolio összefoglaló', url: 'https://www.portfolio.hu/gazdasag/20260207/itt-a-tisza-part-gazdasagi-programja-816528', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'healthcare',
    name: 'Egészségügy',
    nameEn: 'Healthcare',
    icon: 'Heart',
    description: 'Kórházak, várólisták, orvos- és nővérhiány, finanszírozás',
    positions: {
      fidesz: {
        summary: 'Kórházfejlesztési program folytatása, béremelések az ágazatban.',
        details: 'Egészséges Budapest Program, kórházi eszközpark modernizáció. Orvosi béremelés 2023-ban megtörtént, de elvándorlás folytatódik.',
        status: 'in-government',
        trackRecord: 'Várólisták továbbra is hosszúak. Orvoshiány kritikus, különösen vidéken. COVID alatt rendszer túlterhelt volt.',
        sources: [
          { label: 'Egészséges Budapest Program', url: 'https://egeszsegbudapest.hu', date: '2024-06-01' },
        ],
      },
      tisza: {
        summary: 'Önálló minisztérium, +500 Mrd Ft/év, várólisták felszámolása, új megyei szuperkórházak.',
        details: 'Egészségügyi minisztérium vétójoggal a költségvetésnél. 2030-tól GDP 7%-a egészségügyre. Várólisták 6 hónapra (fekvő) / 2 hónapra (járó) 2027 végéig. Új megyei kórházak építése, meglévők modernizálása. Orvos- és nővérbérek versenyképessé tétele.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: 'HVG összefoglaló', url: 'https://hvg.hu/itthon/20260207_magyar-peter-tisza-program-bemutato-elo-kozvetites', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'education',
    name: 'Oktatás',
    nameEn: 'Education',
    icon: 'GraduationCap',
    description: 'Pedagógusbérek, tanterv, egyetemi autonómia, Erasmus',
    positions: {
      fidesz: {
        summary: 'Pedagógusbér-emelés folytatása, központi tanterv fenntartása.',
        details: 'Klebelsberg Központ irányítása marad. Alapítványi egyetemi modell kiterjesztése. Erasmus-hozzáférés EU-tárgyalások függvénye.',
        status: 'in-government',
        trackRecord: 'Pedagógus sztrájkok 2022-2023. Erasmus felfüggesztve több intézménynél. PISA eredmények romló tendencia.',
        sources: [
          { label: 'Eurydice pedagógusbér jelentés', url: 'https://eurydice.eacea.ec.europa.eu', date: '2025-03-01' },
        ],
      },
      tisza: {
        summary: 'Önálló minisztérium, pedagógusbér-emelés, egyetemi autonómia, Erasmus visszaszerzése.',
        details: 'Oktatási minisztérium visszaállítása. Állami tankönyv-monopólium megszüntetése. Egyetemi autonómia helyreállítása, alapítványi modell felülvizsgálata. Erasmus és EU-programok visszaszerzése. PISA-eredmények javítása célzott programokkal.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: 'Euronews összefoglaló', url: 'https://hu.euronews.com/2026/02/07/reszleges-szja-csokkentes-az-oktatas-felviragoztatasa-euro-programot-hirdetett-a-tisza-par', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'eu-relations',
    name: 'EU Kapcsolatok',
    nameEn: 'EU Relations',
    icon: 'Globe',
    description: 'EU-források, jogállamiság, EPPO, külpolitikai irány',
    positions: {
      fidesz: {
        summary: 'EU-tagság igen, de "nemzeti szuverenitás" védelme. EPPO-csatlakozás nem terv.',
        details: 'Kohéziós és RRF források feloldásáért tárgyalások. Migrációs politikában EU-ellenes álláspont. Vétók használata EU-döntéseknél.',
        status: 'in-government',
        trackRecord: '~30 Mrd EUR befagyasztva jogállamisági aggályok miatt. Rendszeres EU-konfliktusok. Orosz kapcsolatok kritikája.',
        sources: [
          { label: 'EC Rule of Law Report 2024', url: 'https://ec.europa.eu/info/policies/justice-and-fundamental-rights/upholding-rule-law/rule-law/rule-law-mechanism/2024-rule-law-report', date: '2024-07-01' },
        ],
      },
      tisza: {
        summary: 'EU-integráció megerősítése, nyugat-orientált külpolitika, befagyasztott források feloldása.',
        details: 'Szuverén, de egyértelműen EU- és NATO-párti irányvonal. EPPO-csatlakozás. Jogállamisági kritériumok teljesítése, ~30 Mrd EUR EU-forrás felszabadítása. Euró bevezetésének előkészítése. Konstruktív EU-partnerség vétópolitika helyett.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'corruption',
    name: 'Korrupció és Átláthatóság',
    nameEn: 'Anti-corruption & Transparency',
    icon: 'Shield',
    description: 'Közbeszerzések, vagyonnyilatkozatok, EPPO, független intézmények',
    positions: {
      fidesz: {
        summary: 'Meglévő ellenőrző szervek elegendőek, EPPO-csatlakozás nem indokolt.',
        details: 'Integritás Hatóság felállítva EU nyomásra 2022-ben. Közbeszerzési törvény módosítások. Kormányközeli cégek dominanciája.',
        status: 'in-government',
        trackRecord: 'TI Corruption Perception Index: 2012: 55. hely → 2023: 76. hely. EU-források miatti felfüggesztések.',
        sources: [
          { label: 'Transparency International Hungary', url: 'https://transparency.hu', date: '2024-01-01' },
        ],
      },
      tisza: {
        summary: 'EPPO-csatlakozás, valódi közbeszerzési verseny, NER-közeli cégek támogatásának megszüntetése.',
        details: 'Európai Ügyészséghez (EPPO) csatlakozás. Közbeszerzési rendszer átláthatóvá tétele, valódi verseny. NER-közeli cégek elvtelen támogatásának leállítása – becsült megtakarítás ~600 Mrd Ft/év. Ellopott közvagyon visszaszerzése. Független intézmények megerősítése.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: '444 összefoglaló', url: 'https://444.hu/2026/02/07/mukodo-es-emberseges-magyarorszag-magyar-peter-es-a-tisza-hozzakezdett-programja-ismertetesehez', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'housing',
    name: 'Lakhatás',
    nameEn: 'Housing',
    icon: 'Home',
    description: 'Lakásárak, CSOK, bérlakás, fiatalok lakhatása',
    positions: {
      fidesz: {
        summary: 'CSOK és családi otthonteremtési kedvezmények folytatása.',
        details: 'Vidéki otthonfelújítási program. Lakásáfa kedvezmények új építésű lakásokra. Állami bérlakás-program nem prioritás.',
        status: 'in-government',
        trackRecord: 'Lakásárak 2015-2024 között ~200%-kal nőttek. Fiatalok lakáshoz jutása kritikus. Bérlakás-állomány EU-átlag alatt.',
        sources: [
          { label: 'KSH lakáspiaci adatok', url: 'https://ksh.hu', date: '2025-01-01' },
        ],
      },
      tisza: {
        summary: 'Megfizethető lakhatás, fiatalok támogatása, bérlakás-program indítása.',
        details: 'Lakhatási program fiataloknak és családoknak. Állami bérlakás-állomány bővítése. Lakásárak emelkedésének fékezése szabályozással. Részletek a 240 oldalas programban.',
        status: 'announced',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'family',
    name: 'Családpolitika',
    nameEn: 'Family Policy',
    icon: 'Users',
    description: 'Családi pótlék, GYED/GYES, termékenység, gyermekvállalás',
    positions: {
      fidesz: {
        summary: 'Családtámogatási rendszer fenntartása és bővítése, demográfiai fókusz.',
        details: '4+ gyermekes anyák SZJA-mentessége. Babaváró hitel. CSOK. Nagyszülői GYED.',
        status: 'in-government',
        trackRecord: 'Termékenységi ráta 1,5 körül - javulás, de népességfogyás folytatódik. Támogatások főleg középosztályt érik el.',
        sources: [
          { label: 'OECD Family Database', url: 'https://oecd.org/els/family/database.htm', date: '2024-06-01' },
        ],
      },
      tisza: {
        summary: '100% Család program: családi pótlék duplázása, 50e Ft újszülött-csomag, 20e új idősgondozási hely.',
        details: 'Népességfogyás megállítása 2035-ig, 2050-re 10M+ cél. „Vár a hazád!" program: 200 ezer hazatelepülő 8 év alatt. Családi pótlék megduplázása. 50.000 Ft értékű újszülött-csomag. Idősgondozás: 20.000 új intézményi férőhely.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: 'Infostart összefoglaló', url: 'https://infostart.hu/belfold/2026/02/07/a-tisza-part-bemutatta-240-oldalas-programjat', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'energy',
    name: 'Energia',
    nameEn: 'Energy',
    icon: 'Zap',
    description: 'Rezsicsökkentés, Paks II, megújulók, energiafüggetlenség',
    positions: {
      fidesz: {
        summary: 'Rezsicsökkentés fenntartása, Paks II építése, orosz gázfüggés csökkentése.',
        details: 'Paks II projekt orosz hitelből. Napenergia bővülés támogatása. Gázszerződés Gazprommal 2036-ig.',
        status: 'in-government',
        trackRecord: 'Paks II: többszöri csúszás, 2029+ várható. Rezsi: 2022-ben részleges feloldás. Napenergia: >7 GW kapacitás.',
        sources: [
          { label: 'Paks II Zrt.', url: 'https://paks2.hu', date: '2025-01-01' },
        ],
      },
      tisza: {
        summary: 'Orosz energiafüggőség megszüntetése 2035-ig, megújulók duplázása 2040-ig, rezsicsökkentés+.',
        details: 'Orosz gáz- és olajfüggőség felszámolása 2035-ig. Megújuló energia arányának megduplázása 2040-ig. Rezsicsökkentés kiterjesztése („rezsicsökkentés plusz") – alacsony jövedelműek védelme. Akkumulátorgyárak felülvizsgálata.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: '444 összefoglaló', url: 'https://444.hu/2026/02/07/mukodo-es-emberseges-magyarorszag-magyar-peter-es-a-tisza-hozzakezdett-programja-ismertetesehez', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'media-freedom',
    name: 'Sajtószabadság',
    nameEn: 'Media Freedom',
    icon: 'Newspaper',
    description: 'Közmédia, független sajtó, KESMA, médiapiac',
    positions: {
      fidesz: {
        summary: 'Közmédia szolgáltat, piaci alapon működő médiarendszer.',
        details: 'KESMA (500+ kormánybarát médium) alapítvány. Közmédia költségvetése stabil. Független média hirdetési bevételtől elvágva.',
        status: 'in-government',
        trackRecord: 'RSF Press Freedom Index: 2010: 23. → 2024: 67. hely. Klubrádió frekvenciavesztés. Index.hu átalakítás.',
        sources: [
          { label: 'RSF Press Freedom Index', url: 'https://rsf.org/en/country/hungary', date: '2024-05-01' },
        ],
      },
      tisza: {
        summary: 'Független közmédia, KESMA felszámolása, plurális médiarendszer.',
        details: 'Közmédia függetlenségének helyreállítása. KESMA-birodalom felszámolása. Független sajtó működési feltételeinek biztosítása. Médiapiac versenyének helyreállítása.',
        status: 'announced',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'justice',
    name: 'Igazságszolgáltatás',
    nameEn: 'Justice System',
    icon: 'Scale',
    description: 'Bíróságok függetlensége, ügyészség, alkotmánybíróság',
    positions: {
      fidesz: {
        summary: 'Jelenlegi intézményi keretek megfelelőek, EU-kritikák politikai motivációjúak.',
        details: 'Legfőbb ügyész (Polt Péter) 2010 óta. Alkotmánybíróság kormánypárti többséggel. Közigazgatási bíróságok terve visszavonva.',
        status: 'in-government',
        trackRecord: 'EU Art. 7 eljárás. Kormányközeli szereplők elleni ügyek ritkák. Kúria és AB összetétele kormánypárti.',
        sources: [
          { label: 'Venice Commission vélemények', url: 'https://venice.coe.int', date: '2024-01-01' },
        ],
      },
      tisza: {
        summary: 'Jogrendszer gyökeres átalakítása, bírói függetlenség, ügyészség reformja.',
        details: 'Igazságszolgáltatás függetlenségének helyreállítása. Legfőbb ügyész demokratikus kontrollja. Alkotmánybíróság depolitizálása. Fékek és ellensúlyok rendszerének megerősítése.',
        status: 'announced',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: 'Vadhajtások', url: 'https://www.vadhajtasok.hu/2026/02/04/magyar-peter-es-a-tisza-part-a-jogrendszer-a-jogi-kornyezet-gyokeres-atalakitasara-keszul', date: '2026-02-04' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'defense',
    name: 'Honvédelem',
    nameEn: 'Defense',
    icon: 'Shield',
    description: 'NATO, védelmi kiadások, haderőfejlesztés, Ukrajna',
    positions: {
      fidesz: {
        summary: 'NATO-tagság fenntartása, védelmi kiadások 2% fölé, Ukrajna fegyverszállítás nem.',
        details: 'Zrínyi 2026 haderőfejlesztési program. Lynx harcjárművek, NASAMS légvédelem. Ukrajna: humanitárius segély igen, fegyver nem.',
        status: 'in-government',
        trackRecord: 'NATO 2% cél teljesül. Orosz kapcsolatok miatti kritikák. Ukrán-magyar feszültség.',
        sources: [
          { label: 'NATO Defence Expenditure', url: 'https://nato.int/cps/en/natohq/topics_49198.htm', date: '2024-07-01' },
        ],
      },
      tisza: {
        summary: 'NATO-elkötelezettség, nincs sorkötelezettség, nem küld katonákat Ukrajnába.',
        details: 'Egyértelmű NATO-elkötelezettség. Nem küld magyar katonákat az orosz-ukrán háborúba. Nem állítja vissza a sorkötelezettséget. Haderő modernizálása, de békepárti külpolitika.',
        status: 'detailed',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: 'Infostart összefoglaló', url: 'https://infostart.hu/belfold/2026/02/07/a-tisza-part-bemutatta-240-oldalas-programjat', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
  {
    id: 'environment',
    name: 'Környezetvédelem',
    nameEn: 'Environment',
    icon: 'Leaf',
    description: 'Klímapolitika, zöld átállás, levegőminőség, hulladékgazdálkodás',
    positions: {
      fidesz: {
        summary: 'EU klímacélok teljesítése, de gazdasági érdekek elsőbbsége.',
        details: 'Napenergia támogatás. E-autó szubvenciók. Ugyanakkor: lignit-erőművek, autópálya-építés, zöld területek beépítése.',
        status: 'in-government',
        trackRecord: 'CO2 kibocsátás EU-átlag körül. Levegőminőség több városban kritikus. MOL/TVK környezeti viták.',
        sources: [
          { label: 'EEA Hungary Profile', url: 'https://eea.europa.eu', date: '2024-01-01' },
        ],
      },
      tisza: {
        summary: 'Zöld átállás, megújulók bővítése, akkumulátorgyárak felülvizsgálata.',
        details: 'Fenntarthatóság és jövőállóság a program negyedik pillére. Megújuló energia arány duplázása 2040-ig. Akkumulátorgyár-beruházások környezeti hatásainak felülvizsgálata. Klímapolitikai célok EU-szintű harmonizálása.',
        status: 'announced',
        sources: [
          { label: 'Tisza Program 2026', url: 'https://magyartisza.hu/program', date: '2026-02-07' },
          { label: '444 összefoglaló', url: 'https://444.hu/2026/02/07/mukodo-es-emberseges-magyarorszag-magyar-peter-es-a-tisza-hozzakezdett-programja-ismertetesehez', date: '2026-02-07' },
        ],
      },
    },
    lastUpdated: '2026-02-07',
  },
];

// ==================== HELPER FUNCTIONS ====================

export const getParty = (id: PartyId): Party | undefined =>
  parties.find(p => p.id === id);

export const getPolicyArea = (id: string): PolicyArea | undefined =>
  policyAreas.find(p => p.id === id);

export const getPendingCount = (partyId: PartyId): number =>
  policyAreas.filter(p => p.positions[partyId].status === 'pending').length;

export const getDetailedCount = (partyId: PartyId): number =>
  policyAreas.filter(p =>
    p.positions[partyId].status === 'detailed' ||
    p.positions[partyId].status === 'in-government'
  ).length;
