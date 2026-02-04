import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ov2022Items, type OVItem, type OVItemStatus, type OVItemType } from '@/data/ov2022';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';

const statusClass: Record<OVItemStatus, string> = {
  'folyamatban': 'bg-info text-info-foreground',
  'teljesítve': 'bg-success text-success-foreground',
  'nincs-információ': 'bg-muted text-foreground',
  'csúszik': 'bg-warning text-warning-foreground',
  'nem-teljesült': 'bg-destructive text-destructive-foreground',
};

const statusLabel: Record<OVItemStatus, string> = {
  'folyamatban': 'Folyamatban',
  'teljesítve': 'Teljesítve',
  'nincs-információ': 'Nincs információ',
  'csúszik': 'Csúszik',
  'nem-teljesült': 'Nem teljesült',
};

const tipusClass: Record<OVItemType, string> = {
  'ígéret': 'bg-primary/10 text-primary',
  'befagyasztás': 'bg-destructive/10 text-destructive',
  'folytatjuk': 'bg-secondary text-secondary-foreground',
};

const tipusLabel: Record<OVItemType, string> = {
  'ígéret': 'Ígéret',
  'befagyasztás': 'Befagyasztás',
  'folytatjuk': 'Folytatjuk',
};

const OV2022Page = () => {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return ov2022Items.filter((i) =>
      i.tema.toLowerCase().includes(q) ||
      i.tetel.toLowerCase().includes(q) ||
      i.tipus.toLowerCase().includes(q) ||
      (i.megjegyzes?.toLowerCase().includes(q) ?? false)
    );
  }, [query]);

  // Stats
  const stats = {
    total: ov2022Items.length,
    folyamatban: ov2022Items.filter(i => i.status === 'folyamatban').length,
    teljesitve: ov2022Items.filter(i => i.status === 'teljesítve').length,
    csuszik: ov2022Items.filter(i => i.status === 'csúszik').length,
  };

  return (
    <>
      <SEO
        title="Kormány 2022+ | VálasztásFigyelő"
        description="A 2022 utáni Fidesz-kormány főbb ígéretei, befagyasztásai és folytatások – programbeszédek és kormányzati források alapján."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/kormany-2022' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">Kormány 2022+</h1>
            <p className="max-w-3xl text-muted-foreground">
              A 2022-es választás utáni kormányzati ciklus főbb ígéretei és intézkedései.
              Programbeszédek és kormányzati források alapján.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border bg-card p-3 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Összes tétel</div>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.folyamatban}</div>
              <div className="text-xs text-muted-foreground">Folyamatban</div>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.teljesitve}</div>
              <div className="text-xs text-muted-foreground">Teljesítve</div>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.csuszik}</div>
              <div className="text-xs text-muted-foreground">Csúszik</div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <Button asChild size="sm" variant="outline" className="gap-2">
              <Link to="/eredmenyek">
                <ArrowLeft className="h-4 w-4" />
                Eredmények
              </Link>
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link to="/programok">
                <FileText className="h-4 w-4" />
                2026 Programok
              </Link>
            </Button>
          </div>

          <div className="mb-4">
            <Input
              placeholder="Keresés: téma, tétel, típus, megjegyzés..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <article className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10%]">Típus</TableHead>
                  <TableHead className="w-[15%]">Téma</TableHead>
                  <TableHead className="w-[30%]">Tétel</TableHead>
                  <TableHead className="w-[10%]">Dátum</TableHead>
                  <TableHead className="w-[10%]">Státusz</TableHead>
                  <TableHead className="w-[18%]">Megjegyzés</TableHead>
                  <TableHead className="w-[7%] text-right">Forrás</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r: OVItem) => (
                  <TableRow key={r.id} className="motion-safe:animate-fade-in-up">
                    <TableCell>
                      <Badge variant="outline" className={tipusClass[r.tipus]}>
                        {tipusLabel[r.tipus]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{r.tema}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.tetel}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(r.datum).toLocaleDateString('hu-HU')}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusClass[r.status]}>
                        {statusLabel[r.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {r.megjegyzes ?? '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <a
                        href={r.forrasUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Forrás
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </article>

          <aside className="mt-4 rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium">Megjegyzés</p>
            <p className="mt-1">
              Ez az oldal a nyilvános kormányzati kommunikáció alapján készült összefoglaló.
              A tételek nem teljes körűek. Jelezd, ha pontosításra szorul.
            </p>
          </aside>
        </section>
      </main>
    </>
  );
};

export default OV2022Page;
