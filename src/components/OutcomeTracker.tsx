import { useMemo, useState } from 'react';
import { INITIATIVES, PROMISES, type Initiative, type InitiativeStatus, type PromiseItem, type PromiseStatus } from '@/data/nerOutcomes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const initiativeStatusLabel: Record<InitiativeStatus, string> = {
  success: 'Sikeres',
  mixed: 'Vegyes',
  lagging: 'Lemarad',
};

const initiativeStatusClass: Record<InitiativeStatus, string> = {
  success: 'bg-success text-success-foreground',
  mixed: 'bg-info text-info-foreground',
  lagging: 'bg-destructive text-destructive-foreground',
};

const promiseStatusLabel: Record<PromiseStatus, string> = {
  fulfilled: 'Teljesítve',
  in_progress: 'Folyamatban',
  stalled: 'Csúszik',
  unknown: 'Nincs információ',
};

const promiseStatusClass: Record<PromiseStatus, string> = {
  fulfilled: 'bg-success text-success-foreground',
  in_progress: 'bg-info text-info-foreground',
  stalled: 'bg-warning text-warning-foreground',
  unknown: 'bg-muted text-foreground',
};

export const OutcomeTracker = () => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'initiatives' | 'promises'>('initiatives');

  const filteredInitiatives = useMemo(() => {
    const q = query.toLowerCase();
    return INITIATIVES.filter((i) =>
      i.title.toLowerCase().includes(q) ||
      i.goal.toLowerCase().includes(q) ||
      i.actions.toLowerCase().includes(q) ||
      i.assessment.toLowerCase().includes(q) ||
      i.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredPromises = useMemo(() => {
    const q = query.toLowerCase();
    return PROMISES.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.actor.toLowerCase().includes(q) ||
      (p.deadline?.toLowerCase().includes(q) ?? false)
    );
  }, [query]);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">NER Outcomes – Top 12 és ígéretek</h2>
          <p className="text-sm text-muted-foreground">Áttekintés a fő kezdeményezésekről és 2022+ ígéretekről.</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Keresés: cím, cél, kategória, címke, határidő"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-72"
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="flex w-full flex-wrap gap-2">
          <TabsTrigger value="initiatives" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Top 12 kezdeményezés</TabsTrigger>
          <TabsTrigger value="promises" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Ígéretek (OV 2022+)</TabsTrigger>
        </TabsList>

        <TabsContent value="initiatives" className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInitiatives.map((i) => (
              <Card key={i.id} className="transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-safe:animate-enter">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{i.title}</CardTitle>
                      <CardDescription className="text-xs">{i.tags.join(' • ')}</CardDescription>
                    </div>
                    <Badge className={initiativeStatusClass[i.status]}>{initiativeStatusLabel[i.status]}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Sikerpont</span>
                      <span>{i.successScore}%</span>
                    </div>
                    <Progress value={i.successScore} aria-label={`Sikerpont ${i.successScore}%`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Cél:</span> {i.goal}</p>
                    <p className="text-sm"><span className="font-medium">Eszközök:</span> {i.actions}</p>
                    <p className="text-xs text-muted-foreground"><span className="font-medium">Értékelés:</span> {i.assessment}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="promises" className="mt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[6%]">Szereplő</TableHead>
                  <TableHead className="w-[34%]">Ígéret</TableHead>
                  <TableHead className="w-[10%]">Dátum</TableHead>
                  <TableHead className="w-[14%]">Kategória</TableHead>
                  <TableHead className="w-[10%]">Konkrétság</TableHead>
                  <TableHead className="w-[10%]">Határidő</TableHead>
                  <TableHead className="w-[10%]">Státusz</TableHead>
                  <TableHead className="w-[6%]"/>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromises.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell><Badge variant="outline">{p.actor}</Badge></TableCell>
                    <TableCell>
                      <div className="font-medium">{p.title}</div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-xs">{p.category}</TableCell>
                    <TableCell className="text-xs">{p.specificity}/5</TableCell>
                    <TableCell className="text-xs">{p.deadline ? new Date(p.deadline).toLocaleDateString() : '—'}</TableCell>
                    <TableCell><Badge className={promiseStatusClass[p.status]}>{promiseStatusLabel[p.status]}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-wrap justify-end gap-1">
                        {p.sources.map((s) => (
                          <Badge key={s.url} variant="outline" className="px-2 py-1">
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="story-link inline-flex items-center gap-1" aria-label={`Forrás megnyitása: ${s.label}`}>
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span className="text-[10px]">{s.label}</span>
                            </a>
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default OutcomeTracker;
