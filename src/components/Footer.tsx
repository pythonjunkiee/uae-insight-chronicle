import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 mt-auto">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">UAE Threat Tracker</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Data sourced from publicly available news reports only. Not affiliated with UAE government or any military body.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Data Sources</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li><a href="https://acleddata.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ACLED</a></li>
            <li><a href="https://www.reuters.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Reuters</a></li>
            <li><a href="https://www.bbc.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">BBC News</a></li>
            <li><a href="https://gulfnews.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Gulf News</a></li>
            <li><a href="https://www.khaleejtimes.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Khaleej Times</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Navigation</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link to="/map" className="hover:text-primary transition-colors">Interactive Map</Link></li>
            <li><Link to="/timeline" className="hover:text-primary transition-colors">Timeline</Link></li>
            <li><Link to="/incidents" className="hover:text-primary transition-colors">Incidents Table</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
        <p>For educational and research purposes only. © {new Date().getFullYear()} UAE Threat Tracker</p>
      </div>
    </div>
  </footer>
);

export default Footer;
