import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DataExport } from "@/components/DataExport";

const principles = [
  {
    num: "01",
    title: "Igazság > Narratíva",
    desc: "Ami mérhető, azt mérjük. Ami nem mérhető, azt nem állítjuk.",
  },
  {
    num: "02",
    title: "Kontextus kötelező",
    desc: "Magyar adatot csak regionális/nemzetközi kontextusban mutatunk.",
  },
  {
    num: "03",
    title: "Forrás = Létezés",
    desc: "Ami nincs forrásolva, az nem létezik a platformon.",
  },
  {
    num: "04",
    title: "Nem interpretálunk",
    desc: "A platform nem mondja meg, mi a 'jó' vagy 'rossz'. A user dönt.",
  },
  {
    num: "05",
    title: "Egyszerűség",
    desc: "Az átlag szavazó 30 másodperc alatt értse meg.",
  },
  {
    num: "06",
    title: "Idősor",
    desc: "Egy pillanatfelvétel nem elég. A trend számít. 2010 = bázisév.",
  },
  {
    num: "07",
    title: "Ígéret ≠ Eredmény",
    desc: "Ígéret, program és eredmény három külön kategória.",
  },
  {
    num: "08",
    title: "Mindenkire ugyanaz",
    desc: "Ha a Fideszre mérjük, a Tiszára is mérjük. Ugyanaz a módszertan.",
  },
  {
    num: "09",
    title: "Open source",
    desc: "Nyílt kód, nyílt adat. Bárki ellenőrizheti, bárki építhet rá.",
  },
  {
    num: "10",
    title: "Hibázunk is",
    desc: "A bias elismerése csökkenti a bias-t. Transzparens korrekciók.",
  },
];

const sources = [
  {
    name: "Eurostat",
    url: "https://ec.europa.eu/eurostat",
    datasets: ["nama_10_pc (GDP/fő)", "demo_mlexpec (Várható élettartam)", "gov_10dd_edpt1 (Államadósság)"],
  },
  {
    name: "Transparency International",
    url: "https://www.transparency.org/cpi",
    datasets: ["Corruption Perceptions Index (CPI)"],
  },
  {
    name: "KSH",
    url: "https://www.ksh.hu",
    datasets: ["Reálbér index", "Foglalkoztatottság", "Fogyasztói árindex"],
  },
  {
    name: "European Commission",
    url: "https://ec.europa.eu",
    datasets: ["EU források allokációja", "Helyreállítási Alap státusz"],
  },
  {
    name: "OECD",
    url: "https://data.oecd.org",
    datasets: ["PISA eredmények", "Egészségügyi kiadások"],
  },
];

const Methodology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-20">
        <div className="container-wide">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Transzparencia
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Módszertan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Hogyan gyűjtjük, elemezzük és mutatjuk be az adatokat.
            Minden döntésünk nyilvános és ellenőrizhető.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="font-serif text-2xl mb-8">10 alapelv</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div key={p.num} className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                <span className="font-mono text-primary text-sm">{p.num}</span>
                <div>
                  <h3 className="font-medium mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="font-serif text-2xl mb-4">Adatforrások</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Kizárólag hivatalos, ellenőrizhető forrásokat használunk.
            Másodlagos források (média, elemzők) jelölve vannak.
          </p>
          <div className="space-y-4">
            {sources.map((source) => (
              <div key={source.name} className="p-6 bg-card border border-border rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{source.name}</h3>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {source.url.replace("https://", "")}
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {source.datasets.map((ds) => (
                    <span key={ds} className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
                      {ds}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we measure */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="font-serif text-2xl mb-4">Hogyan mérünk</h2>
          <div className="prose prose-invert max-w-2xl">
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-foreground font-medium mb-2">Bázisév: 2010</h3>
                <p className="text-sm">
                  Minden idősor 2010-től indul, a Fidesz kormányra kerülésétől.
                  Ahol releváns, korábbi adatokat is megmutatunk kontextusként.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-2">Benchmark: V4 + EU</h3>
                <p className="text-sm">
                  Magyar adatot mindig a V4 országokhoz (Lengyelország, Csehország, Szlovákia)
                  és/vagy az EU átlaghoz hasonlítjuk. A szám önmagában értelmezhetetlen.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-2">Külső sokkok jelölése</h3>
                <p className="text-sm">
                  COVID-19 (2020-21), energiaválság (2022), orosz-ukrán háború hatásai
                  külön jelölve vannak a grafikonokon.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-2">Célteljesülés számítása</h3>
                <p className="text-sm">
                  A NER pilléreknél a "teljesülési arány" a kormány saját, kimondott
                  céljaihoz viszonyított eredményt mutatja - nem a mi értékelésünket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="font-serif text-2xl mb-4">Nyílt forráskód, nyílt adat</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            A platform teljes kódbázisa és az összes adat nyilvánosan elérhető.
            Bárki ellenőrizheti, bárki építhet rá.
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Adatok letöltése</h3>
            <DataExport />
            <p className="text-xs text-muted-foreground mt-2">
              V4 országok összehasonlító adatai (GDP, államadósság, várható élettartam) — Eurostat forrásból.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Forráskód</h3>
            <a
              href="https://github.com/pereczja/hungary-outcomes-watch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <span className="font-mono text-sm">→ GitHub Repository</span>
            </a>
          </div>
        </div>
      </section>

      {/* Corrections */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="font-serif text-2xl mb-4">Korrekciók</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Ha hibát találsz, jelezd. Minden javítást dokumentálunk.
          </p>
          <div className="p-6 bg-card border border-border rounded-xl">
            <p className="text-sm text-muted-foreground italic">
              Még nem volt korrekció. Ha hibát találsz, nyiss egy GitHub issue-t.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="font-serif text-2xl mb-4">Készítők</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Ez egy First Principle Club projekt. Nem pártpolitikai kezdeményezés.
          </p>
          <div className="p-6 bg-card border border-border rounded-xl">
            <p className="text-sm text-muted-foreground">
              Ha kérdésed van a módszertanról vagy szeretnél hozzájárulni,
              keress minket a GitHub-on vagy írj a contact@buildhungary.hu címre.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Methodology;
