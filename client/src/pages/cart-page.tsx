import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ArrowLeft, 
  CreditCard,
  Truck, 
  Shield 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CartPage() {
  const { cartItems, cartTotal, updateCartItem, removeFromCart, isLoading } = useCart();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Set page title
  useEffect(() => {
    document.title = "Your Cart - Bongo Selekt";
  }, []);

  // Calculate additional charges
  const shippingFee = 1500; // ₦1,500 shipping fee
  const totalWithShipping = cartTotal + shippingFee - couponDiscount;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Enter a coupon code",
        description: "Please enter a valid coupon code to apply a discount",
        variant: "destructive",
      });
      return;
    }

    // Mock coupon code functionality
    if (couponCode.toUpperCase() === "BONGO10") {
      const discount = Math.round(cartTotal * 0.1); // 10% discount
      setCouponDiscount(discount);
      setIsCouponApplied(true);
      toast({
        title: "Coupon applied!",
        description: "10% discount has been applied to your order",
        variant: "default",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired",
        variant: "destructive",
      });
    }
  };

  // Mock checkout function - would be replaced with actual implementation
  const handleCheckout = () => {
    toast({
      title: "Redirecting to payment",
      description: "You'll be redirected to complete your purchase",
      variant: "default",
    });
    // In a real implementation, this would redirect to a payment page
  };

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your cart</p>
          <Link href="/auth">
            <Button className="bg-primary">Sign In</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="flex py-4 border-b">
                        <Skeleton className="h-20 w-20 rounded-md mr-4" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-1/3 mb-2" />
                          <Skeleton className="h-4 w-1/4 mb-2" />
                          <Skeleton className="h-4 w-1/5" />
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-5 w-20 mb-2 ml-auto" />
                          <Skeleton className="h-8 w-24 ml-auto" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-1/2 mb-4" />
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex justify-between mb-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    ))}
                    <Skeleton className="h-10 w-full mt-4" />
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to your cart and come back!</p>
              <Link href="/products">
                <Button className="bg-primary">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="hidden md:flex text-sm text-gray-500 mb-4">
                      <div className="w-1/2">Product</div>
                      <div className="w-1/6 text-center">Price</div>
                      <div className="w-1/6 text-center">Quantity</div>
                      <div className="w-1/6 text-center">Total</div>
                    </div>
                    
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center py-4 border-b">
                        {/* Product Info */}
                        <div className="flex w-full md:w-1/2 mb-4 md:mb-0">
                          <div className="relative">
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.title} 
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <button 
                              className="absolute -top-2 -right-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-full p-1"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="ml-4">
                            <Link href={`/products/${item.product.id}`}>
                              <h3 className="font-medium hover:text-primary">{item.product.title}</h3>
                            </Link>
                            <p className="text-sm text-gray-500">{item.product.category}</p>
                            <p className="text-sm text-gray-500">{item.product.condition}</p>
                          </div>
                        </div>
                        
                        {/* Price - Mobile */}
                        <div className="flex justify-between w-full md:hidden mb-4">
                          <div className="text-sm text-gray-500">Price:</div>
                          <div className="font-medium">₦{item.product.price.toLocaleString()}</div>
                        </div>
                        
                        {/* Price - Desktop */}
                        <div className="hidden md:block w-1/6 text-center">
                          <div className="font-medium">₦{item.product.price.toLocaleString()}</div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between w-full md:w-1/6 md:justify-center mb-4 md:mb-0">
                          <div className="text-sm text-gray-500 md:hidden">Quantity:</div>
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-l-md"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </Button>
                            <div className="h-8 w-10 flex items-center justify-center border-y text-sm">
                              {item.quantity}
                            </div>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-r-md"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Total - Mobile */}
                        <div className="flex justify-between w-full md:hidden">
                          <div className="text-sm text-gray-500">Total:</div>
                          <div className="font-medium">₦{(item.product.price * item.quantity).toLocaleString()}</div>
                        </div>
                        
                        {/* Total - Desktop */}
                        <div className="hidden md:block w-1/6 text-center font-medium">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between p-6 pt-0">
                    <Link href="/products">
                      <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Cart Summary */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₦{cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping Fee</span>
                        <span className="font-medium">₦{shippingFee.toLocaleString()}</span>
                      </div>
                      {isCouponApplied && (
                        <div className="flex justify-between text-success">
                          <span>Discount</span>
                          <span>-₦{couponDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₦{totalWithShipping.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {/* Coupon Input */}
                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-medium">Coupon Code</label>
                      <div className="flex gap-2">
                        <Input 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          disabled={isCouponApplied}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleApplyCoupon}
                          disabled={isCouponApplied}
                        >
                          Apply
                        </Button>
                      </div>
                      {isCouponApplied && (
                        <p className="text-sm text-success">Coupon applied successfully!</p>
                      )}
                    </div>
                    
                    {/* Checkout Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button className="w-full bg-primary" size="lg">
                          <CreditCard size={16} className="mr-2" />
                          Proceed to Checkout
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>Checkout</SheetTitle>
                          <SheetDescription>
                            Complete your purchase securely
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-6">
                          <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex gap-2">
                                <img 
                                  src={item.product.imageUrl} 
                                  alt={item.product.title} 
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{item.product.title}</p>
                                  <div className="flex justify-between text-sm text-gray-500">
                                    <span>₦{item.product.price.toLocaleString()} x {item.quantity}</span>
                                    <span>₦{(item.product.price * item.quantity).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span>₦{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shipping</span>
                              <span>₦{shippingFee.toLocaleString()}</span>
                            </div>
                            {isCouponApplied && (
                              <div className="flex justify-between text-success">
                                <span>Discount</span>
                                <span>-₦{couponDiscount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-bold">
                              <span>Total</span>
                              <span>₦{totalWithShipping.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          {/* Checkout Form - In a real app, this would have payment fields */}
                          <div className="space-y-4 mt-6">
                            <Button 
                              className="w-full bg-primary" 
                              size="lg"
                              onClick={handleCheckout}
                            >
                              Pay ₦{totalWithShipping.toLocaleString()}
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
                
                {/* Additional Information */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="text-primary mt-0.5" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">Fast Delivery</h4>
                      <p className="text-xs text-gray-600">2-5 business days within Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="text-primary mt-0.5" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">Satisfaction Guaranteed</h4>
                      <p className="text-xs text-gray-600">14-day return policy on all items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
  );
}
