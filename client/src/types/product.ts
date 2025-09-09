export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sizes: ProductSize[];
  gender: 'Unisex' | 'Men' | 'Women';
  badges?: ('New' | 'Best Seller' | 'Limited Edition')[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  families: FragranceFamily[];
  concentration: number; // Percentage
  longevity: string; // e.g., "8-12 hours"
  sillage: string; // e.g., "Moderate to Heavy"
  image: string;
  gallery: string[];
  inStock: boolean;
  popularity: number; // 1-100
  description: string;
}

export interface ProductSize {
  size: string; // e.g., "50ml", "100ml"
  price: number;
}

export type FragranceFamily = 'Floral' | 'Oriental' | 'Citrus' | 'Woody' | 'Gourmand' | 'Fresh' | 'Aquatic';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export interface Filters {
  priceRange?: [number, number];
  gender?: string[];
  notes?: FragranceFamily[];
  size?: string[];
  availability?: 'inStock' | 'outOfStock' | 'all';
}

export type SortOption = 'popularity' | 'newest' | 'priceAsc' | 'priceDesc' | 'name';
