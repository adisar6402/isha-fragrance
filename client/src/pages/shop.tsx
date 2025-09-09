import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/product-card';
import products from '@/data/products.json';
import { Product, Filters, SortOption, FragranceFamily } from '@/types/product';

const fragranceFamilies: FragranceFamily[] = ['Floral', 'Oriental', 'Citrus', 'Woody', 'Gourmand', 'Fresh', 'Aquatic'];
const sizes = ['50ml', '100ml'];
const genders = ['Unisex', 'Men', 'Women'];

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 100000],
    gender: [],
    notes: [],
    size: [],
    availability: 'all'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const typedProducts = products as Product[];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = typedProducts.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.families.some(family => family.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }

      // Price filter
      const minPrice = Math.min(...product.sizes.map(s => s.price));
      if (filters.priceRange && (minPrice < filters.priceRange[0] || minPrice > filters.priceRange[1])) {
        return false;
      }

      // Gender filter
      if (filters.gender && filters.gender.length > 0 && !filters.gender.includes(product.gender)) {
        return false;
      }

      // Notes filter
      if (filters.notes && filters.notes.length > 0 && 
          !filters.notes.some(note => product.families.includes(note))) {
        return false;
      }

      // Size filter
      if (filters.size && filters.size.length > 0 && 
          !filters.size.some(size => product.sizes.some(s => s.size === size))) {
        return false;
      }

      // Availability filter
      if (filters.availability === 'inStock' && !product.inStock) {
        return false;
      }
      if (filters.availability === 'outOfStock' && product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.badges?.includes('New') ? 1 : 0) - (a.badges?.includes('New') ? 1 : 0));
        break;
      case 'priceAsc':
        filtered.sort((a, b) => Math.min(...a.sizes.map(s => s.price)) - Math.min(...b.sizes.map(s => s.price)));
        break;
      case 'priceDesc':
        filtered.sort((a, b) => Math.min(...b.sizes.map(s => s.price)) - Math.min(...a.sizes.map(s => s.price)));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [typedProducts, searchTerm, sortBy, filters]);

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      gender: [],
      notes: [],
      size: [],
      availability: 'all'
    });
    setSearchTerm('');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.gender && filters.gender.length > 0) count++;
    if (filters.notes && filters.notes.length > 0) count++;
    if (filters.size && filters.size.length > 0) count++;
    if (filters.availability !== 'all') count++;
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000)) count++;
    return count;
  }, [filters]);

  const FilterContent = () => (
    <div className="space-y-6" data-testid="filter-content">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3" data-testid="filter-title-price">Price Range</h3>
        <div className="px-3">
          <Slider
            value={filters.priceRange || [0, 100000]}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={100000}
            min={0}
            step={1000}
            className="mb-2"
            data-testid="slider-price-range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span data-testid="text-price-min">₦{(filters.priceRange?.[0] || 0).toLocaleString()}</span>
            <span data-testid="text-price-max">₦{(filters.priceRange?.[1] || 100000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Gender */}
      <div>
        <h3 className="font-semibold mb-3" data-testid="filter-title-gender">Gender</h3>
        <div className="space-y-2">
          {genders.map(gender => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={filters.gender?.includes(gender) || false}
                onCheckedChange={(checked) => {
                  const current = filters.gender || [];
                  if (checked) {
                    updateFilter('gender', [...current, gender]);
                  } else {
                    updateFilter('gender', current.filter(g => g !== gender));
                  }
                }}
                data-testid={`checkbox-gender-${gender.toLowerCase()}`}
              />
              <label htmlFor={`gender-${gender}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {gender}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Fragrance Families */}
      <div>
        <h3 className="font-semibold mb-3" data-testid="filter-title-notes">Fragrance Families</h3>
        <div className="space-y-2">
          {fragranceFamilies.map(family => (
            <div key={family} className="flex items-center space-x-2">
              <Checkbox
                id={`family-${family}`}
                checked={filters.notes?.includes(family) || false}
                onCheckedChange={(checked) => {
                  const current = filters.notes || [];
                  if (checked) {
                    updateFilter('notes', [...current, family]);
                  } else {
                    updateFilter('notes', current.filter(f => f !== family));
                  }
                }}
                data-testid={`checkbox-family-${family.toLowerCase()}`}
              />
              <label htmlFor={`family-${family}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {family}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Size */}
      <div>
        <h3 className="font-semibold mb-3" data-testid="filter-title-size">Size</h3>
        <div className="space-y-2">
          {sizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.size?.includes(size) || false}
                onCheckedChange={(checked) => {
                  const current = filters.size || [];
                  if (checked) {
                    updateFilter('size', [...current, size]);
                  } else {
                    updateFilter('size', current.filter(s => s !== size));
                  }
                }}
                data-testid={`checkbox-size-${size}`}
              />
              <label htmlFor={`size-${size}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3" data-testid="filter-title-availability">Availability</h3>
        <Select value={filters.availability} onValueChange={(value) => updateFilter('availability', value)}>
          <SelectTrigger data-testid="select-availability">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" data-testid="option-availability-all">All Products</SelectItem>
            <SelectItem value="inStock" data-testid="option-availability-in-stock">In Stock</SelectItem>
            <SelectItem value="outOfStock" data-testid="option-availability-out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button 
          variant="outline" 
          onClick={clearFilters} 
          className="w-full"
          data-testid="button-clear-filters"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10" data-testid="page-shop">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="heading-shop">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fragrance Collection
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our complete range of premium perfumes, each carefully curated for lasting elegance.
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search fragrances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card border-border"
              data-testid="input-search"
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="lg:hidden glass-card border-border"
                    data-testid="button-mobile-filters"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="glass-effect backdrop-blur-lg">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Results Count */}
              <span className="text-sm text-muted-foreground" data-testid="text-results-count">
                {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-48 glass-card border-border" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity" data-testid="option-sort-popularity">Most Popular</SelectItem>
                  <SelectItem value="newest" data-testid="option-sort-newest">Newest First</SelectItem>
                  <SelectItem value="priceAsc" data-testid="option-sort-price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc" data-testid="option-sort-price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name" data-testid="option-sort-name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex items-center border border-border rounded-lg glass-card">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                  data-testid="button-view-grid"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                  data-testid="button-view-list"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <motion.aside
            className="hidden lg:block w-80 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold" data-testid="heading-filters">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground" data-testid="badge-active-filters">
                    {activeFiltersCount} active
                  </Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </motion.aside>

          {/* Products Grid */}
          <motion.main
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12" data-testid="empty-state">
                <div className="glass-card rounded-2xl p-12">
                  <h3 className="font-display text-2xl font-semibold mb-4">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} data-testid="button-clear-filters-empty">
                    Clear all filters
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                    : 'space-y-6'
                }
                data-testid="products-container"
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
