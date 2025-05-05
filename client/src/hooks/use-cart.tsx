import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { CartItem as CartItemBase, InsertCartItem, Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./use-auth";

// Extended cart item type with product details
type CartItem = CartItemBase & {
  product?: Product;
};

type CartContextType = {
  cartItems: CartItem[];
  isLoading: boolean;
  error: Error | null;
  addToCart: (item: Omit<InsertCartItem, "userId">) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  cartTotal: number;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  // Use a try-catch block to handle the case where AuthProvider might not be available
  let user = null;
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (error) {
    console.error("Auth context not available:", error);
  }

  const {
    data: cartItems = [],
    error,
    isLoading,
  } = useQuery<CartItem[], Error>({
    queryKey: ["/api/cart"],
    queryFn: async ({ queryKey }) => {
      if (!user) return [];
      
      try {
        const res = await fetch(queryKey[0] as string, {
          credentials: "include",
        });
        
        if (res.status === 401) {
          return [];
        }
        
        if (!res.ok) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        
        return await res.json();
      } catch (error) {
        return [];
      }
    },
    enabled: !!user,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (item: InsertCartItem) => {
      const res = await apiRequest("POST", "/api/cart", item);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add to cart",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const res = await apiRequest("PUT", `/api/cart/${id}`, { quantity });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update cart",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to remove item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addToCart = (item: Omit<InsertCartItem, "userId">) => {
    if (!user) return;
    addToCartMutation.mutate({
      ...item,
      userId: user.id,
    });
  };

  const updateCartItem = (id: number, quantity: number) => {
    updateCartItemMutation.mutate({ id, quantity });
  };

  const removeFromCart = (id: number) => {
    removeFromCartMutation.mutate(id);
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + ((item.product?.price || 0) * (item.quantity || 0)),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
