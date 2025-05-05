import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, User, ShoppingCart } from "lucide-react";

const categories = [
  { name: "All", path: "/products" },
  { name: "Furniture", path: "/products?category=Furniture" },
  { name: "Electronics", path: "/products?category=Electronics" },
  { name: "Clothing", path: "/products?category=Clothing" },
  { name: "Home Goods", path: "/products?category=Home%20Goods" },
  { name: "Accessories", path: "/products?category=Accessories" },
];

export default function Header() {
  const [search, setSearch] = useState("");
  const [location, navigate] = useLocation();
  
  // Simple placeholder for auth/cart functionality until we fix the context issue
  const user: { username: string } | null = null;
  const cartItemCount = 0;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = async () => {
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-bold text-2xl">Bongo</span>
              <span className="text-secondary font-bold text-2xl">Selekt</span>
            </Link>
          </div>
          
          {/* Search bar - Medium screens and up */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search for furniture, electronics, clothing..."
                className="w-full py-2 px-4 rounded-l-md focus:ring-primary focus:border-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-l-none rounded-r-md"
              >
                <Search size={20} />
              </Button>
            </form>
          </div>
          
          {/* Navigation icons */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="text-dark hover:text-primary">
              <Heart size={24} />
            </Link>
            
            {user ? (
              <div className="relative group">
                <Button variant="ghost" className="p-0">
                  <User size={24} />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Signed in as<br />
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <hr />
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" className="p-0">
                  <User size={24} />
                </Button>
              </Link>
            )}
            
            <Link href="/cart" className="text-dark hover:text-primary relative">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Search bar - Mobile only */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 rounded-l-md focus:ring-primary focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button 
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-l-none rounded-r-md"
            >
              <Search size={20} />
            </Button>
          </form>
        </div>
        
        {/* Category navigation */}
        <nav className="overflow-x-auto whitespace-nowrap pb-2 -mx-4 px-4">
          <div className="inline-flex items-center space-x-6">
            {categories.map((category, index) => {
              const isActive = 
                (category.name === "All" && location === "/products") ||
                (category.path !== "/products" && location.startsWith(category.path));
              
              return (
                <Link 
                  key={index} 
                  href={category.path}
                  className={`font-medium py-2 border-b-2 ${
                    isActive
                      ? "text-dark border-primary"
                      : "text-medium hover:text-primary border-transparent hover:border-primary"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
