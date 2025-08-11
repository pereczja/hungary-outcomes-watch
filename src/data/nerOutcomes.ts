// NER Outcomes data (user-provided)
export type InitiativeStatus = "success" | "mixed" | "lagging";
export interface Initiative {
  id: string;
  title: string;
  goal: string;
  actions: string;
  assessment: string;
  status: InitiativeStatus;
  successScore: number; // 0–100
  tags: string[];
}

export type PromiseStatus = "fulfilled" | "in_progress" | "stalled" | "unknown";
export interface PromiseItem {
  id: string;
  actor: "OV" | "MP";
  title: string;
  date: string; // YYYY-MM-DD
  category: string;
  specificity: number; // 1–5
  deadline?: string; // opcionális
  status: PromiseStatus;
  sources: { label: string; url: string }[];
}

// ——— INITIATIVES (NER Top 12) ———
export const INITIATIVES: Initiative[] = [
  {
    id: "i1",
    title: "Hazai tőkésosztály erősítése",
    goal: "Stratégiai ágazatok magyar kézben, nemzeti bajnokok építése.",
    actions: "Állami megrendelések, felvásárlások, tulajdonosi átrendeződés támogatása.",
    assessment: "Jelentős hazai tulajdon koncentráció; verseny mérséklődése és korrupciós percepció romlás.",
    status: "mixed",
    successScore: 68,
    tags: ["Gazdaság", "Tulajdon", "Ipari politika"],
  },
  {
    id: "i2",
    title: "Rezsicsökkentés",
    goal: "Lakossági energiaárak csökkentése és politikai stabilitás.",
    actions: "Hatósági árak, állami energiapiaci szerepvállalás.",
    assessment: "Politikailag sikeres, költségvetési teherrel és 2022-es részleges feloldással.",
    status: "mixed",
    successScore: 60,
    tags: ["Energia", "Lakosság", "Fiscal"],
  },
  {
    id: "i3",
    title: "Energiafüggetlenség & Paks II",
    goal: "Hosszú távú nukleáris kapacitás bővítése, importfüggés csökkentése.",
    actions: "Roszatom-szerződés, EU-jóváhagyások, engedélyezés.",
    assessment: "Projekt-csúszás, geopolitikai kitettség; közben RES bővülés.",
    status: "lagging",
    successScore: 42,
    tags: ["Energia", "Nukleáris", "Stratégiai"],
  },
  {
    id: "i4",
    title: "CSOK & családpolitika",
    goal: "Termékenység és családtámogatás növelése.",
    actions: "Lakástámogatás, adókedvezmények, hitelek.",
    assessment: "Részleges eredmény: ráta nőtt, de nem érte el a népességfenntartó szintet.",
    status: "mixed",
    successScore: 55,
    tags: ["Demográfia", "Lakhatás", "Szociálpolitika"],
  },
  {
    id: "i5",
    title: "Közmunkaprogram",
    goal: "Munkanélküliség csökkentése alacsony képzettségű régiókban.",
    actions: "Tömeges közfoglalkoztatás, helyi projektek.",
    assessment: "Statisztikai javulás, de alacsony hozzáadott érték és gyenge mobilitás.",
    status: "mixed",
    successScore: 52,
    tags: ["Foglalkoztatás", "Vidék", "Szociálpolitika"],
  },
  {
    id: "i6",
    title: "Keleti nyitás",
    goal: "Orosz, kínai, török, arab kapcsolatok erősítése.",
    actions: "Hitelmegállapodások, vasút/energia/IT projektek.",
    assessment: "Új források, de EU/USA bizalom csökkent; vegyes megtérülés.",
    status: "mixed",
    successScore: 50,
    tags: ["Külpolitika", "FDI", "Ipari politika"],
  },
  {
    id: "i7",
    title: "EU-források centralizált felhasználása",
    goal: "EU pénzek célzott, központi elosztása.",
    actions: "Nagyprojektek, állami beruházások, irányított pályázatok.",
    assessment: "Látványos beruházások, korrupciós kockázatok és felfüggesztett kifizetések.",
    status: "mixed",
    successScore: 48,
    tags: ["EU", "Pénzügy", "Beruházás"],
  },
  {
    id: "i8",
    title: "Alaptörvény & intézményi átalakítás",
    goal: "Hatalmi stabilitás, új alkotmányos rend.",
    actions: "2011 Alaptörvény, AB/ügyészség/médiahatóság/választási rendszer.",
    assessment: "Politikai stabilitás, erős nemzetközi jogállamisági kritikák.",
    status: "success",
    successScore: 74,
    tags: ["Intézmény", "Jog", "Politika"],
  },
  {
    id: "i9",
    title: "Infrastruktúra-fejlesztés",
    goal: "Autópálya-bővítés, vasútmodernizáció, sport- és városprojektek.",
    actions: "M gyorsforgalmi hálózat, Budapest–Belgrád, stadionok.",
    assessment: "Úthálózat bővült; vasút és ROI vitatott.",
    status: "mixed",
    successScore: 58,
    tags: ["Közlekedés", "Beruházás"],
  },
  {
    id: "i10",
    title: "Felsőoktatási/alapítványi modell",
    goal: "Egyetemi irányítás átalakítása, hatékonyság és finanszírozás.",
    actions: "Alapítványi fenntartás, kuratóriumok, forrásbővítés.",
    assessment: "Autonómia-vita; ranglistahatás vegyes.",
    status: "mixed",
    successScore: 47,
    tags: ["Oktatás", "K+F", "Intézmény"],
  },
  {
    id: "i11",
    title: "Honvédelmi fejlesztés (Zrínyi)",
    goal: "NATO-célok, modern eszközpark és kiképzés.",
    actions: "Lynx, NASAMS/IRIS-T, Gripen-szerződés hosszabbítás.",
    assessment: "Beszerzések futnak; humán feltöltés és interoperabilitás folyamatban.",
    status: "mixed",
    successScore: 62,
    tags: ["Védelem", "NATO", "Ipari"],
  },
  {
    id: "i12",
    title: "Turizmus & sportesemény-ország",
    goal: "Nemzetközi imázs, szolgáltatási bevételek.",
    actions: "Puskás Aréna, világesemények, F1 fejlesztések.",
    assessment: "Láthatóság nőtt; fiskális és megtérülési kérdések.",
    status: "mixed",
    successScore: 53,
    tags: ["Turizmus", "Imázs", "Beruházás"],
  },
];

// ——— PROMISES (OV 2022+) ———
export const PROMISES: PromiseItem[] = [
  {
    id: "p1",
    actor: "OV",
    title: "Családtámogatási rendszer fenntartása és bővítése (\"folytatjuk\")",
    date: "2022-03-01",
    category: "Demográfia",
    specificity: 2,
    status: "in_progress",
    sources: [
      { label: "Kormányzati közlés – DEMO", url: "https://kormany.hu" },
    ],
  },
  {
    id: "p2",
    actor: "OV",
    title: "Rezsicsökkentés fenntartása a háztartások védelmére",
    date: "2022-03-10",
    category: "Energia",
    specificity: 3,
    status: "stalled",
    sources: [
      { label: "Korm. rendelet – DEMO", url: "https://njt.hu" },
    ],
  },
  {
    id: "p3",
    actor: "OV",
    title: "Gazdasági növekedés 4% körül tartása külső sokkok ellenére",
    date: "2022-04-01",
    category: "Gazdaság",
    specificity: 2,
    status: "unknown",
    sources: [
      { label: "Miniszterelnöki beszéd – DEMO", url: "https://miniszterelnok.hu" },
    ],
  },
  {
    id: "p4",
    actor: "OV",
    title: "Energiafüggetlenség erősítése (Paks II, RES bővítés)",
    date: "2022-05-01",
    category: "Energia",
    specificity: 3,
    status: "in_progress",
    sources: [
      { label: "Paks II Zrt. – DEMO", url: "https://paks2.hu" },
    ],
  },
  {
    id: "p5",
    actor: "OV",
    title: "Határvédelem és migrációs nyomás kezelése",
    date: "2022-04-10",
    category: "Belbiztonság",
    specificity: 3,
    status: "in_progress",
    sources: [
      { label: "BM közlés – DEMO", url: "https://kormany.hu" },
    ],
  },
  {
    id: "p6",
    actor: "OV",
    title: "Egészségügy kapacitás- és béremelési program folytatása",
    date: "2022-05-15",
    category: "Egészségügy",
    specificity: 2,
    status: "unknown",
    sources: [
      { label: "EMMI/Belügy – DEMO", url: "https://kormany.hu" },
    ],
  },
  {
    id: "p7",
    actor: "OV",
    title: "Pedagógusbérek érdemi emelése EU-forrás bevonásával",
    date: "2022-06-01",
    category: "Oktatás",
    specificity: 4,
    status: "in_progress",
    sources: [
      { label: "Kormányzati közlés – DEMO", url: "https://kormany.hu" },
    ],
  },
  {
    id: "p8",
    actor: "OV",
    title: "Védelmi kiadások NATO 2% fölé emelése",
    date: "2022-07-01",
    category: "Védelem",
    specificity: 5,
    status: "in_progress",
    sources: [
      { label: "Honvédelmi minisztérium – DEMO", url: "https://honvedelem.hu" },
    ],
  },
  {
    id: "p9",
    actor: "OV",
    title: "Kis- és középvállalkozások támogatása adókedvezményekkel",
    date: "2022-04-05",
    category: "KKV",
    specificity: 3,
    status: "unknown",
    sources: [
      { label: "Gazdaságfejlesztési min. – DEMO", url: "https://kormany.hu" },
    ],
  },
  {
    id: "p10",
    actor: "OV",
    title: "Digitalizáció és szuverenitás: állami rendszerek modernizációja",
    date: "2022-09-01",
    category: "Digitalizáció",
    specificity: 2,
    status: "unknown",
    sources: [
      { label: "NISZ – DEMO", url: "https://nisz.hu" },
    ],
  },
];
