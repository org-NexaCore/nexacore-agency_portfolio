import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import knightDark from "@/assets/dark-knight.png";
import knightLight from "@/assets/light-knight.png";
import {useTheme} from  "@/contexts/ThemeContext"
import {
  X,
  ArrowRight,
  Sparkles,
  Play,
  Calendar,
  Code2,
  Smartphone,
  Palette,
  Zap,
  Users,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// YOUR PROJECTS - Displayed as timeline milestones
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    icon: Code2,
    description:
      "A full-featured e-commerce platform with real-time inventory management and payment processing. Processed over $1M in transactions.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    year: "2024",
    impact: "+150% Revenue",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Mobile Fitness App",
    category: "Mobile Development",
    icon: Smartphone,
    description:
      "Cross-platform fitness tracking app with workout plans and social features. Achieved 100K+ downloads in first month.",
    tech: ["React Native", "Firebase", "Redux"],
    year: "2024",
    impact: "100K+ Downloads",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Enterprise CRM",
    category: "Software Engineering",
    icon: Zap,
    description:
      "Scalable CRM system for managing customer relationships and sales pipelines. Used by 500+ enterprise clients.",
    tech: ["Java", "Spring Boot", "Oracle", "Microservices"],
    year: "2024",
    impact: "500+ Clients",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "iOS Health App",
    category: "Mobile Development",
    icon: Smartphone,
    description:
      "Native iOS app for health monitoring with Apple Watch integration. Featured in App Store.",
    tech: ["Swift", "HealthKit", "CloudKit"],
    year: "2024",
    impact: "Featured",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f5ae4e8b69e?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    category: "Web Development",
    icon: Code2,
    description:
      "Real-time analytics dashboard with custom visualizations and data export. Processing 10M+ data points daily.",
    tech: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    year: "2024",
    impact: "10M+ Data Points",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "UI/UX Design System",
    category: "UI/UX Design",
    icon: Palette,
    description:
      "Complete design system for enterprise applications. Used by 50+ designers across the organization.",
    tech: ["Figma", "Storybook", "Tailwind CSS"],
    year: "2024",
    impact: "50+ Designers",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "AI Content Generator",
    category: "Software Engineering",
    icon: Zap,
    description:
      "AI-powered content generation tool with natural language processing. Generated 1M+ articles.",
    tech: ["Python", "TensorFlow", "FastAPI", "React"],
    year: "2024",
    impact: "1M+ Articles",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1677442d019cecf8d424d0acda32e5f56?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "IT Consulting Platform",
    category: "IT Consulting",
    icon: Shield,
    description:
      "Comprehensive IT consulting platform for digital transformation. Served 20+ enterprise clients.",
    tech: ["Next.js", "GraphQL", "PostgreSQL", "AWS"],
    year: "2024",
    impact: "20+ Enterprises",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
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
    if (projectsContainerRef.current && lineRef.current) {
      const timelineItems = gsap.utils.toArray(".timeline-project");

      // Animate the vertical line
      gsap.to(lineRef.current, {
        scrollTrigger: {
          trigger: projectsContainerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        height: "100%",
        ease: "none",
      });

      // Animate each project item
      timelineItems.forEach((item: any, index: number) => {
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
          delay: index * 0.1,
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

      {/* Hero Section with Parallax */}
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

        {/* Floating Knight - ambient background touch */}
        <motion.div
          className="absolute bottom-0 right-0 pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            width: "clamp(200px, 22vw, 520px)",
            transformOrigin: "bottom right",
          }}
        >
          <motion.img
            src={theme === "dark" ? knightDark : knightLight}
            alt=""
            className="w-full h-auto object-contain opacity-[0.5] dark:opacity-[0.05]"
            animate={{
              y: [0, -18, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
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
            <span className="text-sm font-semibold text-accent">Our Work</span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Featured Projects
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore our latest work and see how we bring ideas to life
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

      {/* Projects Timeline Section - Like Astra Tech style */}
      <section
        ref={projectsContainerRef}
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

            {/* Projects as Timeline Items */}
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  className="timeline-project relative mb-24 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Content Card */}
                    <div
                      className={`md:w-1/2 ${isEven ? "md:text-right pr-8" : "md:text-left pl-8"}`}
                    >
                      <div className="bg-card/50 p-6 rounded-xl border border-accent/20 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-accent/10">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="text-accent text-sm font-mono">
                            {project.year}
                          </span>
                          <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full text-xs">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 3).map(tech => (
                            <span
                              key={tech}
                              className="text-xs bg-accent/10 text-accent/80 px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                          Watch Demo <Play className="w-3 h-3" />
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

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-r from-accent/5 via-transparent to-accent/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { target: 8, label: "Projects Completed", suffix: "+" },
              { target: 6, label: "Happy Clients", suffix: "+" },
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

      {/* CTA Section */}
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
              Ready to Build Something Amazing?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's create something extraordinary together. We're just a
              message away.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base shadow-xl shadow-accent/20 group">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-card/95 backdrop-blur-xl border border-accent/20 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative bg-black">
                <div className="aspect-video">
                  <iframe
                    src={selectedProject.videoUrl}
                    title={selectedProject.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-3xl font-bold gradient-text">
                    {selectedProject.title}
                  </h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                      {selectedProject.category}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
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
                    {selectedProject.impact}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-white flex-1 group">
                    View Live Project
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:bg-card flex-1"
                    onClick={() => setSelectedProject(null)}
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
