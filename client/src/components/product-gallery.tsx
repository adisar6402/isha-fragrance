import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4" data-testid="product-gallery">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt={`${productName} - Image ${currentImage + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            data-testid={`img-gallery-main-${currentImage}`}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-effect opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-effect opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 w-12 h-12 glass-effect opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid="button-gallery-zoom"
            >
              <Expand className="w-6 h-6 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
            <div className="relative aspect-square w-full">
              <motion.img
                src={images[currentImage]}
                alt={`${productName} - Zoomed`}
                className="w-full h-full object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                data-testid="img-gallery-zoomed"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => setCurrentImage(index)}
                data-testid={`button-gallery-indicator-${index}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <motion.div 
          className="grid grid-cols-4 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          data-testid="gallery-thumbnails"
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImage
                  ? 'border-primary scale-105'
                  : 'border-transparent hover:border-primary/50'
              }`}
              onClick={() => setCurrentImage(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid={`button-thumbnail-${index}`}
            >
              <img
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
