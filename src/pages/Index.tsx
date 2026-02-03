import SiteHeader from '@/components/SiteHeader';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { policyAreas } from '@/data/programs2026';
import { INITIATIVES } from '@/data/nerOutcomes';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  FileText,
  Scale,
  TrendingUp,
  Users,
  AlertTriangle,
  Calendar,
} from 'lucide-react';

const Index = () => {
  // Stats from real data
  const totalPolicyAreas = policyAreas.length;
  const tiszaPending = policyAreas.filter(p => p.positions.tisza.status === 'pending').length;

  const nerSuccess = INITIATIVES.filter(i => i.status === 'success').length;
  const nerMixed = INITIATIVES.filter(i => i.status === 'mixed').length;
  const nerLagging = INITIATIVES.filter(i => i.status === 'lagging').length;

  return (
    <>
      <SEO
        title="VálasztásFigyelő – 2026-os Választási Platform"
        description="Tényalapú, elfogulatlan összehasonlítás a 2026-os magyar országgyűlési választásra. Fidesz és Tisza programok, 16 év eredmények, versenyképességi adatok."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/' : undefined}
      />
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              {/* Election countdown badge */}
              <Badge variant="outline" className="mb-6 gap-2 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4" />
                2026. április 12. – Országgyűlési választás
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Tényalapú választási
                <span className="block bg-gradient-to-r from-red-600 via-gray-600 to-green-600 bg-clip-text text-transparent">
                  összehasonlítás
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Nem jobb, nem bal – tények.
                Programok, ígéretek és eredmények átlátható bemutatása,
                hogy tájékozott döntést hozhass.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/programok">
                    <FileText className="h-5 w-5" />
                    2026 Programok
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/eredmenyek">
                    <BarChart3 className="h-5 w-5" />
                    16 év eredmények
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        </section>

        {/* Alert: Tisza program coming */}
        <section className="border-b bg-blue-50 dark:bg-blue-950/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-3 text-center">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Február 8. (szombat):</strong> A Tisza Párt publikálja hivatalos programját.
                Az összehasonlítást azonnal frissítjük.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 2026 Programs */}
              <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 translate-y-[-50%] rounded-full bg-primary/10 transition-transform group-hover:scale-150" />
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>2026 Programok</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Fidesz–KDNP és Tisza Párt választási programjainak tématerület szerinti összehasonlítása.
                  </p>
                  <div className="mb-4 flex gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-orange-600">{totalPolicyAreas}</span>
                      <span className="text-muted-foreground"> témakör</span>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-600">{tiszaPending}</span>
                      <span className="text-muted-foreground"> várakozik</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link to="/programok">
                      Összehasonlítás
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* NER Results */}
              <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 translate-y-[-50%] rounded-full bg-primary/10 transition-transform group-hover:scale-150" />
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Eredmények (2010-2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    A Fidesz-kormányok 16 évének főbb kezdeményezései és azok értékelése.
                  </p>
                  <div className="mb-4 flex gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{nerSuccess} sikeres</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span>{nerMixed} vegyes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span>{nerLagging} lemaradó</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link to="/eredmenyek">
                      Eredmények
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Competitiveness */}
              <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 translate-y-[-50%] rounded-full bg-primary/10 transition-transform group-hover:scale-150" />
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Versenyképesség</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Magyarország összehasonlítása a V4 országokkal: GDP, foglalkoztatás, demográfia.
                  </p>
                  <div className="mb-4 flex gap-3 text-sm">
                    <Badge variant="outline">Eurostat</Badge>
                    <Badge variant="outline">Élő adatok</Badge>
                  </div>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link to="/versenyképesség">
                      Grafikonok
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">Alapelveink</h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Elfogulatlanság</h3>
                <p className="text-sm text-muted-foreground">
                  Nem vagyunk semmilyen párttal kapcsolatban.
                  Minden oldalt ugyanazzal a mércével mérünk.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Forrásmegjelölés</h3>
                <p className="text-sm text-muted-foreground">
                  Minden állítás mögött ellenőrizhető forrás.
                  EU, OECD, KSH és hivatalos dokumentumok.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Közösségi</h3>
                <p className="text-sm text-muted-foreground">
                  Nyílt forráskódú projekt.
                  Bárki javasolhat javítást vagy új adatforrást.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              VálasztásFigyelő – Tényalapú, elfogulatlan választási platform
            </p>
            <p className="mt-2">
              Ez az oldal kizárólag tájékoztatási célokat szolgál.
              Nem vagyunk semmilyen párttal vagy politikai szervezettel kapcsolatban.
            </p>
            <p className="mt-4">
              <a
                href="https://github.com/pereczja/hungary-outcomes-watch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              {' · '}
              Utolsó frissítés: {new Date().toLocaleDateString('hu-HU')}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
