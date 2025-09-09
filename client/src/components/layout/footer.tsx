import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Instagram, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '@/lib/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const message = createGeneralWhatsAppMessage();
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle newsletter signup
    console.log('Newsletter signup');
  };

  return (
    <footer className="glass-card border-t border-border py-16 px-6" data-testid="footer-main">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="/brand/logo.png" 
                  alt="ISHA'S FRAGRANCE Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-2xl font-semibold text-foreground">
                ISHA'S FRAGRANCE
              </span>
            </motion.div>
            <motion.p
              className="text-muted-foreground mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Curating luxury fragrances that tell your story. Experience authentic oils, 
              exceptional longevity, and personalized service.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="glass-card rounded-full hover:bg-white/10"
                data-testid="button-instagram"
              >
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card rounded-full hover:bg-white/10"
                data-testid="button-tiktok"
              >
                <Send className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card rounded-full hover:bg-white/10"
                onClick={handleWhatsAppClick}
                data-testid="button-whatsapp-footer"
              >
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
              </Button>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-shop">
                    Shop All
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=new">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-new">
                    New Arrivals
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=bestsellers">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-bestsellers">
                    Best Sellers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-contact">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Customer Care
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/policy#shipping">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-shipping">
                    Shipping Info
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/policy#returns">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-returns">
                    Returns
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/policy#sizing">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-sizing">
                    Size Guide
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/policy#faq">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-faq">
                    FAQ
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/policy#privacy">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-privacy">
                    Privacy Policy
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          className="border-t border-border pt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Stay in the Scent
            </h3>
            <p className="text-muted-foreground mb-6">
              Get notified about new fragrances and exclusive offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex" data-testid="form-newsletter">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 glass-card border border-border rounded-r-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="gradient-primary text-primary-foreground rounded-l-none font-semibold hover:scale-105 transition-transform"
                data-testid="button-newsletter-submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p data-testid="text-copyright">
            &copy; {currentYear} ISHA'S FRAGRANCE. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
