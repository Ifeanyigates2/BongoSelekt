import { Link } from "wouter";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { Product } from "@shared/schema";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface RecommendationCardProps {
  product: Product;
  reason: string;
}

export function RecommendationCard({ product, reason }: RecommendationCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  // Temporarily disable authentication and cart functionality
  const user = null;

  const handleAddToCart = () => {
    // Simplified version without using context
    toast({
      title: "Sign in required",
      description: "Please sign in to add items to your cart",
      variant: "destructive",
    });
    return;
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast({
        title: "Added to favorites",
        description: `${product.title} added to your favorites`,
        variant: "default",
      });
    }
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-40 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2 flex space-x-1">
          {product.isVerified && (
            <span className="bg-success text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Check size={12} className="mr-1" /> Verified
            </span>
          )}
          {product.isNewWithTags && (
            <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
              New with Tags
            </span>
          )}
        </div>
        <button 
          className={`absolute top-2 left-2 bg-white/90 p-1.5 rounded-full ${isLiked ? 'text-red-500' : 'text-medium hover:text-primary'}`}
          onClick={toggleLike}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-sm text-medium">{product.category}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary">₦{product.price.toLocaleString()}</div>
            <div className="text-xs text-medium line-through">₦{product.originalPrice.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="flex justify-between mt-3">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {reason}
          </span>
          <button className="text-primary hover:text-primary/80" onClick={handleAddToCart}>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
