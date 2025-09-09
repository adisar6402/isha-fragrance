import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { formatNaira, createWhatsAppLink, createProductWhatsAppMessage } from '@/lib/whatsapp';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const defaultSize = product.sizes[0];
  
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const message = createProductWhatsAppMessage(
      product.name,
      defaultSize.size,
      defaultSize.price
    );
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      name: product.name,
      price: defaultSize.price,
      size: defaultSize.size,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <motion.div
      className="product-card glass-card rounded-2xl p-6 group cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
            data-testid={`img-product-${product.id}`}
          />
          
          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge === 'Best Seller' ? 'default' : 'secondary'}
                  className={`text-xs font-semibold ${
                    badge === 'Best Seller' 
                      ? 'gradient-primary text-primary-foreground' 
                      : badge === 'New'
                      ? 'bg-accent/20 text-accent'
                      : 'bg-destructive/20 text-destructive'
                  }`}
                  data-testid={`badge-${badge.toLowerCase().replace(' ', '-')}-${product.id}`}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 w-10 h-10 glass-card opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle wishlist functionality
            }}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground" data-testid={`text-notes-${product.id}`}>
            {product.families.join(' • ')}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-accent" data-testid={`text-price-${product.id}`}>
              {formatNaira(defaultSize.price)}
            </span>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 hover-elevate"
                onClick={handleAddToCart}
                data-testid={`button-add-cart-${product.id}`}
              >
                <ShoppingBag className="w-4 h-4" />
              </Button>
              
              <Button
                className="gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
                onClick={handleWhatsAppOrder}
                data-testid={`button-buy-now-${product.id}`}
              >
                Buy Now
              </Button>
            </div>
          </div>

          {!product.inStock && (
            <div className="text-center">
              <Badge variant="destructive" className="text-xs" data-testid={`badge-out-of-stock-${product.id}`}>
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
