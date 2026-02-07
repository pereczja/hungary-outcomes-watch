import { useState, useMemo } from 'react';
import { policyAreas, parties, type PolicyArea, type PartyId } from '@/data/programs2026';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp, Heart, GraduationCap, Globe, Shield, Home,
  Users, Zap, Newspaper, Scale, Leaf, Search, ExternalLink,
  AlertCircle, CheckCircle, Clock, HelpCircle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Heart, GraduationCap, Globe, Shield, Home,
  Users, Zap, Newspaper, Scale, Leaf,
};

const statusConfig = {
  'announced': { label: 'Bejelentve', color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400', icon: AlertCircle },
  'detailed': { label: 'Részletes', color: 'bg-green-500/20 text-green-700 dark:text-green-400', icon: CheckCircle },
  'in-government': { label: 'Kormányon', color: 'bg-blue-500/20 text-blue-700 dark:text-blue-400', icon: CheckCircle },
  'track-record': { label: 'Van előzmény', color: 'bg-purple-500/20 text-purple-700 dark:text-purple-400', icon: Clock },
  'pending': { label: 'Várakozás', color: 'bg-gray-500/20 text-gray-600 dark:text-gray-400', icon: HelpCircle },
};

const partyColors: Record<PartyId, string> = {
  fidesz: 'border-l-orange-500',
  tisza: 'border-l-blue-500',
};

interface PolicyCardProps {
  area: PolicyArea;
  expandedId: string | null;
  onToggle: (id: string) => void;
}

const PolicyCard = ({ area, expandedId, onToggle }: PolicyCardProps) => {
  const IconComponent = iconMap[area.icon] || Globe;
  const isExpanded = expandedId === area.id;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader
        className="cursor-pointer pb-3"
        onClick={() => onToggle(area.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{area.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{area.description}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(area.lastUpdated).toLocaleDateString('hu-HU')}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {parties.map((party) => {
            const position = area.positions[party.id];
            const StatusIcon = statusConfig[position.status].icon;

            return (
              <div
                key={party.id}
                className={`rounded-lg border-l-4 bg-muted/30 p-4 ${partyColors[party.id]}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{party.shortName}</span>
                  <Badge className={statusConfig[position.status].color}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusConfig[position.status].label}
                  </Badge>
                </div>

                <p className="text-sm text-foreground">
                  {position.summary}
                </p>

                {isExpanded && position.details && (
                  <div className="mt-3 space-y-2 border-t pt-3">
                    <p className="text-sm text-muted-foreground">
                      {position.details}
                    </p>

                    {position.trackRecord && (
                      <div className="rounded bg-muted/50 p-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Előzmények:
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {position.trackRecord}
                        </p>
                      </div>
                    )}

                    {position.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {position.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {source.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isExpanded && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => onToggle(area.id)}
          >
            Részletek
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export const ProgramComparison = () => {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [view, setView] = useState<'cards' | 'table'>('cards');

  const filtered = useMemo(() => {
    if (!query) return policyAreas;
    const q = query.toLowerCase();
    return policyAreas.filter(
      (area) =>
        area.name.toLowerCase().includes(q) ||
        area.description.toLowerCase().includes(q) ||
        area.positions.fidesz.summary.toLowerCase().includes(q) ||
        area.positions.tisza.summary.toLowerCase().includes(q)
    );
  }, [query]);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Stats
  const fideszDetailed = policyAreas.filter(
    (p) => p.positions.fidesz.status !== 'pending'
  ).length;
  const tiszaPending = policyAreas.filter(
    (p) => p.positions.tisza.status === 'pending'
  ).length;

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">2026-os Választási Programok</h1>
        <p className="mt-2 text-muted-foreground">
          Fidesz–KDNP és Tisza Párt programjainak összehasonlítása tématerületek szerint.
          Tényalapú, elfogulatlan áttekintés.
        </p>
      </div>

      {/* Status Banner */}
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-medium text-green-900 dark:text-green-100">
              Tisza program megjelent!
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              A Tisza Párt 2026. február 7-én bemutatta 240 oldalas „Működő és emberséges Magyarország alapjai" című programját.{' '}
              <a
                href="https://magyartisza.hu/program"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-900 dark:hover:text-green-100"
              >
                Teljes program →
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{policyAreas.length}</div>
            <div className="text-xs text-muted-foreground">Tématerület</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{fideszDetailed}</div>
            <div className="text-xs text-muted-foreground">Fidesz pozíció</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {policyAreas.length - tiszaPending}
            </div>
            <div className="text-xs text-muted-foreground">Tisza pozíció</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-500">{tiszaPending}</div>
            <div className="text-xs text-muted-foreground">Várakozik</div>
          </CardContent>
        </Card>
      </div>

      {/* Search & View Toggle */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Keresés témában..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as 'cards' | 'table')}>
          <TabsList>
            <TabsTrigger value="cards">Kártyák</TabsTrigger>
            <TabsTrigger value="table">Táblázat</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Cards View */}
      {view === 'cards' && (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((area) => (
            <PolicyCard
              key={area.id}
              area={area}
              expandedId={expandedId}
              onToggle={toggleExpanded}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-medium">Tématerület</th>
                <th className="p-4 text-left font-medium">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-orange-500" />
                    Fidesz
                  </span>
                </th>
                <th className="p-4 text-left font-medium">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-500" />
                    Tisza
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((area) => (
                <tr key={area.id} className="border-t">
                  <td className="p-4">
                    <div className="font-medium">{area.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {area.description}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="mb-1">
                      <Badge className={statusConfig[area.positions.fidesz.status].color}>
                        {statusConfig[area.positions.fidesz.status].label}
                      </Badge>
                    </div>
                    <p className="text-sm">{area.positions.fidesz.summary}</p>
                  </td>
                  <td className="p-4">
                    <div className="mb-1">
                      <Badge className={statusConfig[area.positions.tisza.status].color}>
                        {statusConfig[area.positions.tisza.status].label}
                      </Badge>
                    </div>
                    <p className="text-sm">{area.positions.tisza.summary}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            Nincs találat a keresésre: "{query}"
          </p>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-8 rounded-lg bg-muted/30 p-4 text-center text-sm text-muted-foreground">
        <p>
          Ez az oldal kizárólag tájékoztatási célokat szolgál. Nem vagyunk semmilyen párttal kapcsolatban.
          Az adatok nyilvános forrásokból származnak.
        </p>
        <p className="mt-1">
          Utolsó frissítés: {new Date().toLocaleDateString('hu-HU')}
        </p>
      </div>
    </section>
  );
};

export default ProgramComparison;
