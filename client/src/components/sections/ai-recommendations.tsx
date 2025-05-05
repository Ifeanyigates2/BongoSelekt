import { useQuery } from "@tanstack/react-query";
import { RecommendationCard } from "@/components/ui/recommendation-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const getRecommendationReason = (index: number) => {
  const reasons = [
    "Based on your furniture interest",
    "Similar to recently viewed",
    "Popular in your area"
  ];
  return reasons[index % 3];
};

export function AIRecommendations() {
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["/api/recommendations"],
  });

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
          <div className="flex items-center mb-6">
            <div className="bg-primary/20 p-2 rounded-lg mr-3">
              <Bot className="text-2xl text-primary" size={24} />
            </div>
            <h2 className="text-2xl font-bold">Recommended For You</h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-3">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations?.map((product, index) => (
                <RecommendationCard 
                  key={product.id} 
                  product={product} 
                  reason={getRecommendationReason(index)}
                />
              ))}
            </div>
          )}
          
          <div className="mt-4 text-center">
            <Button variant="link" className="text-primary hover:underline font-medium">
              Improve my recommendations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
