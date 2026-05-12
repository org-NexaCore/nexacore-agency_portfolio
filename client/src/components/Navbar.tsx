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
      <div className="container flex items-center justify-between h-16">
        {/* Logo - Updated */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img 
              src={logo} 
              alt="NexaCore" 
              className="h-8 w-auto group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-foreground hidden sm:inline">
              NexaCore
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300">
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
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 block cursor-pointer"
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button onClick={() => setIsOpen(false)} className="w-full bg-accent hover:bg-accent/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}