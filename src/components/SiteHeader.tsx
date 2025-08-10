import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`;

const SiteHeader = () => {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="inline-flex items-center gap-2" aria-label="BuildHungary home">
          <div className="h-7 w-7 rounded-md bg-gradient-primary shadow-elevated" />
          <span className="bg-gradient-primary bg-clip-text text-lg font-semibold text-transparent">
            BuildHungary
          </span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <NavLink to="/outcomes" className={navLinkClass}>
            Outcomes
          </NavLink>
          <NavLink to="/promises" className={navLinkClass}>
            Promise Tracker
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/outcomes">Explore</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/promises">Compare</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
