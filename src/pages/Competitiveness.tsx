import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import LiveGDPPerCapitaChart from '@/components/LiveGDPPerCapitaChart';
import LiveDebtToGDPChart from '@/components/LiveDebtToGDPChart';
import LiveEmploymentRateChart from '@/components/LiveEmploymentRateChart';
import LiveBirthRateChart from '@/components/LiveBirthRateChart';
import LiveRnDChart from '@/components/LiveRnDChart';
import LiveExportsChart from '@/components/LiveExportsChart';
import LiveLifeExpectancyChart from '@/components/LiveLifeExpectancyChart';

const Competitiveness = () => {
  return (
    <>
      <SEO
        title="Versenyképesség | VálasztásFigyelő"
        description="Magyarország összehasonlítása a V4 országokkal: GDP, államadósság, foglalkoztatás, születési ráta, K+F, export, várható élettartam."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/versenyképesség' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">Versenyképességi mutatók</h1>
            <p className="max-w-2xl text-muted-foreground">
              Magyarország összehasonlítása a visegrádi országokkal (Lengyelország, Szlovákia, Románia)
              kulcsfontosságú gazdasági és társadalmi mutatók mentén.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/eredmenyek">
                <ArrowLeft className="h-4 w-4" />
                Vissza az eredményekhez
              </Link>
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link to="/programok">
                <FileText className="h-4 w-4" />
                2026 Programok
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <LiveGDPPerCapitaChart />
            <LiveDebtToGDPChart />
            <LiveEmploymentRateChart />
            <LiveBirthRateChart />
            <LiveRnDChart />
            <LiveExportsChart />
            <LiveLifeExpectancyChart />
          </div>

          <div className="mt-8 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium">Adatforrás: Eurostat API</p>
            <p className="mt-1">
              Minden grafikon élő adatokat jelenít meg az Eurostat adatbázisából.
              A legfrissebb időszakok adatai a jelentési késedelmek miatt nem mindig elérhetők.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Competitiveness;
