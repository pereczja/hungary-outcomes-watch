import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="py-24 text-center">
      <div className="container-narrow">
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
          2010 – 2025
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-6">
          Magyarorszag, szamokban
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
          Merheto tenyek, nem velemenyek. Eredmenyek, programok, osszehasonlitasok —
          minden adat ellenorizheto, nemzetkozi forrasokbol.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <Link
            to="/methodology"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Hogyan mukodik? →
          </Link>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <span className="text-muted-foreground italic">
            Ez egy kiserlet az objektiv osszehasonlitasra.
          </span>
        </div>
      </div>
    </section>
  );
};
