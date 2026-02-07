import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { tisza2026Items, pillarInfo, type TiszaItem, type TiszaItemStatus, type TiszaPillar } from '@/data/tisza2026';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, FileText, ExternalLink } from 'lucide-react';

const statusClass: Record<TiszaItemStatus, string> = {
  'vállalás': 'bg-primary/10 text-primary',
  'azonnali': 'bg-success text-success-foreground',
  'hosszú-távú': 'bg-info text-info-foreground',
};

const statusLabel: Record<TiszaItemStatus, string> = {
  'vállalás': 'Vállalás',
  'azonnali': 'Azonnali',
  'hosszú-távú': 'Hosszú távú',
};

const Tisza2026Page = () => {
  const [query, setQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<TiszaPillar | 'all'>('all');

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return tisza2026Items
      .filter((i) => selectedPillar === 'all' || i.pillar === selectedPillar)
      .filter((i) =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      );
  }, [query, selectedPillar]);

  const stats = useMemo(() => {
    const total = tisza2026Items.length;
    const azonnali = tisza2026Items.filter(i => i.status === 'azonnali').length;
    const vallalasok = tisza2026Items.filter(i => i.status === 'vállalás').length;
    const hosszuTavu = tisza2026Items.filter(i => i.status === 'hosszú-távú').length;
    return { total, azonnali, vallalasok, hosszuTavu };
  }, []);

  return (
    <>
      <SEO
        title="Tisza Párt 2026 Program | BuildHungary"
        description="A működő és emberséges Magyarország alapjai - Tisza Párt választási program 2026. Részletes vállalások és ígéretek."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/tisza-2026' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Tisza Párt 2026</h1>
              <p className="max-w-3xl text-muted-foreground">
                „A működő és emberséges Magyarország alapjai" – A Tisza párt választási programja 2026-ra.
                Békés rendszerváltás, 4 pillér, {stats.total} konkrét vállalás.
              </p>
            </div>
            <a
              href="https://cdn.tisza.work/A%20m%C5%B1k%C3%B6d%C5%91%20%C3%A9s%20embers%C3%A9ges%20Magyarorsz%C3%A1g%20alapjai.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm hover:bg-accent"
            >
              <FileText className="h-4 w-4" />
              Eredeti PDF
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Összes vállalás</CardDescription>
                <CardTitle className="text-3xl">{stats.total}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
              <CardHeader className="pb-2">
                <CardDescription>Azonnali intézkedés</CardDescription>
                <CardTitle className="text-3xl text-green-600">{stats.azonnali}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
              <CardHeader className="pb-2">
                <CardDescription>Ciklus vállalások</CardDescription>
                <CardTitle className="text-3xl text-blue-600">{stats.vallalasok}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950">
              <CardHeader className="pb-2">
                <CardDescription>Hosszú távú célok</CardDescription>
                <CardTitle className="text-3xl text-purple-600">{stats.hosszuTavu}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Navigation */}
          <div className="mb-6 flex flex-wrap gap-3">
            <Button asChild size="sm" variant="outline">
              <Link to="/promises">Vissza az ígéretfigyelőhöz</Link>
            </Button>
            <Button asChild size="sm" variant="default">
              <Link to="/tisza-2026/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Beszélgess a programmal
              </Link>
            </Button>
          </div>

          {/* Pillar Tabs */}
          <Tabs value={selectedPillar} onValueChange={(v) => setSelectedPillar(v as TiszaPillar | 'all')} className="mb-6">
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">Mind ({tisza2026Items.length})</TabsTrigger>
              {(Object.entries(pillarInfo) as [TiszaPillar, typeof pillarInfo.gazdasag][]).map(([key, info]) => (
                <TabsTrigger key={key} value={key}>
                  <span className={`mr-2 h-2 w-2 rounded-full ${info.color}`} />
                  {info.name.split('.')[0]}. {info.subtitle}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Search */}
          <div className="mb-4 flex items-center gap-3">
            <Input
              placeholder="Keresés: téma, vállalás, kategória..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-md"
            />
            <span className="text-sm text-muted-foreground">{rows.length} találat</span>
          </div>

          {/* Table */}
          <article className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8%]">Státusz</TableHead>
                  <TableHead className="w-[20%]">Kategória</TableHead>
                  <TableHead className="w-[20%]">Vállalás</TableHead>
                  <TableHead className="w-[40%]">Leírás</TableHead>
                  <TableHead className="w-[12%]">Metrika</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r: TiszaItem) => (
                  <TableRow key={r.id} className="motion-safe:animate-fade-in-up">
                    <TableCell>
                      <Badge className={statusClass[r.status]}>{statusLabel[r.status]}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${pillarInfo[r.pillar].color}`} />
                        <span className="text-sm">{r.category}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{r.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.description}</TableCell>
                    <TableCell>
                      {r.metrics && (
                        <span className="rounded bg-muted px-2 py-1 text-xs font-mono">{r.metrics}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </article>

          {/* Pillars Overview */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {(Object.entries(pillarInfo) as [TiszaPillar, typeof pillarInfo.gazdasag][]).map(([key, info]) => {
              const pillarItems = tisza2026Items.filter(i => i.pillar === key);
              const categories = [...new Set(pillarItems.map(i => i.category))];
              return (
                <Card key={key}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${info.color}`} />
                      <CardTitle className="text-lg">{info.name}</CardTitle>
                    </div>
                    <CardDescription>{info.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{pillarItems.length} vállalás</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <aside className="mt-6 text-xs text-muted-foreground">
            Forrás: <a href="https://cdn.tisza.work/A%20m%C5%B1k%C3%B6d%C5%91%20%C3%A9s%20embers%C3%A9ges%20Magyarorsz%C3%A1g%20alapjai.pdf" target="_blank" rel="noreferrer" className="underline">A működő és emberséges Magyarország alapjai (PDF)</a>
            {' '}| Az oldal célja az átláthatóság és a program megismertetése.
          </aside>
        </section>
      </main>
    </>
  );
};

export default Tisza2026Page;
