import { useMemo, useState } from 'react';
import { outcomes as data, type Outcome, type OutcomeStatus } from '@/data/outcomes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';

const statusLabel: Record<OutcomeStatus, string> = {
  'achieved': 'Achieved',
  'in-progress': 'In Progress',
  'stalled': 'Stalled',
  'not-achieved': 'Not Achieved',
};

const statusClass: Record<OutcomeStatus, string> = {
  'achieved': 'bg-success text-success-foreground',
  'in-progress': 'bg-info text-info-foreground',
  'stalled': 'bg-warning text-warning-foreground',
  'not-achieved': 'bg-destructive text-destructive-foreground',
};

export const OutcomeTracker = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | OutcomeStatus>('all');

  const filtered = useMemo(() => {
    return data.filter((o) => {
      const matchesQuery = !query || (
        o.title.toLowerCase().includes(query.toLowerCase()) ||
        o.category.toLowerCase().includes(query.toLowerCase())
      );
      const matchesStatus = status === 'all' ? true : o.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const counts = useMemo(() => {
    const base: Record<'all' | OutcomeStatus, number> = {
      all: data.length,
      'achieved': 0,
      'in-progress': 0,
      'stalled': 0,
      'not-achieved': 0,
    };
    for (const o of data) base[o.status]++;
    return base;
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Key Outcomes — NER's 15 Years</h2>
          <p className="text-sm text-muted-foreground">Explore outcomes across infrastructure, economy, education, health, and governance.</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search outcomes or categories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <Tabs value={status} onValueChange={(v) => setStatus(v as any)}>
        <TabsList className="flex w-full flex-wrap gap-2">
          {(['all','achieved','in-progress','stalled','not-achieved'] as const).map((key) => (
            <TabsTrigger key={key} value={key} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {key === 'all' ? 'All' : statusLabel[key as OutcomeStatus]} ({counts[key as 'all' | OutcomeStatus]})
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={status} className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((o) => (
              <Card key={o.id} className="transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{o.title}</CardTitle>
                      <CardDescription>{o.category}</CardDescription>
                    </div>
                    <Badge className={statusClass[o.status]}>{statusLabel[o.status]}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{o.metric}</span>
                    <span className="text-muted-foreground">Updated {new Date(o.lastUpdated).toLocaleDateString()}</span>
                  </div>

                  {o.evidence && o.evidence.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Evidence:</span>
                        {o.evidence.map((ev) => (
                          <Badge key={ev.url} variant="outline" className="px-2 py-1">
                            <a
                              href={ev.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1"
                              aria-label={`Open evidence: ${ev.label}`}
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span className="text-xs">{ev.label}</span>
                            </a>
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Verified: {new Date(Math.max(
                          ...o.evidence.map((ev) => new Date(ev.verifiedAt).getTime())
                        )).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default OutcomeTracker;
