import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { OutcomeTracker } from '@/components/OutcomeTracker';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp } from 'lucide-react';

const OutcomesPage = () => {
  return (
    <>
      <SEO
        title="Eredmények 2010-2024 | VálasztásFigyelő"
        description="A Fidesz-kormányok 16 évének főbb kezdeményezései és értékelésük. Infrastruktúra, gazdaság, oktatás, egészségügy, kormányzás."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/eredmenyek' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">Eredmények 2010-2024</h1>
            <p className="max-w-2xl text-muted-foreground">
              A Fidesz-KDNP kormányok 16 évének főbb kezdeményezései és azok értékelése.
              Minden értékelés nyilvános forrásokra támaszkodik.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm" variant="outline" className="gap-2">
              <Link to="/versenyképesség">
                <BarChart3 className="h-4 w-4" />
                Versenyképességi adatok
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="gap-2">
              <Link to="/kormany-2022">
                <TrendingUp className="h-4 w-4" />
                Kormány 2022+ ígéretek
              </Link>
            </Button>
          </div>
        </section>
        <OutcomeTracker />
      </main>
    </>
  );
};

export default OutcomesPage;
