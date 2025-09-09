export function createWhatsAppLink(message: string): string {
  const phoneNumber = '+2348082201270'; // ISHA'S FRAGRANCE WhatsApp number
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function createProductWhatsAppMessage(
  productName: string,
  size: string,
  price: number
): string {
  return `Hi ISHA'S FRAGRANCE! I want to order: ${productName} – ${size} at ₦${price.toLocaleString()}.`;
}

export function createGeneralWhatsAppMessage(): string {
  return "Hi ISHA'S FRAGRANCE! I'd love to order this perfume:";
}

export function createCartWhatsAppMessage(
  items: Array<{ name: string; size: string; price: number; quantity: number }>,
  total: number
): string {
  let message = "Hi ISHA'S FRAGRANCE! I want to order:\n\n";
  
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ${item.size} x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}\n`;
  });
  
  message += `\nTotal: ₦${total.toLocaleString()}\n\nPlease confirm availability and delivery details.`;
  
  return message;
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}
