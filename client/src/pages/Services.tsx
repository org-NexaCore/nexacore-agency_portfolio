import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  X,
  ArrowRight,
  Sparkles,
  Code2,
  Smartphone,
  Palette,
  Zap,
  Shield,
  Users,
  Play,
  Rocket,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import knightDark from "@/assets/dark-knight.png";
import knightLight from "@/assets/light-knight.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Web Development",
    category: "Development",
    icon: Code2,
    description:
      "Modern, scalable web applications built with latest technologies.",
    longDescription:
      "We create responsive, high-performance web applications using React, Next.js, and Node.js. Our solutions are designed to scale with your business and provide exceptional user experiences.",
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    year: "2024",
    impact: "50+ Websites",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1461749280691-d6ccab1d605c?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Mobile Applications",
    category: "Mobile",
    icon: Smartphone,
    description: "Native and cross-platform mobile apps for iOS and Android.",
    longDescription:
      "From concept to app store, we develop native and cross-platform mobile applications that users love. We specialize in React Native and Flutter for maximum reach.",
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    year: "2024",
    impact: "100K+ Downloads",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "UI/UX Design",
    category: "Design",
    icon: Palette,
    description: "Beautiful, intuitive interfaces that users love.",
    longDescription:
      "Our design team creates pixel-perfect interfaces with a focus on user experience. We combine aesthetics with functionality to create products that users genuinely enjoy.",
    tech: [
      "Figma",
      "Framer",
      "Tailwind CSS",
      "Design Systems",
      "User Research",
    ],
    year: "2024",
    impact: "100% Satisfaction",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Software Engineering",
    category: "Software",
    icon: Zap,
    description: "Custom solutions tailored to your business needs.",
    longDescription:
      "We engineer robust, maintainable software solutions that solve real business problems. From backend systems to complex algorithms, we deliver excellence.",
    tech: ["Python", "Java", "Go", "Rust", "Microservices"],
    year: "2024",
    impact: "99.9% Uptime",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "IT Consulting",
    category: "Consulting",
    icon: Shield,
    description: "Expert guidance for your digital transformation journey.",
    longDescription:
      "Our consultants help you navigate the digital landscape. We provide strategic advice on technology choices, architecture, and best practices.",
    tech: [
      "Cloud Architecture",
      "DevOps",
      "Security",
      "Scalability",
      "Performance",
    ],
    year: "2024",
    impact: "20+ Enterprises",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Maintenance & Support",
    category: "Support",
    icon: Users,
    description: "Ongoing support to keep your systems running smoothly.",
    longDescription:
      "We provide comprehensive maintenance and support services to ensure your systems remain secure, performant, and up-to-date.",
    tech: [
      "Monitoring",
      "Debugging",
      "Updates",
      "Security Patches",
      "Performance Optimization",
    ],
    year: "2024",
    impact: "24/7 Support",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // GSAP Animations
  useEffect(() => {
    // Hero section parallax
    if (heroRef.current) {
      gsap.to(".hero-bg-glow", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.5,
        opacity: 0.5,
        ease: "none",
      });
    }

    // Timeline line animation
    if (servicesContainerRef.current && lineRef.current) {
      const timelineItems = gsap.utils.toArray(".timeline-service");

      gsap.to(lineRef.current, {
        scrollTrigger: {
          trigger: servicesContainerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        height: "100%",
        ease: "none",
      });

      timelineItems.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            end: "top center",
            scrub: 0.5,
          },
          y: 80,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Parallax - SAME AS PORTFOLIO */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="hero-bg-glow absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute w-full h-full opacity-10">
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-accent"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <motion.div
          className="container max-w-4xl mx-auto text-center px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-semibold text-accent">
              Our Services
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            What We Do
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Comprehensive digital solutions designed to accelerate your business
            growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center"
            >
              <span className="text-sm text-muted-foreground mb-2">
                Scroll to explore
              </span>
              <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Timeline Section - SAME AS PORTFOLIO PROJECTS */}
      <section
        ref={servicesContainerRef}
        className="py-20 relative overflow-hidden"
      >
        <div className="container max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Glowing vertical line */}
            <div
              ref={lineRef}
              className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-linear-to-b from-accent via-accent/50 to-transparent h-0"
              style={{ transform: "translateX(-50%)" }}
            ></div>

            {/* Services as Timeline Items */}
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className="timeline-service relative mb-24 cursor-pointer group"
                  onClick={() => setSelectedService(service)}
                >
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Content Card */}
                    <div
                      className={`md:w-1/2 ${isEven ? "md:text-right pr-8" : "md:text-left pl-8"}`}
                    >
                      <div className="bg-card/50 p-6 rounded-xl border border-accent/20 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-accent/10">
                        <div className="flex items-center gap-2 mb-3 flex-wrap justify-between">
                          <span className="text-accent text-sm font-mono">
                            {service.year}
                          </span>
                          <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full text-xs">
                            {service.category}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                          {service.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {service.longDescription.substring(0, 120)}...
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.tech.slice(0, 3).map(tech => (
                            <span
                              key={tech}
                              className="text-xs bg-accent/10 text-accent/80 px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                          Learn More <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>

                    {/* Empty spacer */}
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - SAME AS PORTFOLIO */}
      <section className="py-16 bg-linear-to-r from-accent/5 via-transparent to-accent/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { target: 8, label: "Services Offered", suffix: "+" },
              { target: 6, label: "Expert Team", suffix: "" },
              { target: 100, label: "Client Satisfaction", suffix: "%" },
              { target: 24, label: "Support Hours", suffix: "/7" },
            ].map((stat, i) => {
              const [count, setCount] = useState(0);
              const counterRef = useRef<HTMLDivElement>(null);

              useEffect(() => {
                const observer = new IntersectionObserver(
                  entries => {
                    entries.forEach(entry => {
                      if (entry.isIntersecting) {
                        let start = 0;
                        const increment = stat.target / 50;
                        const interval = setInterval(() => {
                          start += increment;
                          if (start >= stat.target) {
                            setCount(stat.target);
                            clearInterval(interval);
                          } else {
                            setCount(Math.floor(start));
                          }
                        }, 30);
                        observer.disconnect();
                      }
                    });
                  },
                  { threshold: 0.5 }
                );

                if (counterRef.current) {
                  observer.observe(counterRef.current);
                }

                return () => observer.disconnect();
              }, [stat.target]);

              return (
                <div key={i} ref={counterRef} className="text-center">
                  <div className="text-5xl font-bold text-accent mb-2">
                    {count}
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Glassmorphism - SAME AS PORTFOLIO */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-accent/5 to-transparent"></div>
        <div className="container text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto p-12 rounded-2xl bg-card/30 backdrop-blur-xl border border-accent/20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss how our services can transform your business.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base shadow-xl shadow-accent/20 group">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Modal - SAME AS PORTFOLIO PROJECT MODAL */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-card/95 backdrop-blur-xl border border-accent/20 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                      <selectedService.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      {selectedService.title}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                      {selectedService.category}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                      {selectedService.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedService.longDescription}
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-accent" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.tech.map(t => (
                      <span
                        key={t}
                        className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <h3 className="font-semibold mb-1">Key Impact</h3>
                  <p className="text-accent text-lg font-bold">
                    {selectedService.impact}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link href="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-white flex-1 group">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-border hover:bg-card flex-1"
                    onClick={() => setSelectedService(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
