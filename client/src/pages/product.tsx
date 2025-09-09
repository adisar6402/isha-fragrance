import { useState, useMemo } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import ProductGallery from '@/components/product-gallery';
import ProductCard from '@/components/product-card';
import products from '@/data/products.json';
import { Product } from '@/types/product';
import { formatNaira, createWhatsAppLink, createProductWhatsAppMessage } from '@/lib/whatsapp';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => {
    return (products as Product[]).find(p => p.slug === slug);
  }, [slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return (products as Product[])
      .filter(p => 
        p.id !== product.id && 
        (p.families.some(family => product.families.includes(family)) || p.gender === product.gender)
      )
      .slice(0, 4);
  }, [product]);

  const selectedPrice = useMemo(() => {
    if (!product || !selectedSize) return product?.sizes[0]?.price || 0;
    const size = product.sizes.find(s => s.size === selectedSize);
    return size?.price || product.sizes[0].price;
  }, [product, selectedSize]);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="product-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop">
            <Button data-testid="button-back-to-shop">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Set default size if not selected
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0].size);
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: selectedPrice,
      size: selectedSize,
      quantity: quantity,
      image: product.image
    });
  };

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before ordering.",
        variant: "destructive"
      });
      return;
    }

    const message = createProductWhatsAppMessage(product.name, selectedSize, selectedPrice);
    const whatsappUrl = createWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10" data-testid="page-product">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/shop">
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="button-back-to-shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductGallery images={product.gallery} productName={product.name} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="flex gap-2" data-testid="product-badges">
                {product.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant={badge === 'Best Seller' ? 'default' : 'secondary'}
                    className={`${
                      badge === 'Best Seller' 
                        ? 'gradient-primary text-primary-foreground' 
                        : badge === 'New'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-destructive/20 text-destructive'
                    }`}
                    data-testid={`badge-${badge.toLowerCase().replace(' ', '-')}`}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title and Price */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2" data-testid="product-title">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4" data-testid="product-families">
                {product.families.join(' • ')} • {product.gender}
              </p>
              <div className="text-3xl font-bold text-accent" data-testid="product-price">
                {formatNaira(selectedPrice)}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed" data-testid="product-description">
              {product.description}
            </p>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4" data-testid="product-details">
              <Card className="glass-card border-0">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold text-sm">Longevity</div>
                  <div className="text-xs text-muted-foreground">{product.longevity}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-0">
                <CardContent className="p-4 text-center">
                  <Award className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="font-semibold text-sm">Sillage</div>
                  <div className="text-xs text-muted-foreground">{product.sillage}</div>
                </CardContent>
              </Card>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2" data-testid="label-size">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="glass-card border-border" data-testid="select-size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem 
                      key={size.size} 
                      value={size.size}
                      data-testid={`option-size-${size.size}`}
                    >
                      {size.size} - {formatNaira(size.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 glass-card border border-border hover:bg-white/10"
                  variant="ghost"
                  disabled={!product.inStock}
                  data-testid="button-add-to-cart"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 gradient-primary text-primary-foreground hover:scale-105 transition-transform"
                  disabled={!product.inStock}
                  data-testid="button-buy-whatsapp"
                >
                  Buy on WhatsApp
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-card border border-border hover:bg-white/10"
                  data-testid="button-wishlist"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-card border border-border hover:bg-white/10"
                  onClick={handleShare}
                  data-testid="button-share"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="p-4 glass-card border border-destructive/20 rounded-lg" data-testid="out-of-stock-notice">
                <div className="text-destructive font-semibold mb-2">Out of Stock</div>
                <p className="text-sm text-muted-foreground">
                  This item is currently unavailable. Please check back later or contact us for more information.
                </p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3 pt-4 border-t border-border" data-testid="product-features">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-primary" />
                <span>Fast & Secure Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Star className="w-4 h-4 text-primary" />
                <span>Premium Quality Oils</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fragrance Notes */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="section-fragrance-notes"
        >
          <h2 className="font-display text-2xl font-bold mb-6">Fragrance Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-accent" data-testid="heading-top-notes">Top Notes</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-top-notes">
                  {product.notes.top.join(', ')}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-primary" data-testid="heading-heart-notes">Heart Notes</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-heart-notes">
                  {product.notes.heart.join(', ')}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-foreground" data-testid="heading-base-notes">Base Notes</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-base-notes">
                  {product.notes.base.join(', ')}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="section-related-products"
          >
            <h2 className="font-display text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
