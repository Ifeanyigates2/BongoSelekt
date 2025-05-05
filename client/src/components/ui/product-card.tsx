import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      productId: product.id,
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${product.title} added to your cart`,
      variant: "default",
    });
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
            className="w-full h-48 md:h-56 object-cover"
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
            <div className="font-bold text-lg">₦{product.price.toLocaleString()}</div>
            <div className="text-xs text-success">{product.discountPercentage}% OFF</div>
            <div className="text-xs text-medium line-through">₦{product.originalPrice.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-sm">
          <MapPin size={14} className="mr-1 text-medium" />
          <span className="text-medium">{product.location}</span>
          <div className="ml-auto flex items-center">
            <span className="text-medium">{product.condition}</span>
          </div>
        </div>
        
        <Button 
          className="mt-3 w-full bg-primary hover:bg-primary/90 text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
