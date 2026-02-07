# BuildHungary Design Principles

## 1. Igazság > Narratíva
**Princip:** Ami mérhető, azt mérjük. Ami nem mérhető, azt nem állítjuk.

- Nem azt vizsgáljuk, mit mondtak, hanem mi történt
- Nem véleményeket gyűjtünk, hanem adatokat
- Ha egy ígéretet nem lehet objektíven mérni → jelöljük, hogy "nem mérhető"

**Példa:** "Jobb lesz az élet" - ez nem mérhető. De: "10%-kal emelkednek a reálbérek" - ez mérhető.

## 2. Kontextus Nélkül Nincs Értelmezés
**Princip:** Magyar adatot csak regionális/nemzetközi kontextusban mutatunk.

- GDP nőtt 2%? Ez jó vagy rossz? → Lengyelország 4%-ot nőtt ugyanakkor
- A szám önmagában értelmezhetetlen
- Mindig kell benchmark: V4 átlag, EU27, hasonló fejlettségű országok

**Következmény:** Minden grafikonon van összehasonlító vonal.

## 3. Forrás = Létezés
**Princip:** Ami nincs forrásolva, az nem létezik a platformon.

- Minden adat mellé: honnan jön, mikor frissült, ki publikálta
- Preferencia: hivatalos források (Eurostat, KSH, Világbank, OECD)
- Másodlagos források (média, elemzők) → jelölve mint "nem hivatalos"

**Következmény:** Methodology oldal kötelező, nem opcionális.

## 4. Nem Interpretálunk, Csak Mutatunk
**Princip:** A platform nem mondja meg, mi a "jó" vagy "rossz".

- Nincs "piros = rossz, zöld = jó" színkódolás véleményekre
- A user dönt, mi számít neki
- Objektív irányok: "nőtt/csökkent" - de nem "javult/romlott"

**Kivétel:** Nemzetközi indexeknél (korrupció, demokrácia, sajtószabadság) az index maga definiálja az irányt.

## 5. Összetettség Elrejtése, Egyszerűség Mutatása
**Princip:** Az átlag szavazó 30 másodperc alatt értse meg.

- Komplex adatok → egyszerű vizualizációk
- Részletek elérhetők, de nem kötelezők
- "One number summary" ahol lehet (pl. "Magyarország GDP/fő a lengyel 87%-a volt 2010-ben, most 72%")

**Következmény:** Layered information - headline → chart → detail → raw data

## 6. Időben Értelmezünk
**Princip:** Egy pillanatfelvétel nem elég. A trend számít.

- 2010 = bázisév (Fidesz hatalomba kerülése)
- Idősor: mi volt előtte, mi történt azóta
- Külső sokkok jelölése: COVID, energiaválság, háború

**Következmény:** Minden chart idősor, nem pie chart.

## 7. Ígéret ≠ Program ≠ Eredmény
**Princip:** Három különböző dolgot mérünk, nem keverhetők.

| Fogalom | Definíció | Példa |
|---------|-----------|-------|
| Ígéret | Konkrét kijelentés, amit egy politikus tett | "2030-ra utolérjük az osztrák béreket" |
| Program | Hivatalos dokumentumban rögzített vállalás | Választási program, 5 pontos terv |
| Eredmény | Mérhető tény, ami történt | GDP/fő 2024-ben: X € |

**Következmény:** A UI-ban ezek külön szekciók, nem keverednek.

## 8. Politikai Függetlenség = Mindenkire Ugyanaz
**Princip:** Ha a Fideszre mérjük, a Tiszára is mérjük. És fordítva.

- Ugyanazok a KPI-k mindenkire
- Ugyanaz a módszertan
- Ha egy párt programjában nincs adat egy témáról → jelölve: "nincs vállalás"

**Következmény:** A kritika nem az, hogy mit mondunk - hanem hogy miért nem mondunk mást is.

## 9. Nyílt Kód, Nyílt Adat
**Princip:** A platform maga is transzparens.

- Open source kódbázis (GitHub)
- Raw data letölthető (CSV, JSON)
- API harmadik feleknek
- Contribution welcome (PR-ek, data corrections)

**Következmény:** Bárki ellenőrizheti, bárki építhet rá.

## 10. Nem Vagyunk Tökéletesek - És Ezt Mondjuk
**Princip:** A bias elismerése csökkenti a bias-t.

- "Ez egy kísérlet az objektív összehasonlításra"
- "Ha hibát találsz, jelezd"
- "A készítők: [nevek] - ismerd meg a hátteret"
- Corrections log: mit javítottunk és miért

**Következmény:** Hitelesség > tökéletesség.

---

## Összefoglalva

| # | Princip | Egy mondatban |
|---|---------|---------------|
| 1 | Igazság > Narratíva | Mérünk, nem véleményezünk |
| 2 | Kontextus kötelező | Magyar adat csak régióhoz képest |
| 3 | Forrás = Létezés | Nincs forrás, nincs adat |
| 4 | Nem interpretálunk | A user dönt, mi a fontos |
| 5 | Egyszerűség | 30 mp alatt érthető |
| 6 | Idősor | Trend, nem pillanatfelvétel |
| 7 | Ígéret ≠ Eredmény | Három külön kategória |
| 8 | Mindenkire ugyanaz | Nincs kivétel |
| 9 | Open source | Ellenőrizhető, építhető |
| 10 | Hibázunk is | Transzparens korrekciók |
