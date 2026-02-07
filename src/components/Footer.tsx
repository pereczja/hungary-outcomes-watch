import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="container-wide flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="text-sm text-muted-foreground leading-relaxed">
          <p>BuildHungary 2025</p>
          <p>Minden adat publikus, ellenorizheto forrasbol.</p>
          <p>Ez nem partpolitikai projekt. First Principle Club.</p>
        </div>
        <div className="flex gap-6">
          <Link to="/methodology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Modszertan
          </Link>
          <Link to="/methodology#sources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Forrasok
          </Link>
          <a
            href="https://github.com/pereczja/hungary-outcomes-watch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
