import SiteHeader from '@/components/SiteHeader';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-hungary.jpg';
import { outcomes } from '@/data/outcomes';
import { promises } from '@/data/promises';
import { Link } from 'react-router-dom';

const Index = () => {
  const achieved = outcomes.filter(o => o.status === 'achieved').length;
  const inProgress = outcomes.filter(o => o.status === 'in-progress').length;

  return (
    <>
      <SEO
        title="BuildHungary – Outcomes & Promise Tracker"
        description="Transparent tracking of Hungary's key outcomes and election promises. Data-rich, clear, and accessible."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="container mx-auto grid min-h-[70vh] grid-cols-1 items-center px-4 py-12 md:grid-cols-2">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Transparent tracking for Hungary
              </h1>
              <p className="mt-3 max-w-prose text-muted-foreground">
                Inspired by BuildCanada, BuildHungary highlights key outcomes from the last 15 years and compares election promises between candidates.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/outcomes">Explore Outcomes</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/promises">Compare Promises</Link>
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Card className="bg-gradient-surface">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-semibold">{achieved}</div>
                    <div className="text-xs text-muted-foreground">Outcomes achieved</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-surface">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-semibold">{inProgress}</div>
                    <div className="text-xs text-muted-foreground">In progress</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-surface">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-semibold">{outcomes.length}</div>
                    <div className="text-xs text-muted-foreground">Tracked outcomes</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-surface">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-semibold">{promises.length}</div>
                    <div className="text-xs text-muted-foreground">Compared topics</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative mt-8 md:mt-0">
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl md:h-96 md:w-96 bg-gradient-primary" />
              <img
                src={heroImage}
                alt="Abstract Hungary hero artwork"
                loading="lazy"
                className="relative z-10 w-full rounded-xl border shadow-elevated motion-safe:animate-float"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
