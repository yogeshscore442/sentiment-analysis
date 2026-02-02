import { useState } from 'react';
import { Search, Loader2, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockData';
import type { ProductSearchResult } from '@/services/api';

interface SearchBoxProps {
  onProductSelect?: (product: ProductSearchResult) => void;
}

const SearchBox = ({ onProductSelect }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const filtered = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.platform.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered.length > 0 ? filtered : mockProducts);
    setIsLoading(false);
  };

  const handleProductClick = (product: ProductSearchResult) => {
    onProductSelect?.(product);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for products on Amazon or Flipkart..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 pr-32 text-base rounded-xl border-2 border-border focus:border-primary transition-colors bg-card"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 gradient-hero border-0 hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </form>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {results.length} products found
            </p>
          </div>
          
          <div className="grid gap-3">
            {results.map((product) => (
              <Card
                key={product.id}
                className="p-4 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                onClick={() => handleProductClick(product)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={
                          product.platform === 'amazon'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-primary/10 text-primary'
                        }
                      >
                        {product.platform === 'amazon' ? 'Amazon' : 'Flipkart'}
                      </Badge>
                      <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-positive">
                        ★ {product.rating}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasSearched && (
        <div className="text-center py-8 text-muted-foreground">
          <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">
            Enter a product name or URL to analyze reviews
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;