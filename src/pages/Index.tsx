import { INITIATIVES } from "@/data/nerOutcomes";
import { HeroSection } from "@/components/HeroSection";
import { StatsRow } from "@/components/StatsRow";
import { PillarList } from "@/components/PillarList";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PromiseComparison } from "@/components/PromiseComparison";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection />

      <StatsRow />

      {/* NER Pillars Section - EREDMÉNYEK */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Eredmenyek
            </p>
            <h2 className="font-serif text-3xl mb-3">A NER 12 pillere</h2>
            <p className="text-muted-foreground max-w-xl">
              A 2010 ota felepitett rendszer fo kezdemenyezesei.
              A teljesulesi arany a kormany sajat, meghirdetett celjaihoz viszonyitva.
            </p>
          </div>

          <PillarList initiatives={INITIATIVES} />
        </div>
      </section>

      <hr className="border-border my-20 container-wide" />

      {/* Key Metrics Section - EREDMÉNYEK */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Eredmenyek
            </p>
            <h2 className="font-serif text-3xl mb-3">Kulcs mutatok</h2>
            <p className="text-muted-foreground max-w-xl">
              Merheto tenyek, nem velemenyek. Minden adat nemzetkozi osszehasonlitasban,
              hivatalos forrasokbol (Eurostat, OECD, Transparency International).
            </p>
          </div>

          <MetricsGrid />
        </div>
      </section>

      <hr className="border-border my-20 container-wide" />

      {/* Program Comparison Section - PROGRAMOK */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Programok
            </p>
            <h2 className="font-serif text-3xl mb-3">Valasztasi programok</h2>
            <p className="text-muted-foreground max-w-xl">
              Hivatalos dokumentumokban rogzitett vallalasok. Fidesz vs Tisza Part - temakoronkent.
              Ahol nincs hivatalos program, azt jeloljuk.
            </p>
          </div>

          <PromiseComparison />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
