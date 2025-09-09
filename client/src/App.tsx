import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./hooks/use-cart";
import { motion } from "framer-motion";

// Pages
import Home from "./pages/home";
import Shop from "./pages/shop";
import Product from "./pages/product";
import About from "./pages/about";
import Contact from "./pages/contact";
import Policy from "./pages/policy";
import NotFound from "./pages/not-found";

// Layout Components
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import WhatsAppFloat from "./components/whatsapp-float";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:slug" component={Product} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/policy" component={Policy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Router />
            </motion.main>
            <Footer />
            <WhatsAppFloat />
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
