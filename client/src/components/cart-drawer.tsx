import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { formatNaira, createWhatsAppLink, createCartWhatsAppMessage } from '@/lib/whatsapp';

export default function CartDrawer() {
  const {
    state,
    updateQuantity,
    removeItem,
    clearCart,
    closeCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (state.items.length === 0) return;

    const cartItems = state.items.map(item => ({
      name: item.name,
      size: item.size,
      price: item.price,
      quantity: item.quantity
    }));

    const message = createCartWhatsAppMessage(cartItems, getTotalPrice());
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
    closeCart();
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="glass-effect backdrop-blur-lg w-full sm:max-w-lg" data-testid="cart-drawer">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center justify-between" data-testid="cart-header">
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart
            </span>
            {totalItems > 0 && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground" data-testid="cart-item-count">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto pr-2" data-testid="cart-items">
            <AnimatePresence>
              {state.items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  data-testid="cart-empty"
                >
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Discover our collection of premium fragrances
                  </p>
                  <Button onClick={closeCart} data-testid="button-continue-shopping">
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="glass-card rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      data-testid={`cart-item-${item.id}`}
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            data-testid={`cart-item-image-${item.id}`}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate" data-testid={`cart-item-name-${item.id}`}>
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground" data-testid={`cart-item-size-${item.id}`}>
                            Size: {item.size}
                          </p>
                          <p className="text-sm font-medium text-accent" data-testid={`cart-item-price-${item.id}`}>
                            {formatNaira(item.price)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 glass-card"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium" data-testid={`cart-item-quantity-${item.id}`}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 glass-card"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-destructive hover:text-destructive/80"
                              onClick={() => removeItem(item.id)}
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Footer */}
          {state.items.length > 0 && (
            <motion.div
              className="pt-4 mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              data-testid="cart-footer"
            >
              <Separator className="mb-4" />
              
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-accent" data-testid="cart-total">
                  {formatNaira(totalPrice)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full gradient-primary text-primary-foreground font-semibold py-3 hover:scale-105 transition-transform"
                  data-testid="button-checkout-whatsapp"
                >
                  <span className="mr-2">💬</span>
                  Checkout on WhatsApp
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="flex-1 glass-card border border-border hover:bg-white/10"
                    data-testid="button-clear-cart"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={closeCart}
                    className="flex-1 glass-card border border-border hover:bg-white/10"
                    data-testid="button-continue-shopping-footer"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
