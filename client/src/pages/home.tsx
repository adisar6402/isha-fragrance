import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Clock, Tag, Truck, Heart, Leaf, Flame, Sun, TreePine, Candy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/product-card';
import products from '@/data/products.json';
import { Product } from '@/types/product';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '@/lib/whatsapp';

export default function Home() {
  const featuredProducts = (products as Product[]).filter(p => 
    p.badges?.includes('Best Seller') || p.badges?.includes('New')
  ).slice(0, 4);

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Abuja, Nigeria",
      rating: 5,
      comment: "The quality is exceptional! My Midnight Obsession lasts all day and gets compliments everywhere I go. Aish truly knows how to curate the best fragrances.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "David K.",
      location: "Lagos, Nigeria", 
      rating: 5,
      comment: "Fast delivery and authentic products! I've tried many online perfume stores, but ISHA'S FRAGRANCE delivers both quality and excellent customer service.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Fatima A.",
      location: "Port Harcourt, Nigeria",
      rating: 5,
      comment: "I'm obsessed with Rose Elegance! The scent is divine and the packaging is so luxurious. Will definitely be ordering more from ISHA'S.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Long-Lasting",
      description: "Premium quality oils that last 8-12 hours, ensuring your signature scent stays with you all day.",
      gradient: "gradient-primary"
    },
    {
      icon: Tag,
      title: "100% Authentic",
      description: "Sourced directly from certified suppliers, guaranteeing genuine and original fragrances.",
      gradient: "gradient-accent"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery within Abuja and nationwide shipping within 2-3 business days.",
      gradient: "gradient-primary"
    },
    {
      icon: Heart,
      title: "Curated with Love",
      description: "Each fragrance personally selected by Aisha Adoke to ensure excellence in every bottle.",
      gradient: "gradient-accent"
    }
  ];

  const fragranceFamilies = [
    { name: 'Floral', icon: Leaf, active: true },
    { name: 'Oriental', icon: Flame, active: false },
    { name: 'Citrus', icon: Sun, active: false },
    { name: 'Woody', icon: TreePine, active: false },
    { name: 'Gourmand', icon: Candy, active: false }
  ];

  const handleWhatsAppChat = () => {
    const message = createGeneralWhatsAppMessage();
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen" data-testid="page-home">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
        </div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-24 h-24 gradient-accent rounded-full blur-2xl opacity-30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            className="glass-effect rounded-3xl p-12 backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="hero-content"
          >
            <motion.h1 
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-testid="hero-title"
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Luxury Redefined
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-testid="hero-description"
            >
              Discover the art of fragrance with ISHA'S premium collection. Where authentic oils meet timeless elegance.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/shop">
                <Button 
                  className="gradient-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/25"
                  data-testid="button-explore-collection"
                >
                  Explore Collection
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                className="glass-card text-foreground px-8 py-4 text-lg font-semibold hover:bg-white/10 border border-border"
                onClick={handleWhatsAppChat}
                data-testid="button-chat-with-us"
              >
                <span className="mr-2 text-green-500">💬</span>
                Chat with Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight className="w-6 h-6 text-muted-foreground transform rotate-90" />
        </motion.div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-6" data-testid="section-featured">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="heading-featured">
              Featured Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked signatures that define luxury and sophistication
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="grid-featured-products"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/shop">
              <Button 
                variant="ghost" 
                className="glass-card text-foreground px-8 py-4 text-lg font-semibold hover:bg-white/10 border border-border"
                data-testid="button-view-all-products"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-card/20" data-testid="section-features">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="heading-why-choose-us">
              Why Choose ISHA'S
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our commitment to quality and authenticity
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="grid-features">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card p-8 text-center group hover:scale-105 transition-transform border-0" data-testid={`card-feature-${feature.title.toLowerCase().replace(' ', '-')}`}>
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-4" data-testid={`heading-feature-${feature.title.toLowerCase().replace(' ', '-')}`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-feature-${feature.title.toLowerCase().replace(' ', '-')}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Notes */}
      <section className="py-20 px-6" data-testid="section-fragrance-families">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="heading-shop-by-notes">
              Shop by Fragrance Notes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover your perfect scent through our curated fragrance families
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="filters-fragrance-families"
          >
            {fragranceFamilies.map((family, index) => (
              <motion.div
                key={family.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Button
                  variant={family.active ? "default" : "ghost"}
                  className={`glass-card px-6 py-3 font-semibold transition-colors ${
                    family.active 
                      ? 'border border-primary bg-primary/10 text-primary' 
                      : 'border border-border text-muted-foreground hover:bg-white/10'
                  }`}
                  data-testid={`button-family-${family.name.toLowerCase()}`}
                >
                  <family.icon className="w-4 h-4 mr-2" />
                  {family.name}
                </Button>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Featured Category Products */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            data-testid="grid-category-products"
          >
            {products.slice(1, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product as Product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-card/20" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="heading-testimonials">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ISHA'S FRAGRANCE
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="grid-testimonials">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="testimonial-card glass-card p-8 border-0" data-testid={`card-testimonial-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div className="flex space-x-1 text-accent">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-lg">★</span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">{testimonial.rating}.0</span>
                    </div>
                    <blockquote className="text-muted-foreground mb-6 italic" data-testid={`quote-testimonial-${index}`}>
                      "{testimonial.comment}"
                    </blockquote>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                        data-testid={`img-testimonial-${index}`}
                      />
                      <div>
                        <div className="font-semibold text-foreground" data-testid={`name-testimonial-${index}`}>
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`location-testimonial-${index}`}>
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6" data-testid="section-cta">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-effect rounded-3xl p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="cta-banner"
          >
            {/* Floating decorative elements */}
            <motion.div 
              className="absolute top-0 left-0 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-24 h-24 gradient-accent rounded-full blur-2xl opacity-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" data-testid="cta-title">
                Ready to Find Your{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Signature Scent?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="cta-description">
                Chat with us on WhatsApp for personalized recommendations and exclusive offers
              </p>
              <Button 
                className="gradient-primary text-primary-foreground px-10 py-5 text-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/25"
                onClick={handleWhatsAppChat}
                data-testid="button-cta-whatsapp"
              >
                <span className="mr-3 text-2xl">💬</span>
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
