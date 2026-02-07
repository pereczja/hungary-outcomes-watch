import { cn } from "@/lib/utils";

interface ProgramRow {
  topic: string;
  topicDetail: string;
  fidesz: {
    text: string;
    status: "implemented" | "in_progress" | "planned" | "no_plan";
    source?: string;
  };
  tisza: {
    text: string;
    status: "implemented" | "in_progress" | "planned" | "no_plan";
    source?: string;
  };
}

// Programok - hivatalos dokumentumokból
// "no_plan" = nincs hivatalos vállalás a témában
const programs: ProgramRow[] = [
  {
    topic: "Egeszsegugy",
    topicDetail: "Koltsegvetes, varolistak",
    fidesz: {
      text: "Korhazmodernizacios program folytatasa, kapacitasbovites",
      status: "in_progress",
      source: "Kormanyprogram 2022",
    },
    tisza: {
      text: "+500 Mrd Ft/ev, 2035-ig szuperkorhaz minden regioban",
      status: "planned",
      source: "Magyar Peter nyilatkozatai",
    },
  },
  {
    topic: "SZJA",
    topicDetail: "Szemelyi jovedelemado",
    fidesz: {
      text: "15%-os flat tax fenntartasa",
      status: "implemented",
      source: "SZJA torveny",
    },
    tisza: {
      text: "Egyszamjegyu SZJA, tobbkulcsos rendszer",
      status: "planned",
      source: "Tisza Part kommunikacio",
    },
  },
  {
    topic: "Europai Ugyeszseg",
    topicDetail: "EPPO csatlakozas",
    fidesz: {
      text: "Nem tervezi a csatlakozast",
      status: "no_plan",
      source: "Kormany allaspontja",
    },
    tisza: {
      text: "Azonnali csatlakozas, EU forrasok visszahozasa",
      status: "planned",
      source: "Tisza Part program",
    },
  },
  {
    topic: "Oktatas",
    topicDetail: "Iranyitas, autonomia",
    fidesz: {
      text: "Jelenlegi rendszer (Belugyminiszterium alatt)",
      status: "implemented",
      source: "Hatalyos jogszabalyok",
    },
    tisza: {
      text: "Onallo miniszterium, Klebelsberg megszuntetese",
      status: "planned",
      source: "Tisza Part program",
    },
  },
  {
    topic: "Alapelelmiszer AFA",
    topicDetail: "AFA csokkentes",
    fidesz: {
      text: "Celzott intezkedesek",
      status: "planned",
      source: "Kormany bejelentesek",
    },
    tisza: {
      text: "5%-ra csokkentes (gyumolcs, zoldseg)",
      status: "planned",
      source: "Tisza Part kommunikacio",
    },
  },
];

// Semleges státusz címkék - nem értékeljük, hogy jó vagy rossz
const StatusTag = ({ status }: { status: ProgramRow["fidesz"]["status"] }) => {
  const config = {
    implemented: { label: "Megvalosult", className: "bg-secondary text-foreground" },
    in_progress: { label: "Folyamatban", className: "bg-secondary text-muted-foreground" },
    planned: { label: "Tervezett", className: "bg-secondary text-muted-foreground" },
    no_plan: { label: "Nincs vallalasa", className: "bg-secondary text-muted-foreground italic" },
  };

  const { label, className } = config[status];

  return (
    <span className={cn("inline-block text-xs font-medium px-2 py-1 rounded mt-2", className)}>
      {label}
    </span>
  );
};

export const PromiseComparison = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-1/4">
              Tema
            </th>
            <th className="text-left p-4 text-xs font-semibold uppercase tracking-wide w-[37.5%] text-orange-400">
              Fidesz
            </th>
            <th className="text-left p-4 text-xs font-semibold uppercase tracking-wide w-[37.5%] text-blue-400">
              Tisza Part
            </th>
          </tr>
        </thead>
        <tbody>
          {programs.map((row) => (
            <tr key={row.topic} className="border-b border-border">
              <td className="p-5 align-top">
                <div className="font-medium">{row.topic}</div>
                <div className="text-xs text-muted-foreground mt-1">{row.topicDetail}</div>
              </td>
              <td className="p-5 align-top">
                <div className="text-sm text-muted-foreground leading-relaxed">{row.fidesz.text}</div>
                <div className="flex items-center gap-2 mt-2">
                  <StatusTag status={row.fidesz.status} />
                </div>
                {row.fidesz.source && (
                  <div className="text-xs text-muted-foreground mt-2 italic">
                    Forrás: {row.fidesz.source}
                  </div>
                )}
              </td>
              <td className="p-5 align-top">
                <div className="text-sm text-muted-foreground leading-relaxed">{row.tisza.text}</div>
                <div className="flex items-center gap-2 mt-2">
                  <StatusTag status={row.tisza.status} />
                </div>
                {row.tisza.source && (
                  <div className="text-xs text-muted-foreground mt-2 italic">
                    Forrás: {row.tisza.source}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
