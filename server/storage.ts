import { 
  users, products, cartItems, categories,
  User, InsertUser, 
  Product, InsertProduct, 
  CartItem, InsertCartItem,
  Category, InsertCategory
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, ilike, and, gte, lte } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

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

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProducts(filters?: ProductFilterOptions): Promise<Product[]> {
    let query = db.select().from(products);
    const conditions = [];

    if (filters) {
      if (filters.category) {
        conditions.push(eq(products.category, filters.category));
      }
      if (filters.search) {
        conditions.push(ilike(products.title, `%${filters.search}%`));
      }
      if (filters.condition) {
        conditions.push(eq(products.condition, filters.condition));
      }
      if (filters.minPrice !== undefined) {
        conditions.push(gte(products.price, filters.minPrice));
      }
      if (filters.maxPrice !== undefined) {
        conditions.push(lte(products.price, filters.maxPrice));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    return await query;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async getTrendingProducts(): Promise<Product[]> {
    return await db.select().from(products).limit(4);
  }

  async getRecommendedProducts(userId?: number): Promise<Product[]> {
    return await db.select().from(products).limit(3).offset(4);
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  // Cart methods
  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    const items = await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        createdAt: cartItems.createdAt,
        product: products
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));

    return items;
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if the item is already in the cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(and(
        eq(cartItems.userId, insertItem.userId),
        eq(cartItems.productId, insertItem.productId)
      ));

    if (existingItem) {
      // Update quantity if it exists
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + insertItem.quantity })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    } else {
      // Add new item if it doesn't exist
      const [cartItem] = await db
        .insert(cartItems)
        .values(insertItem)
        .returning();
      return cartItem;
    }
  }

  async updateCartItem(id: number, userId: number, quantity: number): Promise<CartItem | undefined> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(and(
        eq(cartItems.id, id),
        eq(cartItems.userId, userId)
      ))
      .returning();
    
    return updatedItem || undefined;
  }

  async removeFromCart(id: number, userId: number): Promise<void> {
    await db
      .delete(cartItems)
      .where(and(
        eq(cartItems.id, id),
        eq(cartItems.userId, userId)
      ));
  }
}

export const storage = new DatabaseStorage();