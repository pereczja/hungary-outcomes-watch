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
    tetel: 'Rezsicsökkentés politikájának fenntartása',
    datum: '2022-04-03',
    forrasCim: 'Kormányzati közlés',
    forrasUrl: 'https://kormany.hu',
    status: 'folyamatban',
  },
  {
    id: 'ov-2',
    tema: 'EU források',
    tipus: 'ígéret',
    tetel: 'Kohéziós és Helyreállítási Alapok elérhetőségének biztosítása',
    datum: '2023-01-01',
    forrasCim: 'Programbeszéd/közlés',
    forrasUrl: 'https://kormany.hu',
    status: 'folyamatban',
  },
  {
    id: 'ov-3',
    tema: 'Egészségügy',
    tipus: 'ígéret',
    tetel: 'Várólisták csökkentése és kórházfejlesztések',
    datum: '2023-05-10',
    forrasCim: 'Programbeszéd',
    forrasUrl: 'https://kormany.hu',
    status: 'folyamatban',
  },
  {
    id: 'ov-4',
    tema: 'Oktatás',
    tipus: 'befagyasztás',
    tetel: 'Bizonyos reformok halasztása/átütemezése',
    datum: '2024-02-20',
    forrasCim: 'Kormányzati tájékoztató',
    forrasUrl: 'https://kormany.hu',
    status: 'nincs-információ',
  },
  {
    id: 'ov-5',
    tema: 'Családpolitika',
    tipus: 'folytatjuk',
    tetel: 'Családtámogatási eszköztár működtetése',
    datum: '2022-12-15',
    forrasCim: 'Kormányzati oldal',
    forrasUrl: 'https://kormany.hu',
    status: 'folyamatban',
  },
];
