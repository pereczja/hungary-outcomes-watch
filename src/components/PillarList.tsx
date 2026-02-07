import { Initiative } from "@/data/nerOutcomes";
import { cn } from "@/lib/utils";

interface PillarListProps {
  initiatives: Initiative[];
}

// Semleges státusz - nem értékeljük, hogy "sikeres" jó vagy rossz
// Csak megmutatjuk a kitűzött cél teljesülési arányát
const StatusBadge = ({ status }: { status: Initiative["status"] }) => {
  const config = {
    success: { label: "Cel teljesult", className: "bg-secondary text-foreground" },
    mixed: { label: "Reszben", className: "bg-secondary text-muted-foreground" },
    lagging: { label: "Elmaradt", className: "bg-secondary text-muted-foreground" },
  };

  const { label, className } = config[status];

  return (
    <span className={cn("text-xs font-medium px-2.5 py-1 rounded", className)}>
      {label}
    </span>
  );
};

const ScoreBar = ({ score }: { score: number }) => {
  // Semleges szín - a score csak a kitűzött cél teljesülését mutatja
  return (
    <div className="w-20 h-1 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${score}%` }}
      />
    </div>
  );
};

export const PillarList = ({ initiatives }: PillarListProps) => {
  const successCount = initiatives.filter((i) => i.status === "success").length;
  const mixedCount = initiatives.filter((i) => i.status === "mixed").length;
  const laggingCount = initiatives.filter((i) => i.status === "lagging").length;
  const avgScore = Math.round(
    initiatives.reduce((sum, i) => sum + i.successScore, 0) / initiatives.length
  );

  return (
    <>
      <div className="flex flex-col divide-y divide-border rounded-xl overflow-hidden border border-border">
        {initiatives.map((initiative, index) => (
          <div
            key={initiative.id}
            className="grid grid-cols-[48px_1fr_auto] gap-6 items-center p-6 bg-card hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className="font-mono text-sm text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-medium mb-1">{initiative.title}</h3>
              <p className="text-sm text-muted-foreground">{initiative.goal}</p>
            </div>
            <div className="flex items-center gap-3">
              <ScoreBar score={initiative.successScore} />
              <span className="font-mono text-sm text-muted-foreground min-w-[36px]">
                {initiative.successScore}%
              </span>
              <StatusBadge status={initiative.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="mt-12 p-8 bg-card border border-border rounded-xl">
        <h3 className="font-serif text-xl mb-4">Osszesites</h3>
        <p className="text-sm text-muted-foreground mb-6">
          A kituzott celok teljesulesi aranya a kormany sajat vallalasaihoz kepest.
        </p>
        <div className="flex gap-12">
          <div className="text-center">
            <div className="font-mono text-3xl font-medium text-foreground">{successCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Cel teljesult</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-medium text-foreground">{mixedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Reszben</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-medium text-foreground">{laggingCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Elmaradt</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-medium text-primary">{avgScore}%</div>
            <div className="text-xs text-muted-foreground mt-1">Atlag teljesules</div>
          </div>
        </div>
      </div>
    </>
  );
};
