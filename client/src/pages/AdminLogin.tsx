import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement proper authentication with Supabase
      // For now, show a placeholder message
      toast.error("Admin authentication coming soon. Please contact support.");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-sky-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">NC</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Access the NexaCore admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card/50 border border-border rounded-xl p-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-white py-3"
          >
            {isLoading ? "Logging in..." : "Login"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Admin access only. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
}
