import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import SpaceInvadersGame from '@/components/games/SpaceInvadersGame';

const SnakePage = () => {
  return (
    <>
      <SEO
        title="Space Invaders – Play | BuildHungary"
        description="Browser-based Space Invaders with a BuildHungary theme: defend growth from shocks."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/play/snake' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-3xl font-bold">Space Invaders</h1>
          <p className="mb-6 max-w-2xl text-muted-foreground">A browser-based Space Invaders mini-game, themed for BuildHungary. No real faces or logos are used.</p>
          <div className="mx-auto max-w-[520px] motion-safe:animate-enter">
            <SpaceInvadersGame />
          </div>
        </section>
      </main>
    </>
  );
};

export default SnakePage;
