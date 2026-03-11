import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/map", label: "Map" },
  { to: "/timeline", label: "Timeline" },
  { to: "/incidents", label: "Incidents" },
  { to: "/about", label: "About" },
  { to: "/tribute", label: "Tribute 🇦🇪" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-lg text-foreground tracking-tight">UAE Threat Tracker</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Open Source Intelligence</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === link.to
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-3 text-sm font-medium border-b border-border transition-colors",
                pathname === link.to
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
