export const StatsRow = () => {
  const stats = [
    { value: "+70%", label: "Realber novekedes (2014-24)", direction: "↑" },
    { value: "41/100", label: "Korrupcios index (CPI)", direction: "↓" },
    { value: "76 ev", label: "Varhato elettartam", direction: "→" },
    { value: "19 Mrd €", label: "EU forras befagyasztva", direction: "—" },
  ];

  return (
    <div className="container-wide">
      <div className="flex flex-wrap justify-center gap-16 py-12 border-t border-b border-border">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-mono text-4xl font-medium mb-2 text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="font-mono text-primary">{stat.direction}</span>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
