import { promises as rows, type PromiseCompare, type PromiseStatus } from '@/data/promises';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { FileText, MessageCircle } from 'lucide-react';

const statusClass: Record<PromiseStatus, string> = {
  'achieved': 'bg-success text-success-foreground',
  'in-progress': 'bg-info text-info-foreground',
  'not-started': 'bg-muted text-foreground',
  'broken': 'bg-destructive text-destructive-foreground',
};

const StatusBadge = ({ status }: { status: PromiseStatus }) => (
  <Badge className={statusClass[status]}>{status.replace('-', ' ')}</Badge>
);

export const PromiseTracker = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return rows.filter((r) =>
      r.topic.toLowerCase().includes(query.toLowerCase()) ||
      r.orban.promise.toLowerCase().includes(query.toLowerCase()) ||
      r.magyar.promise.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Election Promise Tracker</h2>
          <p className="text-sm text-muted-foreground">Side-by-side comparison of commitments from Orbán Viktor and Magyar Péter.</p>
        </div>
        <Input
          placeholder="Search topics or promises"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-72"
        />
      </div>

      {/* Quick Links */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="outline" size="sm">
          <Link to="/promises/ov-2022">
            <FileText className="mr-2 h-4 w-4" />
            Kormány 2022
          </Link>
        </Button>
        <Button asChild variant="default" size="sm">
          <Link to="/tisza-2026">
            <FileText className="mr-2 h-4 w-4" />
            Tisza 2026 Program
          </Link>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <Link to="/tisza-2026/chat">
            <MessageCircle className="mr-2 h-4 w-4" />
            Beszélgess a Tisza programmal
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Policy Area</TableHead>
              <TableHead className="w-[35%]">Orbán Viktor</TableHead>
              <TableHead className="w-[35%]">Magyar Péter</TableHead>
              <TableHead className="w-[10%] text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id} className="motion-safe:animate-fade-in-up">
                <TableCell className="font-medium">{row.topic}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">{row.orban.promise}</span>
                    <StatusBadge status={row.orban.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">{row.magyar.promise}</span>
                    <StatusBadge status={row.magyar.status} />
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">{new Date(row.lastUpdated).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default PromiseTracker;
