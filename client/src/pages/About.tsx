import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Heart, Target, Zap, Award, Users, Globe, Coffee, Sparkles, Rocket, Shield, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import abdelhakimImg from "@/assets/images/abdelhakim.jpg";
import mouadImg from "@/assets/images/mouad.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll reveal component
const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current,
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

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax background effect
    if (heroRef.current) {
      gsap.to(".hero-bg-particle", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.5,
        opacity: 0.3,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Stats counter component inside the main component
  const StatsCounter = ({ stat }: { stat: { icon: any; target: number; label: string; suffix: string } }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef<HTMLDivElement>(null);
    const Icon = stat.icon;
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
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
      <div ref={counterRef} className="text-center group">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className="text-5xl font-bold text-accent mb-2">
          {count}{stat.suffix}
        </div>
        <p className="text-muted-foreground text-sm uppercase tracking-wide">{stat.label}</p>
      </div>
    );
  };

  const stats = [
    { icon: Coffee, target: 8, label: "Projects Completed", suffix: "+" },
    { icon: Users, target: 6, label: "Happy Clients", suffix: "+" },
    { icon: Heart, target: 100, label: "Satisfaction", suffix: "%" },
    { icon: Zap, target: 24, label: "Support", suffix: "/7" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Cinematic */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="hero-bg-particle absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-br from-transparent via-accent/5 to-transparent"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100, -200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
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
            <span className="text-sm font-semibold text-accent">Our Story</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            About NexaCore
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Two founders, one vision — building digital experiences that matter
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-32 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent/50 via-accent/20 to-transparent"></div>
              <div className="pl-8">
                <span className="text-accent text-sm font-mono mb-2 block">CHAPTER ONE</span>
                <h2 className="text-5xl font-bold mb-8">Our Story</h2>
                <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                  <p className="text-xl text-foreground font-medium">
                    Two friends, two developers, one shared dream.
                  </p>
                  <p>
                    NexaCore was born from a simple belief: great technology should be accessible, 
                    beautiful, and transformative. What started as late-night coding sessions between 
                    two passionate developers has evolved into something much bigger.
                  </p>
                  <p>
                    We're not just another agency. We're your partners in digital transformation. 
                    Every project we take on is an opportunity to push boundaries, challenge assumptions, 
                    and create something extraordinary.
                  </p>
                  <p>
                    Today, we're proud to work with businesses of all sizes, from ambitious startups 
                    to established enterprises. But our core remains the same — a commitment to 
                    excellence, innovation, and genuine partnership.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-accent/5 via-transparent to-accent/5">
        <div className="container">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <StatsCounter key={i} stat={stat} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent"></div>
        <div className="container relative">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                whileInView={{ scale: 1 }}
                initial={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Target className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">Our Vision</h2>
                <p className="text-2xl sm:text-3xl font-light leading-tight text-foreground">
                  To become the most trusted digital partner for businesses worldwide, 
                  transforming ideas into impactful digital experiences.
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32">
        <div className="container max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent text-sm font-mono mb-2 block">WHY WE EXIST</span>
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  To deliver exceptional digital solutions that empower businesses to achieve their goals 
                  and exceed their users' expectations.
                </p>
                <div className="space-y-4">
                  {[
                    "Innovation without compromise",
                    "Quality in everything we do",
                    "Partnership that lasts",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-2xl"></div>
                <div className="relative p-8 rounded-2xl border border-accent/20 bg-card/30 backdrop-blur-sm">
                  <Rocket className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-2">Zero to One</h3>
                  <p className="text-muted-foreground">
                    From concept to launch, we're with you every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-card/30">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent text-sm font-mono mb-2 block">CORE BELIEFS</span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Values That Guide Us</h2>
              <p className="text-muted-foreground text-lg">
                Principles that shape every decision we make
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: "Innovation First", description: "We embrace new technologies and approaches to solve problems creatively." },
              { icon: Shield, title: "Uncompromising Quality", description: "Every line of code, every pixel, every decision meets our high standards." },
              { icon: Heart, title: "Client Success", description: "Your success is our success. We're invested in your growth." },
              { icon: Globe, title: "Global Perspective", description: "We think beyond borders to create solutions that work worldwide." },
              { icon: Award, title: "Continuous Learning", description: "We're always growing, always improving, always evolving." },
              { icon: Coffee, title: "Passion Driven", description: "We love what we do, and it shows in every project we deliver." },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-8 bg-background/40 rounded-2xl border border-border/50 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent text-sm font-mono mb-2 block">THE PEOPLE</span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet the Founders</h2>
              <p className="text-muted-foreground text-lg">
                Two developers, one shared vision for excellence
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-sky-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center p-8 bg-gradient-to-br from-card/50 to-card/30 rounded-2xl border border-border group-hover:border-accent/30 transition-all duration-300">
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-sky-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
                  <img
                    src={abdelhakimImg}
                    alt="Abdelhakim Ntata"
                    className="w-full h-full object-cover rounded-full border-4 border-accent/30 group-hover:border-accent/60 transition-all duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">Abdelhakim Ntata</h3>
                <p className="text-accent font-medium mb-4">Co-Founder / Developer</p>
                <p className="text-muted-foreground">
                  Full-stack developer with a passion for building scalable systems and mentoring junior developers.
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-center gap-2">
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent">React</span>
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent">Node.js</span>
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent">TypeScript</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-sky-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center p-8 bg-gradient-to-br from-card/50 to-card/30 rounded-2xl border border-border group-hover:border-accent/30 transition-all duration-300">
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-sky-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
                  <img
                    src={mouadImg}
                    alt="Mouad Hrchaoui"
                    className="w-full h-full object-cover rounded-full border-4 border-accent/30 group-hover:border-accent/60 transition-all duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">Mouad Hrchaoui</h3>
                <p className="text-accent font-medium mb-4">Co-Founder / Developer</p>
                <p className="text-muted-foreground">
                  Creative technologist focused on user experience and innovative solutions to complex problems.
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-center gap-2">
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent">UI/UX</span>
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent">Mobile</span>
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent">AI</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent"></div>
        <div className="container text-center relative">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="max-w-3xl mx-auto p-12 rounded-3xl bg-card/30 backdrop-blur-xl border border-accent/20"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Ready to Write Your Story?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's create something amazing together. Your vision + our expertise = extraordinary results.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base shadow-xl shadow-accent/20 group">
                    Start a Conversation
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