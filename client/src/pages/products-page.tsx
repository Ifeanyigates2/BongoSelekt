import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { Product } from "@shared/schema";

export default function ProductsPage() {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  
  // Filter state
  const [category, setCategory] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = "Shop Products - Bongo Selekt";
  }, []);

  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);

    if (params.has("category")) {
      setCategory(params.get("category") || "");
    }
    
    if (params.has("search")) {
      setSearchTerm(params.get("search") || "");
    }
    
    if (params.has("condition")) {
      setCondition(params.get("condition") || "");
    }
    
    if (params.has("minPrice") && params.has("maxPrice")) {
      const min = parseInt(params.get("minPrice") || "0");
      const max = parseInt(params.get("maxPrice") || "500000");
      setPriceRange([min, max]);
    }
  }, [location]);

  // Fetch products with filters
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["/api/products", category, searchTerm, condition, priceRange],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (category) params.append("category", category);
      if (searchTerm) params.append("search", searchTerm);
      if (condition) params.append("condition", condition);
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
      
      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const resetFilters = () => {
    setCategory("");
    setCondition("");
    setSearchTerm("");
    setPriceRange([0, 500000]);
    applyFilters(true);
  };

  const applyFilters = (isReset = false) => {
    const params = new URLSearchParams();
    
    if (!isReset) {
      if (category) params.append("category", category);
      if (searchTerm) params.append("search", searchTerm);
      if (condition) params.append("condition", condition);
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
    }
    
    const newUrl = `/products${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({}, '', newUrl);
    
    // Force query refetch
    window.location.href = newUrl;
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <Header />
      
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              {category ? `${category}` : "All Products"}
              {searchTerm ? ` - Results for "${searchTerm}"` : ""}
            </h1>
            <p className="text-gray-600 mt-2">
              Discover curated secondhand treasures at amazing prices
            </p>
          </div>
          
          {/* Mobile Filter Toggle */}
          <div className="block md:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={toggleFilters}
            >
              <SlidersHorizontal size={18} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop (always visible) & Mobile (toggleable) */}
            <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-sm text-primary"
                  >
                    Reset All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-10"
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <SearchIcon size={18} />
                      </Button>
                    </form>
                  </div>
                  
                  <Accordion type="single" collapsible defaultValue="category">
                    {/* Categories */}
                    <AccordionItem value="category">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${category === "" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCategory("")}
                          >
                            All Categories
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${category === "Furniture" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCategory("Furniture")}
                          >
                            Furniture
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${category === "Electronics" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCategory("Electronics")}
                          >
                            Electronics
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${category === "Clothing" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCategory("Clothing")}
                          >
                            Clothing
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${category === "Home Goods" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCategory("Home Goods")}
                          >
                            Home Goods
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Condition */}
                    <AccordionItem value="condition">
                      <AccordionTrigger>Condition</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${condition === "" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCondition("")}
                          >
                            Any Condition
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${condition === "Brand New" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCondition("Brand New")}
                          >
                            Brand New
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${condition === "Like New" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCondition("Like New")}
                          >
                            Like New
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${condition === "Good" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCondition("Good")}
                          >
                            Good
                          </div>
                          <div 
                            className={`cursor-pointer rounded-md px-2 py-1 ${condition === "Fair" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                            onClick={() => setCondition("Fair")}
                          >
                            Fair
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Price Range */}
                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex flex-col space-y-2">
                            <label className="text-sm">Min Price: ₦{priceRange[0].toLocaleString()}</label>
                            <input 
                              type="range" 
                              min={0} 
                              max={500000} 
                              step={5000}
                              value={priceRange[0]}
                              onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                              className="w-full"
                            />
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label className="text-sm">Max Price: ₦{priceRange[1].toLocaleString()}</label>
                            <input 
                              type="range"
                              min={0} 
                              max={500000} 
                              step={5000}
                              value={priceRange[1]}
                              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                              className="w-full"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm">₦{priceRange[0].toLocaleString()}</div>
                            <div className="text-sm">₦{priceRange[1].toLocaleString()}</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Button 
                    className="w-full bg-primary"
                    onClick={() => applyFilters()}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <Skeleton className="h-48 md:h-56 w-full" />
                      <div className="p-3">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : isError ? (
                <div className="bg-red-50 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-medium text-red-800 mb-2">Oops! Something went wrong</h3>
                  <p className="text-red-600">We couldn't load the products. Please try again later.</p>
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-10 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
