import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b border-border sticky top-0 bg-background z-50">
      <div className="container-wide flex items-center justify-between h-[72px]">
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
          BuildHungary
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pillerek
          </Link>
          <Link to="/outcomes/competitiveness" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Mutatok
          </Link>
          <Link to="/promises" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Igeretek
          </Link>
          <Link to="/methodology" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Modszertan
          </Link>
        </nav>
      </div>
    </header>
  );
};
