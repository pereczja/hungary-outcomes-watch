import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

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
// Tisza: "A működő és emberséges Magyarország alapjai" (2026.02.08)
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
      text: "Hugonnai Vilma Program: +500 Mrd Ft/év, várólisták csökkentése, háziorvos-hiány megoldása",
      status: "planned",
      source: "Tisza program 138.o.",
    },
  },
  {
    topic: "SZJA",
    topicDetail: "Személyi jövedelemadó",
    fidesz: {
      text: "15%-os flat tax fenntartása",
      status: "implemented",
      source: "SZJA törvény",
    },
    tisza: {
      text: "Minimálbér adója 15%→9%, mediánbér alattiak adócsökkentése (2.2M fő)",
      status: "planned",
      source: "Tisza program 54.o.",
    },
  },
  {
    topic: "Europai Ugyeszseg",
    topicDetail: "EPPO csatlakozas",
    fidesz: {
      text: "Nem tervezi a csatlakozást",
      status: "no_plan",
      source: "Kormány álláspont",
    },
    tisza: {
      text: "Azonnali csatlakozás, uniós források hazahozása (8000 Mrd Ft)",
      status: "planned",
      source: "Tisza program 118.o.",
    },
  },
  {
    topic: "Oktatás",
    topicDetail: "Irányítás, autonómia",
    fidesz: {
      text: "Jelenlegi rendszer (Belügyminisztérium alatt)",
      status: "implemented",
      source: "Hatályos jogszabályok",
    },
    tisza: {
      text: "Klebelsberg Központ radikális átalakítása, miniszteri vétójog, pedagógus béremelés",
      status: "planned",
      source: "Tisza program 165.o.",
    },
  },
  {
    topic: "Vagyonadó",
    topicDetail: "Milliárdosok adóztatása",
    fidesz: {
      text: "Nem tervezi",
      status: "no_plan",
      source: "Kormány álláspont",
    },
    tisza: {
      text: "1% vagyonadó 1 milliárd Ft feletti vagyonokra",
      status: "planned",
      source: "Tisza program 54.o.",
    },
  },
  {
    topic: "Gyógyszer ÁFA",
    topicDetail: "Vényköteles gyógyszerek",
    fidesz: {
      text: "Jelenlegi 5% ÁFA fenntartása",
      status: "implemented",
      source: "ÁFA törvény",
    },
    tisza: {
      text: "0%-ra csökkentés",
      status: "planned",
      source: "Tisza program 54.o.",
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
    <div>
      {/* Quick links */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          to="/kormany-2022"
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Kormány 2022+ részletek
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/tisza-2026"
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Tisza 2026 teljes program
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/tisza-2026/chat"
          className="inline-flex items-center gap-2 rounded-lg border bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Beszélgess a Tisza programmal
        </Link>
      </div>

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
    </div>
  );
};
