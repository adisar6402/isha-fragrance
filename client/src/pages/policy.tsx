import { motion } from 'framer-motion';
import { Truck, RotateCcw, Shield, HelpCircle, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '@/lib/whatsapp';

export default function Policy() {
  const policyCards = [
    {
      icon: Truck,
      title: "Shipping",
      description: "Fast and reliable delivery across Nigeria",
      gradient: "gradient-primary"
    },
    {
      icon: RotateCcw,
      title: "Returns",
      description: "Easy returns for unopened products",
      gradient: "gradient-accent"
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Your data is safe and secure with us",
      gradient: "gradient-primary"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Answers to common questions",
      gradient: "gradient-accent"
    }
  ];

  const shippingFaqs = [
    {
      question: "What are your delivery areas?",
      answer: "We deliver nationwide across Nigeria. Same-day delivery is available in Abuja, while other states receive their orders within 2-3 business days."
    },
    {
      question: "How much does shipping cost?",
      answer: "Shipping is free for orders above ₦50,000. For orders below this amount, shipping costs ₦2,000 within Abuja and ₦3,500 for other states."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is dispatched, you'll receive a tracking number via WhatsApp or SMS. You can use this to track your package with our delivery partner."
    },
    {
      question: "What if I'm not available for delivery?",
      answer: "Our delivery partner will attempt delivery up to 3 times. If unsuccessful, the package will be held for pickup at the nearest location for up to 7 days."
    }
  ];

  const returnsFaqs = [
    {
      question: "What is your return policy?",
      answer: "We accept returns of unopened products within 7 days of delivery. Items must be in their original packaging with all seals intact."
    },
    {
      question: "Can I return opened perfumes?",
      answer: "Due to hygiene reasons, we cannot accept returns of opened or used perfumes. Please ensure you're satisfied with your choice before opening."
    },
    {
      question: "How do I initiate a return?",
      answer: "Contact us via WhatsApp with your order number and reason for return. We'll guide you through the process and arrange pickup if approved."
    },
    {
      question: "When will I receive my refund?",
      answer: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. Refunds are made to the original payment method."
    }
  ];

  const generalFaqs = [
    {
      question: "Are your perfumes authentic?",
      answer: "Yes, absolutely! We source all our fragrances directly from authorized distributors and certified suppliers. Every product comes with a guarantee of authenticity."
    },
    {
      question: "How should I store my perfumes?",
      answer: "Store perfumes in a cool, dry place away from direct sunlight and heat. Keep them in their original boxes when possible. Avoid storing in bathrooms due to humidity."
    },
    {
      question: "How long do your perfumes last?",
      answer: "Our fragrances typically last 6-12 hours depending on the concentration and your skin type. Eau de Parfum concentrations last longer than Eau de Toilette."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes! We offer complimentary gift wrapping for all orders. Just mention it when placing your order via WhatsApp."
    },
    {
      question: "Can I get fragrance recommendations?",
      answer: "Absolutely! Aisha Adoke personally provides fragrance consultations. Contact us on WhatsApp with your preferences, and we'll recommend the perfect scent for you."
    },
    {
      question: "Do you have a physical store?",
      answer: "Currently, we operate exclusively online to keep our costs low and pass the savings to you. All orders are fulfilled from our Abuja warehouse."
    }
  ];

  const handleWhatsAppContact = () => {
    const message = createGeneralWhatsAppMessage();
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 pb-10" data-testid="page-policy">
      {/* Hero Section */}
      <section className="py-20 px-6" data-testid="section-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6" data-testid="heading-main">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Policies & FAQ
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about shopping with ISHA'S FRAGRANCE. 
              Clear policies and answers to common questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Overview Cards */}
      <section className="py-20 px-6 bg-card/20" data-testid="section-policy-overview">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="heading-overview">
              Our Commitments
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent policies designed to give you confidence in every purchase
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="grid-policy-cards">
            {policyCards.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card border-0 p-6 text-center group hover:scale-105 transition-transform" data-testid={`card-policy-${policy.title.toLowerCase()}`}>
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${policy.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <policy.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2" data-testid={`heading-policy-${policy.title.toLowerCase()}`}>
                      {policy.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`text-policy-${policy.title.toLowerCase()}`}>
                      {policy.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policies */}
      <section className="py-20 px-6" data-testid="section-detailed-policies" id="shipping">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Shipping Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="shipping"
            data-testid="section-shipping"
          >
            <h2 className="font-display text-3xl font-bold mb-8 flex items-center" data-testid="heading-shipping">
              <Truck className="w-8 h-8 mr-3 text-primary" />
              Shipping Policy
            </h2>
            <div className="glass-card rounded-2xl p-8">
              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-shipping">
                {shippingFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`shipping-${index}`} className="border-border">
                    <AccordionTrigger className="text-left font-semibold" data-testid={`trigger-shipping-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground" data-testid={`content-shipping-${index}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>

          {/* Returns Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="returns"
            data-testid="section-returns"
          >
            <h2 className="font-display text-3xl font-bold mb-8 flex items-center" data-testid="heading-returns">
              <RotateCcw className="w-8 h-8 mr-3 text-accent" />
              Returns Policy
            </h2>
            <div className="glass-card rounded-2xl p-8">
              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-returns">
                {returnsFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`returns-${index}`} className="border-border">
                    <AccordionTrigger className="text-left font-semibold" data-testid={`trigger-returns-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground" data-testid={`content-returns-${index}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>

          {/* Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="privacy"
            data-testid="section-privacy"
          >
            <h2 className="font-display text-3xl font-bold mb-8 flex items-center" data-testid="heading-privacy">
              <Shield className="w-8 h-8 mr-3 text-primary" />
              Privacy Policy
            </h2>
            <div className="glass-card rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3" data-testid="heading-data-collection">Data Collection</h3>
                <p className="text-muted-foreground" data-testid="text-data-collection">
                  We collect only the information necessary to process your orders and provide excellent customer service. 
                  This includes your name, contact information, delivery address, and payment details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3" data-testid="heading-data-usage">How We Use Your Data</h3>
                <p className="text-muted-foreground" data-testid="text-data-usage">
                  Your information is used solely for order processing, delivery coordination, and customer support. 
                  We may also send you updates about new products and special offers, but you can opt out at any time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3" data-testid="heading-data-protection">Data Protection</h3>
                <p className="text-muted-foreground" data-testid="text-data-protection">
                  We implement industry-standard security measures to protect your personal information. 
                  Your data is never shared with third parties except as necessary for order fulfillment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="faq"
            data-testid="section-faq"
          >
            <h2 className="font-display text-3xl font-bold mb-8 flex items-center" data-testid="heading-faq">
              <HelpCircle className="w-8 h-8 mr-3 text-accent" />
              Frequently Asked Questions
            </h2>
            <div className="glass-card rounded-2xl p-8">
              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
                {generalFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border-border">
                    <AccordionTrigger className="text-left font-semibold" data-testid={`trigger-faq-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground" data-testid={`content-faq-${index}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 px-6 bg-card/20" data-testid="section-support">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-effect rounded-3xl p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="support-cta"
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" data-testid="support-title">
                Still Have Questions?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="support-description">
                Our customer support team is here to help. Get personalized assistance and expert advice.
              </p>
              <Button 
                className="gradient-primary text-primary-foreground px-10 py-5 text-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/25"
                onClick={handleWhatsAppContact}
                data-testid="button-contact-support"
              >
                <span className="mr-3 text-2xl">💬</span>
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
