import { Link } from "wouter";
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Send, Heart, ArrowUp, Facebook, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Web Development", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "UI/UX Design", href: "/services" },
    { name: "Software Engineering", href: "/services" },
    { name: "IT Consulting", href: "/services" },
    { name: "Maintenance & Support", href: "/services" },
  ];

  return (
    <>
      <footer className="bg-gradient-to-b from-card/50 to-card/30 border-t border-border/50 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Column 1: Logo & Description */}
            <div>
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer mb-4 group">
                  <img 
                    src={logo} 
                    alt="NexaCore" 
                    className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" 
                  />
                  <span className="text-xl font-bold gradient-text">NexaCore</span>
                </div>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Building scalable digital products with modern technologies and premium design. 
                We transform ideas into exceptional digital experiences.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://github.com/org-NexaCore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-4 h-4 text-accent" />
                </a>
                <a
                  href="https://www.linkedin.com/company/115856072"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-4 h-4 text-accent" />
                </a>
                <a
                  href="https://twitter.com/nexacore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-4 h-4 text-accent" />
                </a>
                <a
                  href="https://instagram.com/nexacore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-4 h-4 text-accent" />
                </a>
                <a
                  href="https://facebook.com/nexacore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-4 h-4 text-accent" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-muted-foreground hover:text-accent transition-all duration-300 cursor-pointer text-sm flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-accent/50 rounded-full group-hover:bg-accent transition-colors"></span>
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                Our Services
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href}>
                      <span className="text-muted-foreground hover:text-accent transition-all duration-300 cursor-pointer text-sm flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-accent/50 rounded-full group-hover:bg-accent transition-colors"></span>
                        {service.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <a href="mailto:contact@nexacore.dev" className="hover:text-accent transition-colors">
                    nexacore@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <a href="tel:+212123456789" className="hover:text-accent transition-colors">
                    +212 650581162
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Available for remote projects worldwide</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                  <Send className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Response time: &lt; 24 hours</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs">
              © {currentYear} NexaCore. All rights reserved{" "}
              <Heart className="w-3 h-3 inline text-accent animate-pulse" /> 
            </p>
            <div className="flex gap-6 text-xs">
              <Link href="/privacy">
                <span className="text-muted-foreground hover:text-accent transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-muted-foreground hover:text-accent transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
              >
                Back to Top
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button (Floating) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-accent text-white shadow-lg shadow-accent/30 hover:scale-110 transition-all duration-300 animate-bounce"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}