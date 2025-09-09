import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '@/lib/whatsapp';

export default function WhatsAppFloat() {
  const handleClick = () => {
    const message = createGeneralWhatsAppMessage();
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Button
          onClick={handleClick}
          size="icon"
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
          data-testid="button-whatsapp-float"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
