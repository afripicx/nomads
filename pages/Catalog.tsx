import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingBag,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";

type Currency = "USD" | "KES";

interface Product {
  id: number;
  name: string;
  tribe: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
}

export default function Catalog() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedTribes, setSelectedTribes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Exchange rate (1 USD = ~129 KES as of 2024)
  const exchangeRate = 129;

  const tribes = [
    "Maasai",
    "Turkana",
    "Samburu",
    "Rendile",
    "Borana",
    "Somali",
  ];

  const categories = [
    "Jewelry",
    "Clothing",
    "Baskets",
    "Carvings",
    "Musical Instruments",
    "Home Décor",
  ];

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Maasai Beaded Necklace",
      tribe: "Maasai",
      category: "Jewelry",
      price: 89,
      originalPrice: 120,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 24,
      isNew: true,
    },
    {
      id: 2,
      name: "Turkana Woven Basket",
      tribe: "Turkana",
      category: "Baskets",
      price: 156,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 18,
      isNew: false,
    },
    {
      id: 3,
      name: "Samburu Traditional Shuka",
      tribe: "Samburu",
      category: "Clothing",
      price: 203,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 31,
      isNew: false,
    },
    {
      id: 4,
      name: "Borana Drum",
      tribe: "Borana",
      category: "Musical Instruments",
      price: 340,
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      reviews: 12,
      isNew: true,
    },
    {
      id: 5,
      name: "Rendile Carved Stool",
      tribe: "Rendile",
      category: "Home Décor",
      price: 285,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 19,
      isNew: false,
    },
    {
      id: 6,
      name: "Somali Incense Burner",
      tribe: "Somali",
      category: "Home Décor",
      price: 67,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.4,
      reviews: 27,
      isNew: false,
    },
    {
      id: 7,
      name: "Maasai Leather Sandals",
      tribe: "Maasai",
      category: "Clothing",
      price: 45,
      originalPrice: 65,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      reviews: 16,
      isNew: false,
    },
    {
      id: 8,
      name: "Turkana Clay Pot",
      tribe: "Turkana",
      category: "Home Décor",
      price: 78,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.3,
      reviews: 22,
      isNew: true,
    },
  ];

  // Currency conversion functions
  const convertPrice = (priceUSD: number): number => {
    return currency === "USD" ? priceUSD : Math.round(priceUSD * exchangeRate);
  };

  const formatPrice = (priceUSD: number): string => {
    const convertedPrice = convertPrice(priceUSD);
    return currency === "USD"
      ? `$${convertedPrice}`
      : `KSh ${convertedPrice.toLocaleString()}`;
  };

  const getCurrencySymbol = (): string => {
    return currency === "USD" ? "$" : "KSh";
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Apply tribe filter
    if (selectedTribes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTribes.includes(product.tribe),
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // Apply price range filter
    if (priceRange) {
      const convertedProducts = filtered.map((product) => ({
        ...product,
        convertedPrice: convertPrice(product.price),
      }));

      filtered = convertedProducts.filter((product) => {
        const price = product.convertedPrice;
        switch (priceRange) {
          case "0-50":
            return currency === "USD" ? price <= 50 : price <= 6450;
          case "50-100":
            return currency === "USD"
              ? price > 50 && price <= 100
              : price > 6450 && price <= 12900;
          case "100-200":
            return currency === "USD"
              ? price > 100 && price <= 200
              : price > 12900 && price <= 25800;
          case "200-500":
            return currency === "USD"
              ? price > 200 && price <= 500
              : price > 25800 && price <= 64500;
          case "500+":
            return currency === "USD" ? price > 500 : price > 64500;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    return filtered;
  }, [selectedTribes, selectedCategories, priceRange, sortBy, currency]);

  const handleTribeChange = (tribe: string, checked: boolean) => {
    if (checked) {
      setSelectedTribes((prev) => [...prev, tribe]);
    } else {
      setSelectedTribes((prev) => prev.filter((t) => t !== tribe));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  const clearAllFilters = () => {
    setSelectedTribes([]);
    setSelectedCategories([]);
    setPriceRange("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedTribes.length > 0 ||
    selectedCategories.length > 0 ||
    priceRange !== "";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="bg-sahara-sand py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Our Collections
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover authentic handcrafted treasures from Kenya's nomadic
                tribes. Each piece is carefully selected and ethically sourced.
              </p>
            </div>

            {/* Currency Selector */}
            <div className="mt-6 lg:mt-0">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Currency:
                  </span>
                  <Select
                    value={currency}
                    onValueChange={(value: Currency) => setCurrency(value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">🇺🇸 USD</SelectItem>
                      <SelectItem value="KES">🇰🇪 KES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  1 USD ≈ {exchangeRate} KES
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-sm text-foreground">
                    Active Filters:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTribes.map((tribe) => (
                      <Badge
                        key={tribe}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tribe}
                        <button
                          onClick={() => handleTribeChange(tribe, false)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryChange(category, false)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {priceRange && (
                      <Badge variant="secondary" className="text-xs">
                        {currency === "USD"
                          ? `$${priceRange.replace("-", " - $").replace("+", "+")}`
                          : `KSh ${priceRange.replace("0-50", "0 - 6,450").replace("50-100", "6,450 - 12,900").replace("100-200", "12,900 - 25,800").replace("200-500", "25,800 - 64,500").replace("500+", "64,500+")}`}
                        <button
                          onClick={() => setPriceRange("")}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Tribe Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-foreground">Tribe</h4>
                <div className="space-y-2">
                  {tribes.map((tribe) => (
                    <div key={tribe} className="flex items-center space-x-2">
                      <Checkbox
                        id={tribe}
                        checked={selectedTribes.includes(tribe)}
                        onCheckedChange={(checked) =>
                          handleTribeChange(tribe, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={tribe}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {tribe}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-foreground">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={category}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-foreground">
                  Price Range ({getCurrencySymbol()})
                </h4>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {currency === "USD" ? (
                      <>
                        <SelectItem value="0-50">$0 - $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="100-200">$100 - $200</SelectItem>
                        <SelectItem value="200-500">$200 - $500</SelectItem>
                        <SelectItem value="500+">$500+</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="0-50">KSh 0 - 6,450</SelectItem>
                        <SelectItem value="50-100">
                          KSh 6,450 - 12,900
                        </SelectItem>
                        <SelectItem value="100-200">
                          KSh 12,900 - 25,800
                        </SelectItem>
                        <SelectItem value="200-500">
                          KSh 25,800 - 64,500
                        </SelectItem>
                        <SelectItem value="500+">KSh 64,500+</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedProducts.length} of{" "}
                {allProducts.length} products
                {hasActiveFilters && " (filtered)"}
              </p>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredAndSortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredAndSortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div
                          className={
                            viewMode === "grid"
                              ? "aspect-square"
                              : "aspect-[2/1] sm:aspect-[3/1] lg:aspect-[4/1]"
                          }
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.isNew && (
                            <Badge className="bg-sun-yellow text-tribal-brown">
                              New
                            </Badge>
                          )}
                          <Badge className="bg-olive-green text-white">
                            {product.tribe}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/80 backdrop-blur-sm hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        {product.originalPrice && (
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-earth-red text-white">
                              Save{" "}
                              {formatPrice(
                                product.originalPrice - product.price,
                              )}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "text-sun-yellow fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg text-foreground">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-earth-red hover:bg-earth-red/90 text-white"
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results.
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-earth-red hover:bg-earth-red/90 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-tribal-brown text-tribal-brown hover:bg-tribal-brown hover:text-white"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
