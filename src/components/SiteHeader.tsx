import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`;

const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/programok', label: '2026 Programok', primary: true },
    { to: '/eredmenyek', label: 'Eredmények (2010-2024)' },
    { to: '/versenyképesség', label: 'Versenyképesség' },
    { to: '/kormany-2022', label: 'Kormány 2022+' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2" aria-label="VálasztásFigyelő főoldal">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 via-white to-green-600 shadow-md">
            <span className="text-sm font-bold text-gray-800">VF</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">
              VálasztásFigyelő
            </span>
            <span className="hidden text-[10px] text-muted-foreground sm:block">
              Tényalapú, elfogulatlan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                } ${item.primary ? 'font-medium' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline" size="sm">
            <Link to="/programok">Programok</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700">
            <Link to="/eredmenyek">Eredmények</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-4 flex gap-2">
              <Button asChild className="flex-1" variant="outline">
                <Link to="/programok" onClick={() => setMobileMenuOpen(false)}>
                  2026 Programok
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/eredmenyek" onClick={() => setMobileMenuOpen(false)}>
                  Eredmények
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
