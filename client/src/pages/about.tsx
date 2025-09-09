import { motion } from 'framer-motion';
import { Heart, Award, Truck, Shield, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '@/lib/whatsapp';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Perfection",
      description: "Every fragrance is personally tested and approved by Aisha Adoke to ensure it meets our high standards of quality and elegance."
    },
    {
      icon: Award,
      title: "Authentic Excellence",
      description: "We source only genuine, high-quality perfumes from certified suppliers, guaranteeing authenticity in every bottle."
    },
    {
      icon: Truck,
      title: "Reliable Service",
      description: "Fast, secure delivery across Nigeria with same-day service in Lagos and nationwide shipping within 2-3 business days."
    },
    {
      icon: Shield,
      title: "Customer Trust",
      description: "Building lasting relationships through transparency, quality products, and exceptional customer service."
    }
  ];

  const handleWhatsAppContact = () => {
    const message = createGeneralWhatsAppMessage();
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 pb-10" data-testid="page-about">
      {/* Hero Section */}
      <section className="py-20 px-6" data-testid="section-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6" data-testid="heading-main">
              About{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ISHA'S FRAGRANCE
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where luxury meets authenticity. Discover the story behind Nigeria's premier fragrance destination, 
              curated with love by Aisha Adoke.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Aisha Adoke Story */}
      <section className="py-20 px-6 bg-card/20" data-testid="section-founder">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <img 
                  src="/brand/owner.jpg" 
                  alt="Aisha Adoke - Founder of ISHA'S FRAGRANCE" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 gradient-accent rounded-full blur-2xl opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Story Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="heading-founder">
                Meet Aisha Adoke
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p data-testid="text-founder-story-1">
                  Aisha Adoke's journey into the world of luxury fragrances began with a simple belief: 
                  that everyone deserves to experience the transformative power of authentic, high-quality perfumes. 
                  What started as a personal passion for collecting and understanding fragrances evolved into 
                  Nigeria's most trusted destination for premium scents.
                </p>
                
                <p data-testid="text-founder-story-2">
                  With an eye for quality and a commitment to authenticity, Aisha personally curates every 
                  fragrance in our collection. Her extensive knowledge of perfume composition, combined with 
                  a deep understanding of what makes a scent truly exceptional, ensures that every product 
                  meets the highest standards of excellence.
                </p>
                
                <p data-testid="text-founder-story-3">
                  "I believe that fragrance is more than just a scent – it's a memory you can wear, 
                  a confidence you can carry, and a story you can tell without words. My mission is to 
                  help every customer find their perfect signature scent that speaks to who they are."
                </p>
              </div>

              {/* Quote */}
              <motion.div
                className="glass-card rounded-2xl p-6 border-l-4 border-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                data-testid="founder-quote"
              >
                <Quote className="w-8 h-8 text-primary mb-4" />
                <blockquote className="text-foreground font-medium italic text-lg">
                  "Perfume is more than a scent — it's a memory you can wear."
                </blockquote>
                <cite className="text-muted-foreground text-sm mt-2 block">— Aisha Adoke, Founder</cite>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6" data-testid="section-values">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="heading-values">
              What Makes Us Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence goes beyond just selling perfumes. It's about creating 
              experiences and building lasting relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="grid-values">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card border-0 p-6 h-full group hover:scale-105 transition-transform" data-testid={`card-value-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-3" data-testid={`heading-value-${index}`}>
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed" data-testid={`text-value-${index}`}>
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6 bg-card/20" data-testid="section-mission">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" data-testid="heading-mission">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-testid="text-mission">
              To democratize luxury by making authentic, high-quality fragrances accessible to everyone 
              across Nigeria. We believe that luxury should not be compromised, and everyone deserves to 
              experience the confidence and joy that comes from wearing a perfect fragrance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center" data-testid="stat-products">
                <div className="text-3xl font-bold text-primary mb-2">12+</div>
                <div className="text-muted-foreground">Curated Fragrances</div>
              </div>
              <div className="text-center" data-testid="stat-customers">
                <div className="text-3xl font-bold text-accent mb-2">1000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center" data-testid="stat-delivery">
                <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
                <div className="text-muted-foreground">Abuja Delivery</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6" data-testid="section-cta">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-effect rounded-3xl p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="cta-container"
          >
            {/* Background elements */}
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" data-testid="cta-title">
                Ready to Find Your{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Perfect Scent?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="cta-description">
                Let Aisha personally help you discover a fragrance that tells your unique story. 
                Get expert recommendations and exclusive offers.
              </p>
              <Button 
                className="gradient-primary text-primary-foreground px-10 py-5 text-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/25"
                onClick={handleWhatsAppContact}
                data-testid="button-cta-contact"
              >
                <span className="mr-3 text-2xl">💬</span>
                Chat with Aisha
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
