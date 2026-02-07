# Hungary Outcomes Watch - PRD

## Projekt összefoglaló

**Cél:** Objektív, adatvezérelt platform ahol az átlag szavazópolgár össze tudja hasonlítani a Fidesz 2010 óta elért eredményeit és a 2026-os választási ígéreteket (Fidesz vs Tisza Párt).

**Target audience:** Edukált, bizonytalan szavazók akik tényekre kíváncsiak, nem véleményekre.

**Deadline:** 2026 tavasz (választások előtt 2-4 héttel live)

**Megközelítés:** "Numbers, not narrative" - adatok beszéljenek, ne mi.

---

## Jelenlegi állapot (Lovable MVP)

### Ami van:
- React + Vite + TypeScript + Tailwind stack
- 5 fő oldal (dashboard, outcomes, competitiveness, promises, ov-2022)
- Live Eurostat API integráció (7 chart)
- Statikus adatok TypeScript fájlokban
- Alapvető UI és keresés

### Ami hiányzik az MVP-ből:
- Backend / adatbázis
- Admin felület
- Automatikus adatfrissítés
- Source verification workflow
- Mobile optimalizáció finomhangolás
- SEO / social sharing

---

## MVP Scope (v1.0 - Választásokig)

### P0 - Must Have

#### 1. Tartalom struktúra
```
├── Főoldal (landing + key metrics)
├── Eredmények (2010-2025)
│   ├── Gazdaság
│   │   ├── GDP per capita (vs V4)
│   │   ├── Infláció
│   │   ├── Államadósság
│   │   └── Reálbér
│   ├── Társadalom
│   │   ├── Egészségügy (várható élettartam, várólisták)
│   │   ├── Oktatás (PISA, tanárbérek)
│   │   └── Demográfia (születési ráta, kivándorlás)
│   ├── Korrupció & Jogállamiság
│   │   ├── CPI index
│   │   ├── EU források befagyasztva
│   │   └── Rule of Law index
│   └── Infrastruktúra
│       ├── Autópályák
│       └── Digitalizáció
├── Ígéretek 2026
│   ├── Fidesz programpontok
│   ├── Tisza Párt programpontok
│   └── Összehasonlító táblázat
└── Források (methodology)
```

#### 2. Adatforrások bekötése

| Terület | Forrás | API/Scrape | Prioritás |
|---------|--------|------------|-----------|
| GDP, foglalkoztatás, infláció | Eurostat | API (van) | P0 |
| Államadósság | Eurostat | API | P0 |
| Korrupció (CPI) | Transparency International | Scrape/manual | P0 |
| PISA scores | OECD | Manual (3 évente) | P0 |
| Várható élettartam | Eurostat | API (van) | P0 |
| EU források státusz | EC Cohesion Data | API | P0 |
| Tanárbérek | Eurydice | Scrape | P1 |
| Kivándorlás | Eurostat | API | P1 |
| Reálbér index | KSH | Scrape | P1 |

#### 3. Tech stack döntések

**Option A - Statikus (Recommended for deadline)**
- Adatok: JSON fájlok a repoban
- Update: GitHub Actions cron job → scrape → PR
- Review: Manuális PR approval
- Hosting: Vercel/Netlify (free tier)
- Előny: Egyszerű, gyors, nincs backend költség
- Hátrány: Nem real-time, manuális review bottleneck

**Option B - Headless CMS**
- Adatok: Sanity.io / Strapi
- Update: Webhook triggers
- Review: CMS-ben
- Hosting: Vercel + managed CMS
- Előny: Könnyebb content management
- Hátrány: Komplexebb setup, költség

**Javaslat:** Option A a választásokig, utána Option B ha folytatjuk.

#### 4. UI/UX prioritások
- [ ] Mobile-first responsive
- [ ] Dark mode (már van alapja)
- [ ] Social sharing cards (OG images)
- [ ] Print-friendly view (fontos!)
- [ ] Accessibility (WCAG 2.1 AA)

### P1 - Should Have
- Detailed methodology page
- Source citation tooltips minden adatpontnál
- Történelmi kontextus (2002-2010 referencia)
- Newsletter signup
- "Utoljára frissítve" timestamps

### P2 - Nice to Have (Post-election)
- Szavazás/poll funkció
- Vibe check ("Mit gondolsz erről?")
- Komment szekció
- User-submitted corrections
- Email alerts on data updates

---

## Adatmodell (v1.0)

### Metric (idősor adat)
```typescript
interface Metric {
  id: string;
  title: string;
  titleHu: string;
  category: 'economy' | 'society' | 'governance' | 'infrastructure';
  unit: string;
  source: {
    name: string;
    url: string;
    lastUpdated: string; // ISO date
    updateFrequency: 'daily' | 'monthly' | 'quarterly' | 'yearly';
  };
  methodology?: string;
  data: {
    year: number;
    hungary: number;
    poland?: number;
    slovakia?: number;
    romania?: number;
    euAverage?: number;
  }[];
}
```

### Promise (ígéret)
```typescript
interface Promise {
  id: string;
  party: 'fidesz' | 'tisza';
  category: string;
  title: string;
  description: string;
  source: {
    label: string;
    url: string;
    date: string;
  };
  status: 'not-started' | 'in-progress' | 'achieved' | 'broken' | 'modified';
  relatedMetrics?: string[]; // Metric IDs
  lastVerified: string;
}
```

### Outcome (eredmény értékelés)
```typescript
interface Outcome {
  id: string;
  title: string;
  category: string;
  status: 'success' | 'mixed' | 'failure';
  summary: string;
  details: string;
  metrics: string[]; // Related metric IDs
  sources: { label: string; url: string }[];
  lastUpdated: string;
}
```

---

## Roadmap

### Fázis 1: Adatgyűjtés & Struktúra (2 hét)
- [ ] Véglegesíteni a metric listát (max 15-20)
- [ ] Eurostat API-k bekötése (ami még hiányzik)
- [ ] Transparency International CPI scraper
- [ ] OECD PISA data import
- [ ] JSON schema és validation

### Fázis 2: Content & Copy (2 hét)
- [ ] Fidesz 2026 program feldolgozása
- [ ] Tisza Párt program feldolgozása
- [ ] Ígéretek összepárosítása témakörönként
- [ ] Methodology page megírása
- [ ] Magyar nyelvű UI copy

### Fázis 3: UI Polish (2 hét)
- [ ] Mobile responsive finomhangolás
- [ ] Chart komponensek egységesítése
- [ ] Social sharing (OG images)
- [ ] Loading states, error handling
- [ ] Print stylesheet

### Fázis 4: Launch Prep (1 hét)
- [ ] Domain setup
- [ ] Analytics (privacy-friendly: Plausible/Umami)
- [ ] Soft launch → feedback
- [ ] Bug fixes
- [ ] Hard launch

---

## Kockázatok

| Kockázat | Valószínűség | Impact | Mitigáció |
|----------|--------------|--------|-----------|
| Adatok nem elérhetők | Közepes | Magas | Backup manual sources |
| Politikai támadás | Magas | Közepes | Strict methodology, minden forrás publikus |
| Nem lesz kész időre | Közepes | Magas | Scope cut: csak P0 features |
| Scraperek eltörnek | Közepes | Közepes | Fallback manual update + alerts |

---

## Végleges Metric Lista (16 mutató)

### GAZDASÁG (6 mutató)

| # | Mutató | HU 2024 | Összehasonlítás | Forrás | Eurostat kód |
|---|--------|---------|-----------------|--------|--------------|
| 1 | GDP/fő (EUR, PPP) | ~€18,500 | V4 + EU átlag | Eurostat | nama_10_pc |
| 2 | Reálbér növekedés (2014-2024) | +70% | V4 | KSH/IZA | - |
| 3 | Infláció (éves átlag) | 2023: 17.1%, 2024: ~4% | EU | Eurostat | prc_hicp_aind |
| 4 | Államadósság/GDP | 73.5% | V4 (HU legmagasabb) | ECB/Eurostat | gov_10dd_edpt1 |
| 5 | Költségvetési hiány/GDP | 5.0% | EU | EC | - |
| 6 | Lakossági fogyasztás (index) | - | V4 + EU | Eurostat | nama_10_co3_p3 |

### TÁRSADALOM (5 mutató)

| # | Mutató | HU 2024 | Összehasonlítás | Forrás | Eurostat kód |
|---|--------|---------|-----------------|--------|--------------|
| 7 | Várható élettartam | 76 év | EU: 81 év | Eurostat/WHO | demo_mlexpec |
| 8 | Egészségügyi kiadás/GDP | 6.2% | EU: 10.4% | OECD | - |
| 9 | PISA pontszám (matek) | 473 | OECD: 472, PL: 489 | OECD | - |
| 10 | Születési ráta | 9.1/1000 | V4 | Eurostat | demo_gind |
| 11 | Kivándorlás/brain drain | 700k+ külföldön | V4 | Eurostat | - |

### KORRUPCIÓ & JOGÁLLAMISÁG (3 mutató)

| # | Mutató | HU 2024 | Összehasonlítás | Forrás |
|---|--------|---------|-----------------|--------|
| 12 | CPI index | 41/100 | EU utolsó | Transparency International |
| 13 | EU források befagyasztva | €19 Mrd (€1 Mrd elveszett) | - | EC |
| 14 | Freedom House score | 66/100 "partly free" | V4 | Freedom House |

### INFRASTRUKTÚRA & INNOVÁCIÓ (2 mutató)

| # | Mutató | HU 2024 | Összehasonlítás | Forrás | Eurostat kód |
|---|--------|---------|-----------------|--------|--------------|
| 15 | K+F kiadás/GDP | 1.4% | V4 + EU | Eurostat | rd_e_gerdtot |
| 16 | Digitális infrastruktúra (FTTH) | ~60% | EU | EC Digital Decade | - |

---

## Tisza Párt Program Összefoglaló

**Forrás:** [magyartisza.hu](https://magyartisza.hu), beszédek, interjúk, sajtóanyagok

> **Fontos:** Nincs egységes, letölthető programdokumentum. Az alábbiak Magyar Péter nyilvános kommunikációjából vannak összerakva.

### Egészségügy
- Minimum +500 Mrd Ft/év az állami egészségügybe
- Önálló Egészségügyi Minisztérium létrehozása
- Várólisták "radikális csökkentése"
- 2035-ig minden régióban XXI. századi "szuperkórház"
- Teljesítményvolumen-korlát eltörlése

### Oktatás
- Önálló Oktatási Minisztérium
- Klebelsberg Központ megszüntetése
- Új nemzeti alaptanterv
- Cél: 2035-re Közép-Európa élvonala
- Egyetemi autonómia visszaállítása, Erasmus visszahozása

### Adózás
- ÁFA 5%-ra alapvető élelmiszerekre
- Egyszámjegyű SZJA (többkulcsos rendszer)
- Vagyonnövekedési adó 10 Mrd Ft felett
- KATA visszaállítása korábbi formában

### Vállalkozások
- Adómentesség új és hazatérő vállalkozásoknak
- Bürokráciacsökkentés
- Startup és K+F támogatás

### Korrupció & EU
- Csatlakozás az Európai Ügyészséghez (EPPO)
- EU források "hazahozása"
- Vagyonnyilatkozat-ellenőrzés top tisztviselőknek
- Korrupcióellenes intézkedések elfogadása

### Egyéb
- Állami bérlakás-építési program
- Propaganda "több száz milliárdos" támogatásának megszüntetése
- Családi pótlék megduplázása

---

## Döntések (2025-01-21)

| Kérdés | Döntés |
|--------|--------|
| Brand | BuildHungary marad |
| Reviewer | Pereczes János (egyedül) |
| Bajnok | Pereczes János |
| Metric lista | 16 mutató (fent) |

---

## Open Questions (még nyitott)

1. **Domain?** buildhungary.hu / buildhungary.app / más?
2. **Legal disclaimer?** Kell-e "nem párt, nem kampány" szöveg?
3. **Fidesz 2026 program?** Van-e már publikus?

---

## Next Steps

1. ~~Metric lista véglegesítése~~ ✅
2. ~~Tisza program kutatás~~ ✅
3. Eurostat API-k bekötése a hiányzó mutatókhoz
4. Tisza vs Fidesz ígéret-összehasonlító táblázat
5. UI/adatstruktúra refactor
