import SiteHeader from '@/components/SiteHeader';
import SEO from '@/components/SEO';
import ProgramComparison from '@/components/ProgramComparison';

const ProgramsPage = () => {
  return (
    <>
      <SEO
        title="2026 Választási Programok | VálasztásFigyelő"
        description="Fidesz és Tisza párt 2026-os választási programjainak összehasonlítása. Tényalapú, elfogulatlan elemzés minden tématerületen."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/programok' : undefined}
      />
      <SiteHeader />
      <main>
        <ProgramComparison />
      </main>
    </>
  );
};

export default ProgramsPage;
