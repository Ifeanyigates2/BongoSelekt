import { Link } from "wouter";
import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="group block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-32 md:h-40 overflow-hidden">
        <img 
          src={category.imageUrl} 
          alt={`${category.name} category`} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
        <h3 className="absolute bottom-3 left-3 text-white font-semibold">{category.name}</h3>
      </div>
    </Link>
  );
}
