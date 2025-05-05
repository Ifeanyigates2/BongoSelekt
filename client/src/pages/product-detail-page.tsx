import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  Heart, 
  Share2, 
  Check, 
  MapPin, 
  Tag, 
  Truck, 
  ShieldCheck, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = parseInt(params.id);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [, navigate] = useLocation();

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !isNaN(productId),
  });

  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.title} - Bongo Selekt`;
    } else {
      document.title = "Product Details - Bongo Selekt";
    }
  }, [product]);

  // Handle quantity change
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!product) return;
    
    addToCart({
      productId: product.id,
      quantity,
    });

    toast({
      title: "Added to cart",
      description: `${product.title} added to your cart`,
      variant: "default",
    });
  };

  // Handle add to wishlist
  const toggleWishlist = () => {
    setIsLiked(!isLiked);
    if (!isLiked && product) {
      toast({
        title: "Added to wishlist",
        description: `${product.title} added to your wishlist`,
        variant: "default",
      });
    }
  };

  // Handle share product
  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      if (product) {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Product link copied to clipboard",
          variant: "default",
        });
      }
    }
  };

  if (isError) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-red-50 p-6 rounded-lg text-center my-10">
            <h3 className="text-lg font-medium text-red-800 mb-2">Product not found</h3>
            <p className="text-red-600 mb-4">We couldn't find the product you're looking for.</p>
            <Link href="/products">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {isLoading ? (
              <BreadcrumbItem>
                <Skeleton className="h-5 w-20" />
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink href={`/products?category=${product?.category}`}>{product?.category}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem isCurrentPage>
              {isLoading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                <span className="text-muted-foreground">{product?.title}</span>
              )}
            </BreadcrumbItem>
          </Breadcrumb>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full object-cover aspect-square"
                  />
                  {product.isVerified && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-success text-white text-xs px-3 py-1 rounded-full flex items-center">
                        <Check size={12} className="mr-1" /> Verified Quality
                      </span>
                    </div>
                  )}
                  {product.isNewWithTags && (
                    <div className="absolute top-14 right-4">
                      <span className="bg-accent text-white text-xs px-3 py-1 rounded-full">
                        New with Tags
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Details */}
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={`rounded-full ${isLiked ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                      onClick={toggleWishlist}
                    >
                      <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={handleShare}
                    >
                      <Share2 size={20} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center mt-2 text-sm">
                  <MapPin size={16} className="mr-1 text-medium" />
                  <span className="text-medium">{product.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-medium">Condition: {product.condition}</span>
                </div>
                
                <div className="mt-6">
                  <div className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    <div className="text-sm text-success font-medium bg-success/10 px-2 py-0.5 rounded-full">
                      {product.discountPercentage}% OFF
                    </div>
                    <div className="text-sm text-medium line-through ml-3">
                      ₦{product.originalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Tag size={18} className="text-primary mr-2" />
                    <span>Category: {product.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck size={18} className="text-primary mr-2" />
                    <span>Delivery available in {product.location}</span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck size={18} className="text-primary mr-2" />
                    <span>14-day return policy</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <span className="mr-4">Quantity</span>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-l-md"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      <div className="h-8 w-12 flex items-center justify-center border-y">
                        {quantity}
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-r-md"
                        onClick={increaseQuantity}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={handleAddToCart}
                    size="lg"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
          
          {/* Seller information */}
          {!isLoading && product && (
            <div className="mt-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
                  <div className="flex items-center">
                    <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gray-600 font-bold">S</span>
                    </div>
                    <div>
                      <div className="font-medium">Seller #{product.sellerId}</div>
                      <div className="text-sm text-gray-600">Verified Seller</div>
                    </div>
                    <Button className="ml-auto" variant="outline">
                      Contact Seller
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
