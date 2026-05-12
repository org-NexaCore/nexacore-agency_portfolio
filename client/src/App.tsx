import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import logo from "@/assets/logo.png";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        {/* Logo Watermark - MUCH MORE VISIBLE */}
        <div 
          className="fixed bottom-0 right-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: '40%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            opacity: 0.25,
            filter: 'blur(1px)',
          }}
        />
        
        <TooltipProvider>
          <Toaster />
          <div className="relative z-10">
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;