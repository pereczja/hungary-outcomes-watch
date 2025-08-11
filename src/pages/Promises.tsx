import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { PromiseTracker } from '@/components/PromiseTracker';

const PromisesPage = () => {
  return (
    <>
      <SEO
        title="2026 Promise tracker | BuildHungary"
        description="Compare election promises from Orbán Viktor and Magyar Péter with live status updates."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/promises' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-3xl font-bold">2026 Promise tracker</h1>
          <p className="mb-6 text-muted-foreground">Side-by-side comparison of policy commitments and progress.</p>
        </section>
        <PromiseTracker />
      </main>
    </>
  );
};

export default PromisesPage;
