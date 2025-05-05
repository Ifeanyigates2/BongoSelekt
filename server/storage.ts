import { 
  User, InsertUser, 
  Product, InsertProduct, 
  CartItem, InsertCartItem,
  Category, InsertCategory
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Filter options for product queries
interface ProductFilterOptions {
  category?: string;
  search?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(filters?: ProductFilterOptions): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  getTrendingProducts(): Promise<Product[]>;
  getRecommendedProducts(userId?: number): Promise<Product[]>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  
  // Cart methods
  getCartItems(userId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, userId: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number, userId: number): Promise<void>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private categories: Map<number, Category>;
  private userIdCounter: number;
  private productIdCounter: number;
  private cartItemIdCounter: number;
  private categoryIdCounter: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.categories = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.cartItemIdCounter = 1;
    this.categoryIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Seed categories
    this.seedCategories();
    // Seed products
    this.seedProducts();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProducts(filters?: ProductFilterOptions): Promise<Product[]> {
    let products = Array.from(this.products.values());

    if (filters) {
      // Filter by category
      if (filters.category) {
        products = products.filter(product => product.category === filters.category);
      }

      // Filter by search term
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        products = products.filter(product => 
          product.title.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
        );
      }

      // Filter by condition
      if (filters.condition) {
        products = products.filter(product => product.condition === filters.condition);
      }

      // Filter by price range
      if (filters.minPrice !== undefined) {
        products = products.filter(product => product.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        products = products.filter(product => product.price <= filters.maxPrice!);
      }
    }

    return products;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const createdAt = new Date();
    const product: Product = { ...insertProduct, id, createdAt };
    this.products.set(id, product);
    return product;
  }

  async getTrendingProducts(): Promise<Product[]> {
    // In a real app, this would be based on analytics, views, sales, etc.
    // For now, return a subset of products as trending
    const products = Array.from(this.products.values());
    return products.slice(0, 4);
  }

  async getRecommendedProducts(userId?: number): Promise<Product[]> {
    // In a real app, this would use user history, preferences, and AI algorithms
    // For now, return a subset of products as recommended
    const products = Array.from(this.products.values());
    return products.slice(4, 7);
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  // Cart methods
  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    const cartItems = Array.from(this.cartItems.values())
      .filter(item => item.userId === userId);
    
    return cartItems.map(item => {
      const product = this.products.get(item.productId)!;
      return {
        ...item,
        product
      };
    });
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if the product exists
    const product = await this.getProduct(insertItem.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if the item is already in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.userId === insertItem.userId && item.productId === insertItem.productId
    );

    if (existingItem) {
      // Update quantity if it exists
      const updatedItem: CartItem = {
        ...existingItem,
        quantity: existingItem.quantity + insertItem.quantity
      };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    } else {
      // Add new item if it doesn't exist
      const id = this.cartItemIdCounter++;
      const createdAt = new Date();
      const cartItem: CartItem = { ...insertItem, id, createdAt };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItem(id: number, userId: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    
    if (!cartItem || cartItem.userId !== userId) {
      return undefined;
    }
    
    const updatedItem: CartItem = {
      ...cartItem,
      quantity
    };
    
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number, userId: number): Promise<void> {
    const cartItem = this.cartItems.get(id);
    
    if (cartItem && cartItem.userId === userId) {
      this.cartItems.delete(id);
    }
  }

  // Seed data for development
  private seedCategories() {
    const categories: InsertCategory[] = [
      { name: "Furniture", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
      { name: "Electronics", imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
      { name: "Clothing", imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
      { name: "Home Goods", imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
    ];

    categories.forEach(category => {
      const id = this.categoryIdCounter++;
      this.categories.set(id, { ...category, id });
    });
  }

  private seedProducts() {
    const products: InsertProduct[] = [
      {
        title: "Vintage Oak Chair",
        description: "Beautiful vintage oak chair in excellent condition. Perfect for any home.",
        category: "Furniture",
        condition: "Like New",
        price: 22500,
        originalPrice: 55000,
        discountPercentage: 60,
        location: "Lagos",
        isVerified: true,
        isNewWithTags: false,
        imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        sellerId: 1
      },
      {
        title: "Bluetooth Speaker",
        description: "High-quality bluetooth speaker with excellent sound. Barely used.",
        category: "Electronics",
        condition: "Good",
        price: 15800,
        originalPrice: 28500,
        discountPercentage: 45,
        location: "Abuja",
        isVerified: true,
        isNewWithTags: false,
        imageUrl: "https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        sellerId: 1
      },
      {
        title: "Denim Jacket",
        description: "Stylish denim jacket, brand new with tags attached. Never worn.",
        category: "Clothing",
        condition: "Brand New",
        price: 9800,
        originalPrice: 32000,
        discountPercentage: 70,
        location: "Lagos",
        isVerified: false,
        isNewWithTags: true,
        imageUrl: "https://images.unsplash.com/photo-1561053720-76cd73ff22c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        sellerId: 1
      },
      {
        title: "Coffee Table",
        description: "Modern coffee table in excellent condition. Minimal wear and tear.",
        category: "Furniture",
        condition: "Like New",
        price: 18200,
        originalPrice: 40000,
        discountPercentage: 55,
        location: "Port Harcourt",
        isVerified: true,
        isNewWithTags: false,
        imageUrl: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        sellerId: 1
      },
      {
        title: "Leather Sofa",
        description: "Premium leather sofa in excellent condition. Minimal wear and tear.",
        category: "Furniture",
        condition: "Like New",
        price: 45000,
        originalPrice: 120000,
        discountPercentage: 62,
        location: "Lagos",
        isVerified: true,
        isNewWithTags: false,
        imageUrl: "https://images.unsplash.com/photo-1551648827-5c26785be43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        sellerId: 1
      },
      {
        title: "MacBook Pro",
        description: "MacBook Pro in great condition. Minor signs of use but fully functional.",
        category: "Electronics",
        condition: "Good",
        price: 280000,
        originalPrice: 450000,
        discountPercentage: 38,
        location: "Abuja",
        isVerified: true,
        isNewWithTags: false,
        imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        sellerId: 1
      },
      {
        title: "Designer Shoes",
        description: "Brand new designer shoes with tags, never worn.",
        category: "Clothing",
        condition: "Brand New",
        price: 18500,
        originalPrice: 45000,
        discountPercentage: 59,
        location: "Lagos",
        isVerified: false,
        isNewWithTags: true,
        imageUrl: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        sellerId: 1
      }
    ];

    products.forEach(product => {
      const id = this.productIdCounter++;
      const createdAt = new Date();
      this.products.set(id, { ...product, id, createdAt });
    });
  }
}

export const storage = new MemStorage();
