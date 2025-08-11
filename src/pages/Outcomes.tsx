import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { OutcomeTracker } from '@/components/OutcomeTracker';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OutcomesPage = () => {
  return (
    <>
      <SEO
        title="NER 2010-2025 outcomes | BuildHungary"
        description="Track key outcomes across 15 years of NER: infrastructure, economy, education, healthcare, governance."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/outcomes' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-3xl font-bold">NER 2010-2025 outcomes</h1>
          <p className="mb-6 text-muted-foreground">A clear overview of major outcomes and their current status.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm" variant="outline"><Link to="/outcomes/competitiveness">View Competitiveness Insights</Link></Button>
          </div>
        </section>
        <OutcomeTracker />
      </main>
    </>
  );
};

export default OutcomesPage;
