// Tisza Párt 2026 Program - "A működő és emberséges Magyarország alapjai"
// Forrás: https://cdn.tisza.work/A%20m%C5%B1k%C3%B6d%C5%91%20%C3%A9s%20embers%C3%A9ges%20Magyarorsz%C3%A1g%20alapjai.pdf

export type TiszaItemStatus = 'vállalás' | 'azonnali' | 'hosszú-távú';
export type TiszaPillar = 'gazdasag' | 'biztonsag' | 'tarsadalom' | 'kornyezet';

export interface TiszaItem {
  id: string;
  pillar: TiszaPillar;
  category: string;
  title: string;
  description: string;
  status: TiszaItemStatus;
  metrics?: string;
  page?: number;
}

export const pillarInfo: Record<TiszaPillar, { name: string; subtitle: string; color: string }> = {
  gazdasag: {
    name: '1. Gazdag és sikeres ország',
    subtitle: 'Fejlődés és növekedés',
    color: 'bg-blue-500',
  },
  biztonsag: {
    name: '2. Békés és rendezett ország',
    subtitle: 'Biztonság és stabilitás',
    color: 'bg-green-500',
  },
  tarsadalom: {
    name: '3. Szabad és boldog ország',
    subtitle: 'Társadalmi jólét és jóllét',
    color: 'bg-purple-500',
  },
  kornyezet: {
    name: '4. Tiszta és haladó ország',
    subtitle: 'Fenntarthatóság és jövőállóság',
    color: 'bg-emerald-500',
  },
};

export const tisza2026Items: TiszaItem[] = [
  // === PILLÉR 1: GAZDASÁG ===
  // 1.1 Ganz Ábrahám Gazdaságfejlesztési Program
  {
    id: 't-1',
    pillar: 'gazdasag',
    category: '1.1 Ganz Ábrahám Program',
    title: 'Uniós források hazahozatala',
    description: 'Hazahozzuk a befagyasztott 8000 milliárd forintnyi uniós forrást, és a magyar vállalatok versenyképességét fokozó programokra fordítjuk.',
    status: 'azonnali',
    metrics: '8000 Mrd Ft',
    page: 37,
  },
  {
    id: 't-2',
    pillar: 'gazdasag',
    category: '1.1 Ganz Ábrahám Program',
    title: 'KKV-k támogatása',
    description: 'Adókedvezményekkel, célzott pályázatokkal, vissza nem térítendő támogatásokkal segítjük a hazai kkv-k fejlődését és külföldi piacra lépését.',
    status: 'vállalás',
    page: 37,
  },
  {
    id: 't-3',
    pillar: 'gazdasag',
    category: '1.1 Ganz Ábrahám Program',
    title: 'Adminisztráció felezése',
    description: 'Megfelezzük a vállalkozások adminisztrációs terheit. 277 óráról 140 órára csökkentjük az adóügyi adminisztrációval töltött időt.',
    status: 'vállalás',
    metrics: '50% csökkentés',
    page: 37,
  },
  {
    id: 't-4',
    pillar: 'gazdasag',
    category: '1.1 Ganz Ábrahám Program',
    title: 'Innováció másfélszerezése',
    description: 'Négy év alatt legalább másfélszeresére emeljük az innovációra fordított forrásokat. Cél: 2030-ra K+F kiadás a GDP 2%-a.',
    status: 'vállalás',
    metrics: '1.5x K+F',
    page: 37,
  },
  {
    id: 't-5',
    pillar: 'gazdasag',
    category: '1.1 Ganz Ábrahám Program',
    title: 'Vendégmunkás-stop',
    description: '2026. június 1-től felfüggesztjük az Európán kívüli vendégmunkások behozatalát, a munkaerőpiacról kiszorult magyarokat segítjük.',
    status: 'azonnali',
    metrics: '2026.06.01',
    page: 37,
  },
  {
    id: 't-6',
    pillar: 'gazdasag',
    category: '1.1 Ganz Ábrahám Program',
    title: 'Vállalati rezsi csökkentése',
    description: 'Jelentősen csökkentjük a vállalkozások által fizetendő rezsiköltségeket és az európai átlaghoz közelítjük az energiaárakat.',
    status: 'vállalás',
    page: 37,
  },

  // 1.2 Adócsökkentés+
  {
    id: 't-10',
    pillar: 'gazdasag',
    category: '1.2 Adócsökkentés+',
    title: 'Minimálbér adójának csökkentése',
    description: '15 százalékról 9 százalékra csökkentjük a minimálbér után fizetendő személyi jövedelemadót.',
    status: 'vállalás',
    metrics: '15% → 9%',
    page: 54,
  },
  {
    id: 't-11',
    pillar: 'gazdasag',
    category: '1.2 Adócsökkentés+',
    title: 'Mediánbér alattiak adócsökkentése',
    description: 'A mediánbér alatt kereső 2,2 millió munkavállalónak csökkentjük az adóterheit.',
    status: 'vállalás',
    metrics: '2.2M fő',
    page: 54,
  },
  {
    id: 't-12',
    pillar: 'gazdasag',
    category: '1.2 Adócsökkentés+',
    title: 'Milliárdosok vagyonadója',
    description: 'Egymilliárd forint feletti vagyonokra bevezetjük az 1%-os vagyonadót.',
    status: 'vállalás',
    metrics: '1% / 1Mrd+ Ft',
    page: 54,
  },
  {
    id: 't-13',
    pillar: 'gazdasag',
    category: '1.2 Adócsökkentés+',
    title: 'Gyógyszer ÁFA nullázása',
    description: 'A vényköteles gyógyszerek áfáját 0%-ra csökkentjük.',
    status: 'vállalás',
    metrics: 'ÁFA 0%',
    page: 54,
  },
  {
    id: 't-14',
    pillar: 'gazdasag',
    category: '1.2 Adócsökkentés+',
    title: 'Tűzifa ÁFA csökkentése',
    description: 'A tűzifa áfáját 5%-ra csökkentjük, a szociális tűzifakeretet megduplázzuk.',
    status: 'vállalás',
    metrics: 'ÁFA 5%',
    page: 67,
  },

  // 1.3 Stabil költségvetés
  {
    id: 't-20',
    pillar: 'gazdasag',
    category: '1.3 Stabil költségvetés',
    title: 'Euró bevezetése',
    description: 'Kitűzünk egy belátható, megvalósítható céldátumot az euró bevezetésére, és fenntartható költségvetéssel megvalósítjuk a csatlakozást.',
    status: 'hosszú-távú',
    page: 57,
  },
  {
    id: 't-21',
    pillar: 'gazdasag',
    category: '1.3 Stabil költségvetés',
    title: 'Korrupció felszámolása',
    description: 'Zéró tolerancia a korrupcióval szemben. A korrupció teljes társadalmi költsége eléri a GDP 4-8%-át, ezt felszámoljuk.',
    status: 'azonnali',
    metrics: 'GDP 4-8% megtakarítás',
    page: 57,
  },
  {
    id: 't-22',
    pillar: 'gazdasag',
    category: '1.3 Stabil költségvetés',
    title: 'Vagyonvisszaszerzés',
    description: 'Felállítjuk a Nemzeti Vagyonvisszaszerzési és Védelmi Hivatalt az ellopott közvagyon visszaszerzésére.',
    status: 'azonnali',
    page: 57,
  },

  // 1.4 Rezsicsökkentés+
  {
    id: 't-30',
    pillar: 'gazdasag',
    category: '1.4 Rezsicsökkentés+',
    title: 'Rezsivédelem kiterjesztése',
    description: 'Megőrizzük és szociális alapon kiterjesztjük a rezsicsökkentést, hogy senki ne fázzon télen.',
    status: 'vállalás',
    page: 67,
  },
  {
    id: 't-31',
    pillar: 'gazdasag',
    category: '1.4 Rezsicsökkentés+',
    title: 'Lakásfelújítás program',
    description: 'Évente 100 ezer lakás energetikai korszerűsítése a Családi Otthonfelújítási Program keretében.',
    status: 'vállalás',
    metrics: '100.000 lakás/év',
    page: 67,
  },

  // 1.5 Infrastruktúra
  {
    id: 't-40',
    pillar: 'gazdasag',
    category: '1.5 Infrastruktúra',
    title: 'Vasút modernizáció',
    description: 'A magyar vasút modernizációját nemzeti üggyé emeljük. Korszerű járművekkel egész napos, óránkénti InterCity-közlekedést biztosítunk.',
    status: 'hosszú-távú',
    page: 72,
  },
  {
    id: 't-41',
    pillar: 'gazdasag',
    category: '1.5 Infrastruktúra',
    title: 'M9 megvalósítása',
    description: 'Prioritásként kezeljük a déli gyorsforgalmi körgyűrű, az M9-es megvalósítását.',
    status: 'hosszú-távú',
    page: 72,
  },
  {
    id: 't-42',
    pillar: 'gazdasag',
    category: '1.5 Infrastruktúra',
    title: 'Útdíjak csökkentése',
    description: 'Felülvizsgáljuk és csökkentjük az útdíjakat, bevezetjük a profitplafont a koncessziós szerződésekben.',
    status: 'vállalás',
    page: 72,
  },

  // 1.6 Wekerle Sándor Bérlakás Program
  {
    id: 't-50',
    pillar: 'gazdasag',
    category: '1.6 Wekerle Program',
    title: 'Bérlakás építési program',
    description: 'Megfizethető és elérhető lakhatást biztosítunk mindenkinek. Célunk, hogy az évtized végére senki ne lakjon komfort nélküli ingatlanban.',
    status: 'hosszú-távú',
    metrics: '300.000 fő',
    page: 86,
  },

  // === PILLÉR 2: BIZTONSÁG ===
  // 2.1 Biztonságos Magyarország
  {
    id: 't-60',
    pillar: 'biztonsag',
    category: '2.1 Erős határok',
    title: 'Határvédelem fenntartása',
    description: 'A határkerítés továbbra is állni fog, további védelmi intézkedésekkel erősítjük az ország és az Unió határainak védelmét.',
    status: 'vállalás',
    page: 92,
  },
  {
    id: 't-61',
    pillar: 'biztonsag',
    category: '2.1 Erős határok',
    title: 'Nincs kötelező kvóta',
    description: 'Nem engedünk Nyugat-Európából illegális bevándorlókat áttelepíteni hazánkba.',
    status: 'vállalás',
    page: 92,
  },

  // 2.2 Rend és közbiztonság
  {
    id: 't-70',
    pillar: 'biztonsag',
    category: '2.2 Közbiztonság',
    title: 'Bűncselekmények csökkentése',
    description: 'Helyreállítjuk a közrendet: 150 ezer alá csökkentjük a regisztrált bűnesetek számát (jelenleg 230 ezer felett).',
    status: 'vállalás',
    metrics: '230K → 150K',
    page: 96,
  },
  {
    id: 't-71',
    pillar: 'biztonsag',
    category: '2.2 Közbiztonság',
    title: 'Rendőri jelenlét mindenhol',
    description: 'Biztosítjuk a rendőri jelenlétet minden településen, tisztességes bért és modern felszerelést biztosítunk.',
    status: 'vállalás',
    page: 96,
  },

  // 2.4 Szuverén nemzet
  {
    id: 't-80',
    pillar: 'biztonsag',
    category: '2.4 Szuverén nemzet',
    title: 'NATO és EU szövetség',
    description: 'Hazánk újra hasznos, hiteles, megbecsült, aktív és konstruktív tagja lesz az Európai Uniónak és a NATO-nak.',
    status: 'vállalás',
    page: 104,
  },
  {
    id: 't-81',
    pillar: 'biztonsag',
    category: '2.4 Szuverén nemzet',
    title: 'Nincs sorkatonaság',
    description: 'Magyarországon a jövőben sem lesz sorkatonaság, nem küldünk magyar katonákat háborúba.',
    status: 'vállalás',
    page: 104,
  },

  // 2.6 Tisztességes Magyarország
  {
    id: 't-90',
    pillar: 'biztonsag',
    category: '2.6 Jogállam',
    title: 'Jogállam helyreállítása',
    description: 'Helyreállítjuk a fékek és ellensúlyok rendszerét, az önkény helyett a közérdeket állítjuk középpontba.',
    status: 'azonnali',
    page: 114,
  },
  {
    id: 't-91',
    pillar: 'biztonsag',
    category: '2.6 Jogállam',
    title: 'Ügynökakták megnyitása',
    description: 'Megnyitjuk az ügynökaktákat és nyilvánosságra hozzuk a 2010-2026 közötti kormányülések összefoglalóit.',
    status: 'azonnali',
    page: 114,
  },

  // 2.7 Bibó István Program
  {
    id: 't-100',
    pillar: 'biztonsag',
    category: '2.7 Bibó István Program',
    title: 'Független közmédia',
    description: 'Megszüntetjük a politikai propagandát, visszaállítjuk a közmédia szabadságát és pártpolitikától való függetlenségét.',
    status: 'azonnali',
    page: 118,
  },
  {
    id: 't-101',
    pillar: 'biztonsag',
    category: '2.7 Bibó István Program',
    title: 'Európai Ügyészség csatlakozás',
    description: 'Csatlakozunk az Európai Ügyészséghez a korrupció elleni hatékonyabb fellépés érdekében.',
    status: 'azonnali',
    page: 118,
  },

  // 2.8 Működő állam
  {
    id: 't-110',
    pillar: 'biztonsag',
    category: '2.8 Önkormányzatok',
    title: 'Önkormányzati hatáskörök visszaadása',
    description: 'Visszaadjuk az önkormányzatok elvett hatásköreit és intézményeit, biztosítjuk a fenntartáshoz szükséges forrásokat.',
    status: 'vállalás',
    page: 125,
  },

  // === PILLÉR 3: TÁRSADALOM ===
  // 3.1 Hugonnai Vilma Egészségügyi Program
  {
    id: 't-120',
    pillar: 'tarsadalom',
    category: '3.1 Hugonnai Vilma Program',
    title: 'Egészségügyi kiadások emelése',
    description: 'Évente minimum 500 milliárd forinttal emeljük az egészségügyre fordított állami kiadásokat.',
    status: 'vállalás',
    metrics: '+500 Mrd Ft/év',
    page: 138,
  },
  {
    id: 't-121',
    pillar: 'tarsadalom',
    category: '3.1 Hugonnai Vilma Program',
    title: 'Várólisták csökkentése',
    description: 'Csökkentjük a várólistákat és az orvos- és ápolóhiányt. Ösztöndíjprogramokat indítunk a hiányszakmákban.',
    status: 'vállalás',
    page: 138,
  },
  {
    id: 't-122',
    pillar: 'tarsadalom',
    category: '3.1 Hugonnai Vilma Program',
    title: 'Háziorvosi praxisok betöltése',
    description: 'Megoldjuk a háziorvos-hiányt. Jelenleg 1010 praxis betöltetlen, 900 ezer magyarnak nincs saját háziorvosa.',
    status: 'hosszú-távú',
    metrics: '1010 praxis',
    page: 138,
  },

  // 3.2 Nyugdíjemelés+
  {
    id: 't-130',
    pillar: 'tarsadalom',
    category: '3.2 Nyugdíjemelés+',
    title: 'Nyugdíjak emelése',
    description: 'A nyugdíjak tisztes megélhetést biztosítanak. 800 ezer nyugdíjas él jelenleg a létminimum alatt.',
    status: 'vállalás',
    metrics: '800K fő',
    page: 149,
  },
  {
    id: 't-131',
    pillar: 'tarsadalom',
    category: '3.2 Nyugdíjemelés+',
    title: '13. havi nyugdíj megőrzése',
    description: 'Megtartjuk a 13. havi nyugdíjat és az egyéb nyugdíjas juttatásokat.',
    status: 'vállalás',
    page: 149,
  },

  // 3.3 Brunszvik Teréz Gyermekvédelmi Program
  {
    id: 't-140',
    pillar: 'tarsadalom',
    category: '3.3 Gyermekvédelem',
    title: 'Gyermekvédelmi vizsgálat',
    description: 'Felderítjük az elmúlt évtizedek gyermekvédelemmel kapcsolatos bűncselekményeit független vizsgálóbizottsággal.',
    status: 'azonnali',
    page: 152,
  },
  {
    id: 't-141',
    pillar: 'tarsadalom',
    category: '3.3 Gyermekvédelem',
    title: 'Gyermekszegénység csökkentése',
    description: '400 ezer gyermek él szegénységben és társadalmi kirekesztettségben - ezt felszámoljuk.',
    status: 'hosszú-távú',
    metrics: '400K gyermek',
    page: 152,
  },

  // 3.4 100% Család Program
  {
    id: 't-150',
    pillar: 'tarsadalom',
    category: '3.4 Családpolitika',
    title: 'Családtámogatások megőrzése',
    description: 'Gondtalan fejlődést biztosítunk a gyermekeknek, megtartjuk és kibővítjük a jelenlegi családtámogatási rendszert.',
    status: 'vállalás',
    page: 159,
  },

  // 3.5 Oktatás
  {
    id: 't-160',
    pillar: 'tarsadalom',
    category: '3.5 Oktatás',
    title: 'Pedagógus béremelés',
    description: 'A pedagógusokat megbecsüljük, óraterhelésüket csökkentjük, partnernek tekintjük őket.',
    status: 'vállalás',
    page: 165,
  },
  {
    id: 't-161',
    pillar: 'tarsadalom',
    category: '3.5 Oktatás',
    title: 'Klebelsberg Központ átalakítása',
    description: 'Radikálisan átalakítjuk a Klebelsberg Központ működését, az iskolaigazgatók érdemi munkáltatói jogosítványokat kapnak.',
    status: 'azonnali',
    page: 165,
  },
  {
    id: 't-162',
    pillar: 'tarsadalom',
    category: '3.5 Oktatás',
    title: 'Oktatási miniszter vétójoga',
    description: 'Az oktatási, egészségügyi, igazságügyi és pénzügyminiszter vétójogot kap a kormányzati döntéshozatalban.',
    status: 'azonnali',
    page: 165,
  },

  // === PILLÉR 4: KÖRNYEZET ===
  // 4.1 Zöld Magyarország
  {
    id: 't-170',
    pillar: 'kornyezet',
    category: '4.1 Zöld Magyarország',
    title: 'Levegőtisztaság',
    description: 'A légszennyezés miatt évente 13 ezer ember hal meg idő előtt - ezt drasztikusan csökkentjük.',
    status: 'hosszú-távú',
    metrics: '13K haláleset/év',
    page: 205,
  },
  {
    id: 't-171',
    pillar: 'kornyezet',
    category: '4.1 Zöld Magyarország',
    title: 'Akkumulátorgyárak felülvizsgálata',
    description: 'Felülvizsgáljuk a környezetszennyező akkumulátorgyárak engedélyeit és működését.',
    status: 'azonnali',
    page: 205,
  },
  {
    id: 't-172',
    pillar: 'kornyezet',
    category: '4.1 Zöld Magyarország',
    title: 'Fosszilis energia csökkentése',
    description: 'Csökkentjük a fosszilis energia felhasználását, közel karbonsemleges energiafelhasználást célzunk.',
    status: 'hosszú-távú',
    page: 205,
  },

  // 4.2 Agrár
  {
    id: 't-180',
    pillar: 'kornyezet',
    category: '4.2 Agrár',
    title: 'Hazai élelmiszeripar erősítése',
    description: 'Erős hazai agrár- és élelmiszeripari láncokat építünk magas hozzáadott értékkel.',
    status: 'hosszú-távú',
    page: 218,
  },

  // 4.4 Szent István Vidékfejlesztési Program
  {
    id: 't-190',
    pillar: 'kornyezet',
    category: '4.4 Vidékfejlesztés',
    title: 'Leszakadó térségek felzárkóztatása',
    description: 'Nem lesznek leszakadó térségek, kiüresedő falvak, magukra hagyott idősek.',
    status: 'hosszú-távú',
    page: 228,
  },

  // 4.5 Jövőállóság
  {
    id: 't-200',
    pillar: 'kornyezet',
    category: '4.5 Jövőállóság',
    title: 'AI és innováció',
    description: 'A mesterséges intelligencia, robotika, tiszta energia nem veszélyt, hanem lehetőséget jelent. Felkészülünk a technológiai forradalomra.',
    status: 'hosszú-távú',
    page: 233,
  },
];

// Full program text for AI chat
export const tiszaProgramFullText = `
A MŰKÖDŐ ÉS EMBERSÉGES MAGYARORSZÁG ALAPJAI - TISZA PÁRT 2026

ALAPVETŐ ÉRTÉKEK:
- Béke, biztonság és stabilitás
- Tudás és egészség
- Hazaszeretet és hagyománytisztelet
- Teljesítmény és tisztességes verseny
- Társadalmi összetartozás és szolidaritás
- Nemzeti szuverenitás
- Átláthatóság és elszámoltathatóság
- Méltányosság és igazságosság
- Esélyteremtés és esélyegyenlőség
- Fenntarthatóság és hosszú távú szemlélet
- Felelősségmegosztás és részvételiség
- Elfogadás, tisztelet és szabadság

4 FŐ PILLÉR:

1. GAZDAG ÉS SIKERES ORSZÁG – Fejlődés és növekedés
   - Ganz Ábrahám Gazdaságfejlesztési Program: uniós források hazahozatala (8000 Mrd Ft), KKV támogatás, adminisztráció felezése, innováció másfélszerezése
   - Adócsökkentés+: minimálbér adója 15%→9%, gyógyszer ÁFA 0%, vagyonadó 1Mrd+ felett 1%
   - Stabil költségvetés: euró bevezetése, korrupció felszámolása, vagyonvisszaszerzés
   - Rezsicsökkentés+: szociális rezsivédelem, 100.000 lakás/év felújítása
   - Infrastruktúra: vasút modernizáció, M9, útdíjcsökkentés
   - Wekerle Sándor Bérlakás Program: megfizethető lakhatás mindenkinek

2. BÉKÉS ÉS RENDEZETT ORSZÁG – Biztonság és stabilitás
   - Erős határok: határvédelem fenntartása, nincs kötelező kvóta
   - Közbiztonság: bűncselekmények 230K→150K alá, rendőri jelenlét mindenhol
   - Szuverén nemzet: NATO és EU szövetség erősítése, nincs sorkatonaság
   - Jogállam: fékek és ellensúlyok helyreállítása, ügynökakták megnyitása
   - Bibó István Program: független közmédia, Európai Ügyészség csatlakozás
   - Erős önkormányzatok: hatáskörök visszaadása

3. SZABAD ÉS BOLDOG ORSZÁG – Társadalmi jólét és jóllét
   - Hugonnai Vilma Egészségügyi Program: +500 Mrd Ft/év, várólisták csökkentése, háziorvos-hiány megoldása
   - Nyugdíjemelés+: 800K nyugdíjas a létminimum felett, 13. havi nyugdíj megőrzése
   - Brunszvik Teréz Gyermekvédelmi Program: bűncselekmények feltárása, 400K gyermek szegénységből kiemelése
   - 100% Család Program: családtámogatások megőrzése és bővítése
   - Oktatás: pedagógus béremelés, Klebelsberg Központ átalakítása, miniszteri vétójog

4. TISZTA ÉS HALADÓ ORSZÁG – Fenntarthatóság és jövőállóság
   - Zöld Magyarország: levegőtisztaság (13K haláleset csökkentése), akkumulátorgyárak felülvizsgálata
   - Erős agrár- és élelmiszeripar
   - Szent István Vidékfejlesztési Program: leszakadó térségek felzárkóztatása
   - Jövőállóság: AI és innováció, technológiai forradalom

AZONNALI INTÉZKEDÉSEK (első 100 nap):
- Uniós források hazahozatala
- Korrupció elleni zéró tolerancia
- Vagyonvisszaszerzési Hivatal felállítása
- Közmédia felfüggesztése és újraindítása
- Ügynökakták megnyitása
- Európai Ügyészséghez csatlakozás
- Vendégmunkás-stop 2026.06.01-től
- Gyermekvédelmi vizsgálat indítása
- Klebelsberg Központ átalakítása

KÖLTSÉGVETÉSI MOZGÁSTÉR (évi 3400-4300 Mrd Ft):
- Korrupció felszámolása: több ezer milliárd
- Kamatmegtakarítás: 150-1000 Mrd Ft/év
- Uniós források: 8000 Mrd befagyasztott + 2000 Mrd/év új ciklus
- Vagyonadó: több száz milliárd
- Gazdasági növekedés: 400-450 Mrd Ft / 1% GDP
`;
