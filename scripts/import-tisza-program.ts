/**
 * Tisza Program Import Script
 *
 * Ez a script segíti a Tisza párt programjának gyors integrálását
 * a programs2026.ts fájlba.
 *
 * Használat:
 * 1. Töltsd ki a TISZA_PROGRAM objektumot a hivatalos program alapján
 * 2. Futtasd: npx ts-node scripts/import-tisza-program.ts
 * 3. A script frissíti a programs2026.ts fájlt
 *
 * Vagy manuálisan másold be az adatokat a programs2026.ts-be
 */

import * as fs from 'fs';
import * as path from 'path';

// ==================== TISZA PROGRAM ADATOK ====================
// Töltsd ki ezeket a mezőket a hivatalos program alapján!

interface TiszaPolicy {
  id: string;           // Meg kell egyeznie a programs2026.ts-ben lévő id-val
  summary: string;      // Rövid összefoglaló (1-2 mondat)
  details?: string;     // Részletes leírás (opcionális)
  sources: Array<{
    label: string;
    url: string;
    date: string;       // YYYY-MM-DD formátum
  }>;
}

const TISZA_PROGRAM: TiszaPolicy[] = [
  {
    id: 'economy-tax',
    summary: '// IDE ÍRD A TISZA GAZDASÁGI PROGRAMJÁT',
    details: undefined,
    sources: [
      { label: 'Tisza Program 2026', url: 'https://tiszapart.hu/program', date: '2026-02-08' }
    ]
  },
  {
    id: 'healthcare',
    summary: '// IDE ÍRD A TISZA EGÉSZSÉGÜGYI PROGRAMJÁT',
    sources: []
  },
  {
    id: 'education',
    summary: '// IDE ÍRD A TISZA OKTATÁSI PROGRAMJÁT',
    sources: []
  },
  {
    id: 'eu-relations',
    summary: '// IDE ÍRD A TISZA EU KAPCSOLATOK PROGRAMJÁT',
    sources: []
  },
  {
    id: 'corruption',
    summary: '// IDE ÍRD A TISZA KORRUPCIÓELLENES PROGRAMJÁT',
    sources: []
  },
  {
    id: 'housing',
    summary: '// IDE ÍRD A TISZA LAKHATÁSI PROGRAMJÁT',
    sources: []
  },
  {
    id: 'family',
    summary: '// IDE ÍRD A TISZA CSALÁDPOLITIKAI PROGRAMJÁT',
    sources: []
  },
  {
    id: 'energy',
    summary: '// IDE ÍRD A TISZA ENERGIA PROGRAMJÁT',
    sources: []
  },
  {
    id: 'media-freedom',
    summary: '// IDE ÍRD A TISZA SAJTÓSZABADSÁG PROGRAMJÁT',
    sources: []
  },
  {
    id: 'justice',
    summary: '// IDE ÍRD A TISZA IGAZSÁGSZOLGÁLTATÁS PROGRAMJÁT',
    sources: []
  },
  {
    id: 'defense',
    summary: '// IDE ÍRD A TISZA HONVÉDELMI PROGRAMJÁT',
    sources: []
  },
  {
    id: 'environment',
    summary: '// IDE ÍRD A TISZA KÖRNYEZETVÉDELMI PROGRAMJÁT',
    sources: []
  },
];

// ==================== SCRIPT LOGIKA ====================

function generateTiszaPositions(): string {
  const positions = TISZA_PROGRAM.map(policy => {
    const hasContent = !policy.summary.startsWith('//');

    return `    // ${policy.id}
    tisza: {
      summary: '${policy.summary.replace(/'/g, "\\'")}',
      ${policy.details ? `details: '${policy.details.replace(/'/g, "\\'")}',` : ''}
      status: '${hasContent ? 'detailed' : 'pending'}',
      sources: [${policy.sources.map(s => `
        { label: '${s.label}', url: '${s.url}', date: '${s.date}' }`).join(',')}
      ],
    },`;
  });

  return positions.join('\n\n');
}

function main() {
  console.log('=== Tisza Program Import ===\n');

  // Ellenőrzés: vannak-e kitöltött adatok?
  const filledPolicies = TISZA_PROGRAM.filter(p => !p.summary.startsWith('//'));

  if (filledPolicies.length === 0) {
    console.log('⚠️  Még nincsenek kitöltött adatok a TISZA_PROGRAM-ban.');
    console.log('   Nyisd meg ezt a fájlt és töltsd ki a summary mezőket a hivatalos program alapján.\n');
    console.log('Példa:');
    console.log(`
{
  id: 'economy-tax',
  summary: 'Progresszív adórendszer bevezetése, KATA visszaállítása, KKV támogatás.',
  details: 'Részletes leírás...',
  sources: [
    { label: 'Tisza Program', url: 'https://tiszapart.hu/program', date: '2026-02-08' }
  ]
}
`);
    return;
  }

  console.log(`✓ ${filledPolicies.length} tématerület kitöltve:\n`);
  filledPolicies.forEach(p => {
    console.log(`  - ${p.id}: ${p.summary.substring(0, 50)}...`);
  });

  console.log('\n--- Generált kód ---\n');
  console.log(generateTiszaPositions());

  console.log('\n--- Következő lépések ---');
  console.log('1. Másold be a fenti kódot a programs2026.ts megfelelő helyére');
  console.log('2. Cseréld le a "status: pending" részt "status: detailed"-re');
  console.log('3. Futtasd: npm run build');
  console.log('4. Commitold a változtatásokat');
}

main();
