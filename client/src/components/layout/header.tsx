import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const totalItems = getTotalItems();

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect backdrop-blur-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="header-main"
    >
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              data-testid="link-home-logo"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="/brand/logo.png" 
                  alt="ISHA'S FRAGRANCE Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                ISHA'S FRAGRANCE
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className={`text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${
                    location === item.href ? 'text-foreground' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="glass-card hover:bg-white/10"
              data-testid="button-search"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="glass-card hover:bg-white/10 relative"
              onClick={toggleCart}
              data-testid="button-cart"
            >
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              {totalItems > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  data-testid="badge-cart-count"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden glass-card hover:bg-white/10"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-effect backdrop-blur-lg">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <motion.span
                        className={`text-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer block ${
                          location === item.href ? 'text-foreground' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        whileHover={{ x: 10 }}
                        data-testid={`link-mobile-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
