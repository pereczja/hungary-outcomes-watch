import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import SnakeGame from '@/components/games/SnakeGame';

const SnakePage = () => {
  return (
    <>
      <SEO
        title="Snake – Play | BuildHungary"
        description="Browser-based snake game with a Hungary-themed skin."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/play/snake' : undefined}
      />
      <SiteHeader />
      <main>
        <section className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-3xl font-bold">Snake</h1>
          <p className="mb-6 max-w-2xl text-muted-foreground">A fun, browser-based snake game with a Hungary-themed skin. No real faces or logos are used.</p>
          <div className="mx-auto max-w-[520px] motion-safe:animate-enter">
            <SnakeGame />
          </div>
        </section>
      </main>
    </>
  );
};

export default SnakePage;
