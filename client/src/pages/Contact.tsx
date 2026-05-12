import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ArrowRight, Sparkles, Send, Phone, Clock, CheckCircle, MessageCircle, Linkedin, Github, Twitter } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
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

// Floating particles
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
}));

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  const submitMessage = trpc.contact.submitMessage.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send message. Please try again.");
    },
  });

  useEffect(() => {
    // Parallax background effect
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      submitMessage.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Cinematic (SAME AS PORTFOLIO) */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="hero-bg-glow absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl opacity-30"></div>
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-br from-transparent via-accent/5 to-transparent"
            style={{ opacity: heroOpacity }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-accent/40 rounded-full"
              initial={{
                x: `${particle.left}%`,
                y: "100%",
                opacity: 0,
              }}
              animate={{
                y: "-20%",
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <svg className="absolute w-full h-full">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
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
            <span className="text-sm font-semibold text-accent">Let's Connect</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Get in Touch
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Have a project in mind? We'd love to hear about it. Let's create something amazing together.
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
              <span className="text-sm text-muted-foreground mb-2">Scroll to contact</span>
              <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section - Enhanced */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info - Enhanced */}
            <ScrollReveal>
              <div>
                <span className="text-accent text-sm font-mono mb-2 block">GET IN TOUCH</span>
                <h2 className="text-3xl font-bold mb-6">Let's Talk</h2>
                <p className="text-muted-foreground mb-8">
                  Have a project in mind or just want to say hello? We'd love to hear from you.
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Email */}
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex gap-4 p-4 rounded-xl bg-card/30 border border-border hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:contact@nexacore.dev"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        contact@nexacore.dev
                      </a>
                    </div>
                  </motion.div>

                  {/* Response Time */}
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex gap-4 p-4 rounded-xl bg-card/30 border border-border hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Response Time</h3>
                      <p className="text-muted-foreground">
                        We typically respond within 24 hours during business days
                      </p>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex gap-4 p-4 rounded-xl bg-card/30 border border-border hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Available for remote projects worldwide
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://github.com/nexacore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-card/50 border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                    >
                      <Github className="w-5 h-5 text-muted-foreground hover:text-accent" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://linkedin.com/company/nexacore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-card/50 border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground hover:text-accent" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://twitter.com/nexacore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-card/50 border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                    >
                      <Twitter className="w-5 h-5 text-muted-foreground hover:text-accent" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-card/50 border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5 text-muted-foreground hover:text-accent" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form - Enhanced */}
            <ScrollReveal>
              <div>
                <span className="text-accent text-sm font-mono mb-2 block">SEND US A MESSAGE</span>
                <h2 className="text-3xl font-bold mb-6">Start a Conversation</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 bg-card/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                        errors.name ? "border-red-500" : "border-border hover:border-accent/50"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 bg-card/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                        errors.email ? "border-red-500" : "border-border hover:border-accent/50"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={5}
                      className={`w-full px-4 py-3 bg-card/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none ${
                        errors.message ? "border-red-500" : "border-border hover:border-accent/50"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={submitMessage.isPending}
                      className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-base shadow-lg shadow-accent/20 group"
                    >
                      {submitMessage.isPending ? (
                        <>Sending... <Send className="w-4 h-4 ml-2 animate-pulse" /></>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section - SAME AS PORTFOLIO */}
      <section className="py-16 bg-gradient-to-r from-accent/5 via-transparent to-accent/5">
        <div className="container">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: MessageCircle, number: "24h", label: "Response Time" },
                { icon: CheckCircle, number: "100%", label: "Satisfaction" },
                { icon: Mail, number: "24/7", label: "Support Available" },
                { icon: Clock, number: "Fast", label: "Turnaround" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center group">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="text-3xl font-bold text-accent mb-1">{stat.number}</div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-mono mb-2 block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know before reaching out</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "What's your typical response time?", a: "We usually respond within 24 hours during business days." },
              { q: "Do you work with startups?", a: "Absolutely! We love helping startups bring their ideas to life." },
              { q: "What's your pricing model?", a: "We offer flexible pricing based on project scope and requirements." },
              { q: "Do you offer maintenance?", a: "Yes, we provide ongoing maintenance and support packages." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-background/40 rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-300"
              >
                <h3 className="font-semibold mb-2 text-accent">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium (SAME AS PORTFOLIO) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />
        <div className="container text-center relative">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="max-w-3xl mx-auto p-12 rounded-3xl bg-card/30 backdrop-blur-xl border border-accent/20"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Fill out the form above or reach out directly. We're excited to hear about your vision.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="mailto:contact@nexacore.dev">
                  <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base shadow-xl shadow-accent/20 group">
                    Email Us Directly
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}