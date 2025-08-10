import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import ChartCard from '@/components/ChartCard';
import { TOP5_METRICS } from '@/data/competitiveness';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LiveGDPPerCapitaChart from '@/components/LiveGDPPerCapitaChart';
import LiveDebtToGDPChart from '@/components/LiveDebtToGDPChart';

const Competitiveness = () => {
  return (
    <>
      <SEO
        title="Competitiveness Insights | BuildHungary"
        description="Top 5 indicators for competitiveness across Hungary, Poland, Slovakia, and Romania."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/outcomes/competitiveness' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-3xl font-bold">Competitiveness Insights</h1>
          <p className="mb-6 max-w-2xl text-muted-foreground">
            A focused subsite with five comparative charts on key economic and social indicators that influence competitiveness. Countries: Hungary, Poland, Slovakia, Romania.
          </p>
          <div className="mb-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm"><Link to="/outcomes">Back to Outcomes</Link></Button>
            <Button asChild variant="hero" size="sm"><Link to="/promises">Go to Promise Tracker</Link></Button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <LiveGDPPerCapitaChart />
            <LiveDebtToGDPChart />
            {TOP5_METRICS.filter(m => m.id !== 'gdp_pc_eur').map(m => (
              <ChartCard key={m.id} metric={m} />
            ))}
          </div>

          <div className="mt-8 rounded-lg border p-4 text-sm text-muted-foreground">
            Note: Most charts use demo placeholder values; the GDP per capita and debt/GDP charts fetch live data from Eurostat. Replace others with official series as needed.
          </div>
        </section>
      </main>
    </>
  );
};

export default Competitiveness;
