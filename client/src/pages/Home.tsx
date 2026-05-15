import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import knightDark from "@/assets/dark-knight.png";
import knightLight from "@/assets/light-knight.png";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Palette,
  Zap,
  Users,
  Shield,
  CheckCircle,
  Award,
  Rocket,
  Heart,
  Star,
  TrendingUp,
  Play,
  Sparkles,
  Globe,
  Coffee,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import abdelhakimImg from "@/assets/images/abdelhakim.jpg";
import mouadImg from "@/assets/images/mouad.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

// Scroll reveal component
const ScrollReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom-=100",
            end: "top center",
            scrub: 0.5,
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return <div ref={ref}>{children}</div>;
};

// Animated counter with GSAP
const AnimatedCounter = ({
  target,
  label,
  suffix = "+",
}: {
  target: number;
  label: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let start = 0;
            const increment = target / 50;
            const interval = setInterval(() => {
              start += increment;
              if (start >= target) {
                setCount(target);
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center p-6 bg-linear-to-br from-card/50 to-card/30 rounded-xl border border-border backdrop-blur-sm hover:border-accent/30 transition-all duration-300"
    >
      <div className="text-4xl sm:text-5xl font-bold text-accent mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground text-sm uppercase tracking-wide">
        {label}
      </p>
    </motion.div>
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const { theme } = useTheme();

  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description:
        "Modern, scalable web applications built with latest technologies.",
      color: "from-blue-500/20 to-blue-600/20",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      color: "from-green-500/20 to-green-600/20",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love.",
      color: "from-purple-500/20 to-purple-600/20",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Software Engineering",
      description: "Custom solutions tailored to your business needs.",
      color: "from-yellow-500/20 to-yellow-600/20",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "IT Consulting",
      description: "Expert guidance for your digital transformation journey.",
      color: "from-red-500/20 to-red-600/20",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Users,
      title: "Maintenance & Support",
      description: "Ongoing support to keep your systems running smoothly.",
      color: "from-indigo-500/20 to-indigo-600/20",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const features = [
    {
      icon: Rocket,
      title: "Modern Technologies",
      description:
        "Built with cutting-edge frameworks and tools that set industry standards.",
      gradient: "from-orange-500 to-accent",
    },
    {
      icon: TrendingUp,
      title: "Scalable Architecture",
      description:
        "Systems designed to grow seamlessly with your business needs.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description:
        "Rapid development cycles without ever compromising on quality.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: CheckCircle,
      title: "Clean Code",
      description:
        "Maintainable, well-documented codebase that stands the test of time.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Star,
      title: "Premium UX/UI",
      description:
        "Pixel-perfect designs that convert visitors into loyal customers.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Ongoing Support",
      description:
        "Dedicated support and maintenance long after your project launches.",
      gradient: "from-red-500 to-rose-500",
    },
  ];

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Cinematic */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-accent to-transparent rounded-full blur-3xl opacity-40"
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-br from-sky-500 to-transparent rounded-full blur-3xl opacity-30"
            animate={{
              y: [0, -50, 0],
              x: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full bg-linear-to-br from-transparent via-accent/5 to-transparent"
            style={{ opacity: heroOpacity, scale: heroScale }}
          />
        </div>
        <motion.div
          className="container max-w-4xl mx-auto text-center px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-semibold text-accent">
              Next-Gen Digital Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Build Scalable{" "}
            <span className="gradient-text">Digital Products</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto"
          >
            We design and develop modern web, mobile, and software solutions
            that drive business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hero-badge inline-flex mx-auto"
          >
            <span className="font-semibold">
              ✨ Built by a lean team of two founders
            </span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>Modern craft, premium polish, intentional speed.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link href="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base shadow-xl shadow-accent/20 hover:shadow-accent/30 transition-all duration-300 group">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="border-border hover:bg-card hover:border-accent/50 px-8 py-6 text-base transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2" />
                View Our Work
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-muted-foreground">
                Scroll to explore
              </span>
              <div className="w-0.5 h-8 bg-linear-to-b from-accent to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Section - Client Logos */}
      <section className="py-16 bg-linear-to-r from-card/30 via-card/20 to-card/30 border-y border-border overflow-hidden">
        <div className="container">
          <ScrollReveal>
            <p className="text-center text-muted-foreground uppercase tracking-wider text-sm font-semibold mb-12">
              Trusted by Innovative Businesses
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {[
                "TechCorp",
                "InnovateLabs",
                "FutureStack",
                "DigitalWave",
                "CodeCraft",
                "DevSphere",
              ].map((name, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.7, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className="text-2xl font-bold text-muted-foreground/50 hover:text-accent/70 transition-all"
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-mono mb-2 block">
                WHAT WE CREATE
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
                Services We Offer
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                End-to-end digital solutions tailored to your business needs
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative p-6 bg-card/50 border border-border rounded-xl hover:border-accent/50 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 mb-4 rounded-lg bg-linear-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why NexaCore Section - Value Proposition */}
      <section className="py-24 bg-linear-to-br from-card/30 via-background to-card/30 border-y border-border">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-mono mb-2 block">
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Why <span className="gradient-text">NexaCore</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                What makes us different from the rest
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group p-6 bg-background/40 rounded-xl border border-border/50 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-mono mb-2 block">
                OUR IMPACT
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                By the Numbers
              </h2>
              <p className="text-muted-foreground text-lg">
                What we've achieved so far
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCounter target={8} label="Projects Completed" suffix="+" />
            <AnimatedCounter target={6} label="Happy Clients" suffix="+" />
            <AnimatedCounter
              target={100}
              label="Client Satisfaction"
              suffix="%"
            />
            <AnimatedCounter target={24} label="Support Hours" suffix="/7" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-mono mb-2 block">
                THE PEOPLE
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground text-lg">
                The passionate minds behind NexaCore
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Abdelhakim Ntata */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-sky-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center p-8 bg-linear-to-br from-card/50 to-card/30 rounded-2xl border border-border group-hover:border-accent/30 transition-all duration-300">
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <div className="absolute inset-0 bg-linear-to-br from-accent to-sky-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse" />
                  <img
                    src={abdelhakimImg}
                    alt="Abdelhakim Ntata"
                    className="w-full h-full object-cover rounded-full border-4 border-accent/30 group-hover:border-accent/60 transition-all duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">Abdelhakim Ntata</h3>
                <p className="text-accent font-medium mb-4">
                  Co-Founder / Developer
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Full-stack developer passionate about building scalable
                  systems and creating exceptional digital experiences.
                </p>
              </div>
            </motion.div>

            {/* Mouad Hrchaoui */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-sky-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center p-8 bg-linear-to-br from-card/50 to-card/30 rounded-2xl border border-border group-hover:border-accent/30 transition-all duration-300">
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <div className="absolute inset-0 bg-linear-to-br from-accent to-sky-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse" />
                  <img
                    src={mouadImg}
                    alt="Mouaad Harchaoui"
                    className="w-full h-full object-cover rounded-full border-4 border-accent/30 group-hover:border-accent/60 transition-all duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">Mouaad Harchaoui</h3>
                <p className="text-accent font-medium mb-4">
                  Co-Founder / Developer
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Creative technologist focused on user experience and
                  innovative solutions to complex problems.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-accent/20 via-accent/5 to-transparent" />
        <div className="container text-center relative">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="max-w-3xl mx-auto p-12 rounded-3xl bg-card/30 backdrop-blur-xl border border-accent/20"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's work together to bring your vision to life. We're just a
                message away.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base shadow-xl shadow-accent/20 group">
                    Get Started Today
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
