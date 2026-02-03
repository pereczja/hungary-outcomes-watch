# VálasztásFigyelő 🗳️

**Tényalapú, elfogulatlan választási összehasonlító platform a 2026-os magyar országgyűlési választásra.**

> Nem jobb, nem bal – tények.

## Mi ez?

A VálasztásFigyelő egy nyílt forráskódú platform, amely átláthatóan mutatja be:

- **2026-os választási programok** – Fidesz és Tisza párt programjainak tématerület szerinti összehasonlítása
- **Kormányzati eredmények (2010-2024)** – A Fidesz-kormányok 16 évének főbb kezdeményezései és értékelésük
- **Versenyképességi mutatók** – Magyarország összehasonlítása a V4 országokkal (Eurostat élő adatok)
- **Kormány 2022+** – Az aktuális kormányzati ciklus ígéretei és teljesítésük

## Alapelvek

- **Elfogulatlanság** – Nem vagyunk semmilyen párttal kapcsolatban. Minden oldalt ugyanazzal a mércével mérünk.
- **Forrásmegjelölés** – Minden állítás mögött ellenőrizhető forrás (EU, OECD, KSH, hivatalos dokumentumok).
- **Nyílt forráskód** – Bárki javasolhat javítást vagy új adatforrást.

## Gyors indítás

```bash
# Klónozás
git clone https://github.com/pereczja/hungary-outcomes-watch.git
cd hungary-outcomes-watch

# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev
```

Az alkalmazás elérhető: http://localhost:8080

## Struktúra

```
src/
├── data/
│   ├── programs2026.ts      # 2026-os párt programok (Fidesz, Tisza)
│   ├── nerOutcomes.ts       # NER 2010-2024 kezdeményezések
│   ├── ov2022.ts            # Kormány 2022+ ígéretek
│   └── competitiveness.ts   # Versenyképességi adatok
├── components/
│   ├── ProgramComparison.tsx # Program összehasonlító
│   ├── OutcomeTracker.tsx    # Eredmények tracker
│   └── Live*Chart.tsx        # Eurostat élő grafikonok
├── pages/
│   ├── Index.tsx            # Főoldal
│   ├── Programs.tsx         # /programok
│   ├── Outcomes.tsx         # /eredmenyek
│   ├── Competitiveness.tsx  # /versenyképesség
│   └── OV2022.tsx           # /kormany-2022
└── App.tsx                  # Router
```

## Tisza program integrálása (szombat)

A Tisza Párt hivatalos programja 2026. február 8-án kerül publikálásra.

**Gyors integráció:**

1. Nyisd meg: `src/data/programs2026.ts`
2. Keresd meg a `tisza` pozíciókat minden `policyAreas` elemben
3. Frissítsd a `summary`, `details`, és `sources` mezőket
4. Változtasd a `status`-t `'pending'`-ről `'detailed'`-re
5. `npm run build && git commit`

Alternatív: használd a `scripts/import-tisza-program.ts` segédscriptet.

## Tech stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite 5
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts + Eurostat API
- **State:** TanStack Query

## Közreműködés

Pull request-eket szívesen fogadunk! Különösen:

- Új adatforrások és források ellenőrzése
- UI/UX javítások
- Fordítások
- Hibák jelentése

## Licensz

MIT

---

**Fontos:** Ez az oldal kizárólag tájékoztatási célokat szolgál. Nem vagyunk semmilyen párttal vagy politikai szervezettel kapcsolatban.
