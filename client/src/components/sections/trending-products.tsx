import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

export function TrendingProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/trending"],
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="p-2 rounded-full border border-gray-300 hover:bg-white"
              onClick={scrollLeft}
            >
              <ArrowLeft size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="p-2 rounded-full border border-gray-300 hover:bg-white"
              onClick={scrollRight}
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
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
        ) : (
          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products?.map((product) => (
              <div key={product.id} className="min-w-[250px] max-w-[300px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link href="/products">
            <Button variant="outline" className="border border-primary text-primary hover:bg-primary hover:text-white font-medium">
              View All Trending Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
