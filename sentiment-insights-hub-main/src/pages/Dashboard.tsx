import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RefreshCw, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SearchBox from '@/components/SearchBox';
import ChartSection from '@/components/ChartSection';
import ReviewTable from '@/components/ReviewTable';
import { mockProducts } from '@/data/mockData';
import type { ProductSearchResult } from '@/services/api';

const Dashboard = () => {
  const location = useLocation();
  const initialProduct = location.state?.product as ProductSearchResult | undefined;
  
  const [selectedProduct, setSelectedProduct] = useState<ProductSearchResult | undefined>(
    initialProduct || mockProducts[0]
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('7d');

  const handleProductSelect = (product: ProductSearchResult) => {
    setSelectedProduct(product);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // In production, this would generate a CSV/PDF report
    const data = {
      product: selectedProduct?.name,
      exportDate: new Date().toISOString(),
      // ... other data
    };
    console.log('Exporting data:', data);
    alert('Export functionality will download a detailed report');
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              {selectedProduct
                ? `Analyzing: ${selectedProduct.name}`
                : 'Search for a product to view analytics'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range */}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>

            {/* Refresh */}
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            {/* Export */}
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Search Products</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchBox onProductSelect={handleProductSelect} />
          </CardContent>
        </Card>

        {/* Selected Product Info */}
        {selectedProduct && (
          <Card className="mb-8 border-primary/30 animate-scale-in">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-1">{selectedProduct.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="capitalize">{selectedProduct.platform}</span>
                    <span>•</span>
                    <span>{selectedProduct.price}</span>
                    <span>•</span>
                    <span>★ {selectedProduct.rating}</span>
                    <span>•</span>
                    <span>{selectedProduct.reviewCount.toLocaleString()} reviews</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        <div className="mb-8">
          <ChartSection />
        </div>

        {/* Review Table */}
        <ReviewTable />
      </div>
    </div>
  );
};

export default Dashboard;
