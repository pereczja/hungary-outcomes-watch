import { useMemo, useState } from 'react';
import { INITIATIVES, type InitiativeStatus } from '@/data/nerOutcomes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

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


export const OutcomeTracker = () => {
  const [query, setQuery] = useState('');
  

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


  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">NER Outcomes – Top 12</h2>
          <p className="text-sm text-muted-foreground">Áttekintés a fő kezdeményezésekről.</p>
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

      <div className="mt-6">
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
      </div>
    </section>
  );
};

export default OutcomeTracker;
