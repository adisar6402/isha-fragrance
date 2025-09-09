import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '@/lib/whatsapp';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+234 808 220 1270",
      action: () => window.open('tel:+2348082201270')
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "Chat with us",
      action: () => {
        const message = createGeneralWhatsAppMessage();
        const whatsappUrl = createWhatsAppLink(message);
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      icon: Mail,
      title: "Email",
      content: "aishayusuf080822@gmail.com",
      action: () => window.open('mailto:aishayusuf080822@gmail.com')
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Abuja, Nigeria",
      action: () => {}
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 5:00 PM" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, this would send the form data to a server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const message = createGeneralWhatsAppMessage();
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  const handleSocialClick = (platform: string) => {
    // In a real application, these would link to actual social media profiles
    toast({
      title: "Coming soon",
      description: `Follow us on ${platform} for updates and exclusive offers.`,
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-10" data-testid="page-contact">
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
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about our fragrances? Need personalized recommendations? 
              We're here to help you find your perfect scent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-6 bg-card/20" data-testid="section-contact-info">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="heading-contact-info">
              Contact Information
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred way to reach us. We're always happy to help!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" data-testid="grid-contact-methods">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="glass-card border-0 p-6 text-center group hover:scale-105 transition-transform cursor-pointer"
                  onClick={info.action}
                  data-testid={`card-contact-${info.title.toLowerCase()}`}
                >
                  <CardContent className="p-0">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-contact-${info.title.toLowerCase()}`}>
                      {info.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`text-contact-${info.title.toLowerCase()}`}>
                      {info.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick WhatsApp CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="font-display text-xl font-semibold mb-4" data-testid="heading-quick-contact">
                Need Immediate Help?
              </h3>
              <p className="text-muted-foreground mb-6">
                Chat with us on WhatsApp for instant support and personalized recommendations.
              </p>
              <Button 
                className="gradient-primary text-primary-foreground px-6 py-3 font-semibold hover:scale-105 transition-transform"
                onClick={handleWhatsAppContact}
                data-testid="button-whatsapp-quick"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Business Hours */}
      <section className="py-20 px-6" data-testid="section-form-hours">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-0" data-testid="card-contact-form">
                <CardHeader>
                  <CardTitle className="font-display text-2xl" data-testid="heading-contact-form">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="glass-card border-border"
                          placeholder="Your full name"
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="glass-card border-border"
                          placeholder="your@email.com"
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="glass-card border-border"
                        placeholder="What's this about?"
                        data-testid="input-subject"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="glass-card border-border resize-none"
                        placeholder="Tell us how we can help you..."
                        data-testid="textarea-message"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gradient-primary text-primary-foreground font-semibold py-3 hover:scale-105 transition-transform"
                      data-testid="button-submit-form"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Hours & Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Business Hours */}
              <Card className="glass-card border-0" data-testid="card-business-hours">
                <CardHeader>
                  <CardTitle className="font-display text-xl flex items-center" data-testid="heading-business-hours">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0" data-testid={`schedule-${index}`}>
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 glass-effect rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> We typically respond to messages within 2-4 hours during business hours. 
                      For urgent inquiries, please contact us via WhatsApp.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="glass-card border-0" data-testid="card-social-media">
                <CardHeader>
                  <CardTitle className="font-display text-xl" data-testid="heading-social-media">
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Stay updated with our latest fragrances, exclusive offers, and fragrance tips.
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass-card rounded-full hover:bg-white/10"
                      onClick={() => handleSocialClick('Instagram')}
                      data-testid="button-instagram"
                    >
                      <Instagram className="w-5 h-5 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass-card rounded-full hover:bg-white/10"
                      onClick={() => handleSocialClick('TikTok')}
                      data-testid="button-tiktok"
                    >
                      <Send className="w-5 h-5 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass-card rounded-full hover:bg-white/10"
                      onClick={handleWhatsAppContact}
                      data-testid="button-whatsapp-social"
                    >
                      <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map Placeholder */}
              <Card className="glass-card border-0" data-testid="card-location">
                <CardHeader>
                  <CardTitle className="font-display text-xl flex items-center" data-testid="heading-location">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Abuja, Nigeria</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Serving customers across Nigeria
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
