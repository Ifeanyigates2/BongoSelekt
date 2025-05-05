import { useQuery } from "@tanstack/react-query";
import { CategoryCard } from "@/components/ui/category-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-32 md:h-40 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
