import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ov2022Items, type OVItem, type OVItemStatus, type OVItemType } from '@/data/ov2022';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const statusClass: Record<OVItemStatus, string> = {
  'folyamatban': 'bg-info text-info-foreground',
  'teljesítve': 'bg-success text-success-foreground',
  'nincs-információ': 'bg-muted text-foreground',
};

const tipusClass: Record<OVItemType, string> = {
  'ígéret': 'bg-primary/10 text-primary',
  'befagyasztás': 'bg-destructive/10 text-destructive',
  'folytatjuk': 'bg-secondary text-secondary-foreground',
};

const OV2022Page = () => {
  const [query, setQuery] = useState('');
  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return ov2022Items.filter((i) =>
      i.tema.toLowerCase().includes(q) ||
      i.tetel.toLowerCase().includes(q) ||
      i.tipus.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <SEO
        title="OV 2022 utáni ígéretek és döntések | BuildHungary"
        description="OV: 2022 utáni nagyobb ígéretek, befagyasztások és folytatjuk-tételek – programbeszédek és kormányzati oldalak alapján."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/promises/ov-2022' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-3xl font-bold">OV: 2022 utáni nagyobb ígéretek/befagyasztások/„folytatjuk”</h1>
          <p className="mb-6 max-w-3xl text-muted-foreground">Aktuális kormányzati ciklus – programbeszédek és kormányzati oldalak alapján összegyűjtve. A tételek nem teljes körűek és folyamatosan bővülnek.</p>

          <div className="mb-6 flex flex-wrap gap-3">
            <Button asChild size="sm" variant="outline"><Link to="/promises">Vissza az ígéretfigyelőhöz</Link></Button>
          </div>

          <div className="mb-4 flex items-center justify-between gap-3">
            <Input
              placeholder="Keresés: téma, tétel, típus"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-80"
            />
          </div>

          <article className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[12%]">Típus</TableHead>
                  <TableHead className="w-[18%]">Téma</TableHead>
                  <TableHead className="w-[40%]">Tétel</TableHead>
                  <TableHead className="w-[12%]">Dátum</TableHead>
                  <TableHead className="w-[10%]">Státusz</TableHead>
                  <TableHead className="w-[8%] text-right">Forrás</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r: OVItem) => (
                  <TableRow key={r.id} className="motion-safe:animate-fade-in-up">
                    <TableCell>
                      <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${tipusClass[r.tipus]}`}>{r.tipus}</span>
                    </TableCell>
                    <TableCell className="font-medium">{r.tema}</TableCell>
                    <TableCell className="text-muted-foreground">{r.tetel}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(r.datum).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={statusClass[r.status]}>{r.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <a className="story-link text-xs" href={r.forrasUrl} target="_blank" rel="noreferrer">{r.forrasCim}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </article>

          <aside className="mt-4 text-xs text-muted-foreground">Megjegyzés: Az oldal célja az átláthatóság. Kérjük, jelezd, ha pontosításra, bővítésre szorul.</aside>
        </section>
      </main>
    </>
  );
};

export default OV2022Page;
