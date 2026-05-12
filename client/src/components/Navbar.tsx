import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import logo from "@/assets/logo.png"; // Import your logo

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container flex items-center justify-between h-20 md:h-24">
        {/* Logo - Made Bigger & More Grand */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <img 
                src={logo} 
                alt="NexaCore" 
                className="h-12 md:h-14 w-auto group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-accent/20 blur-xl -z-10 scale-150" />
            </div>
            <span className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              NexaCore
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300 px-6 py-2.5">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="container py-4 flex flex-col gap-3">
            {/* Mobile Logo (visible when menu is open) */}
            <div className="flex items-center gap-3 pb-3 border-b border-border/50">
              <img 
                src={logo} 
                alt="NexaCore" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-foreground">
                NexaCore
              </span>
            </div>
            
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2.5 block cursor-pointer"
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                onClick={() => setIsOpen(false)} 
                className="w-full bg-accent hover:bg-accent/90 text-white mt-2 py-6 text-base font-semibold"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}