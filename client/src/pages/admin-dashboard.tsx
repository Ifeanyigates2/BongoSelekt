import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertProductSchema, Product } from "@shared/schema";
import { z } from "zod";
import { 
  Plus, 
  Package, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  LogOut,
  BarChart3
} from "lucide-react";

const productFormSchema = insertProductSchema.extend({
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  originalPrice: z.coerce.number().min(0.01, "Original price must be greater than 0"),
  discountPercentage: z.coerce.number().min(0).max(100, "Discount must be between 0-100%"),
  sellerId: z.coerce.number().min(1, "Seller ID is required"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  // Handle auth with error catching
  let user = null;
  let logoutMutation = null;
  
  try {
    const auth = useAuth();
    user = auth.user;
    logoutMutation = auth.logoutMutation;
  } catch (error) {
    console.log("Auth context not available in AdminDashboard");
  }
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      condition: "Good",
      isVerified: false,
      isNewWithTags: false,
      sellerId: 1,
    },
  });

  const originalPrice = watch("originalPrice");
  const price = watch("price");

  // Auto-calculate discount percentage
  useEffect(() => {
    if (originalPrice && price && originalPrice > 0) {
      const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
      setValue("discountPercentage", Math.max(0, discount));
    }
  }, [originalPrice, price, setValue]);

  // Fetch products
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/products"],
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (data: ProductFormValues) => {
      const response = await apiRequest("POST", "/api/admin/products", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product added",
        description: "Product has been added successfully",
        variant: "default",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding product",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      await apiRequest("DELETE", `/api/admin/products/${productId}`);
    },
    onSuccess: () => {
      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    document.title = "Admin Dashboard - Bongo Selekt";
    
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    if (logoutMutation) {
      logoutMutation.mutate();
    }
    navigate("/admin/login");
  };

  const onSubmit = async (values: ProductFormValues) => {
    addProductMutation.mutate(values);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(productId);
    }
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                BongoSelekt
              </Link>
              <Badge variant="secondary">Admin Panel</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.fullName}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Verified Products</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.isVerified).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Avg. Discount</p>
                  <p className="text-2xl font-bold">
                    {products.length > 0 
                      ? Math.round(products.reduce((acc, p) => acc + p.discountPercentage, 0) / products.length)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="add-product" className="space-y-6">
          <TabsList>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="manage-products">Manage Products</TabsTrigger>
          </TabsList>

          {/* Add Product Tab */}
          <TabsContent value="add-product">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Product Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Vintage Oak Chair"
                        {...register("title")}
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500">{errors.title.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setValue("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select onValueChange={(value) => setValue("condition", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Brand New">Brand New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Lagos, Abuja"
                        {...register("location")}
                        className={errors.location ? "border-red-500" : ""}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-500">{errors.location.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price (₦)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        placeholder="55000"
                        {...register("originalPrice")}
                        className={errors.originalPrice ? "border-red-500" : ""}
                      />
                      {errors.originalPrice && (
                        <p className="text-sm text-red-500">{errors.originalPrice.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Selling Price (₦)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="22500"
                        {...register("price")}
                        className={errors.price ? "border-red-500" : ""}
                      />
                      {errors.price && (
                        <p className="text-sm text-red-500">{errors.price.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...register("imageUrl")}
                        className={errors.imageUrl ? "border-red-500" : ""}
                      />
                      {errors.imageUrl && (
                        <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isVerified"
                          {...register("isVerified")}
                        />
                        <Label htmlFor="isVerified">Verified Product</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isNewWithTags"
                          {...register("isNewWithTags")}
                        />
                        <Label htmlFor="isNewWithTags">New with Tags</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed product description..."
                      rows={4}
                      {...register("description")}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={addProductMutation.isPending}
                  >
                    {addProductMutation.isPending ? "Adding Product..." : "Add Product"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Products Tab */}
          <TabsContent value="manage-products">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Manage Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No products found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={product.imageUrl} 
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">{product.title}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm font-medium">₦{product.price.toLocaleString()}</span>
                                <span className="text-xs text-muted-foreground line-through">
                                  ₦{product.originalPrice.toLocaleString()}
                                </span>
                                <Badge variant={product.isVerified ? "default" : "secondary"}>
                                  {product.isVerified ? "Verified" : "Unverified"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deleteProductMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}