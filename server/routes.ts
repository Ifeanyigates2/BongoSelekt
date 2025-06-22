import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertProductSchema, insertCartItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);

  // Product routes
  app.get("/api/products", async (req, res, next) => {
    try {
      const { category, search, condition, minPrice, maxPrice } = req.query as {
        category?: string;
        search?: string;
        condition?: string;
        minPrice?: string;
        maxPrice?: string;
      };
      
      const products = await storage.getProducts({
        category,
        search,
        condition,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      });
      
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/products/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/products", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to create a product" });
    }

    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.format() });
      }
      next(error);
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res, next) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to view your cart" });
    }

    try {
      const cartItems = await storage.getCartItems(req.user.id);
      res.json(cartItems);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/cart", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to add items to your cart" });
    }

    try {
      const cartItemData = insertCartItemSchema.parse({
        ...req.body,
        userId: req.user.id,
      });
      
      const cartItem = await storage.addToCart(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.format() });
      }
      next(error);
    }
  });

  app.put("/api/cart/:id", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to update your cart" });
    }

    try {
      const id = parseInt(req.params.id);
      const quantity = req.body.quantity;
      
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be a positive number" });
      }
      
      const cartItem = await storage.updateCartItem(id, req.user.id, quantity);
      
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(cartItem);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/cart/:id", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to remove items from your cart" });
    }

    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id, req.user.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  // Recommended products route
  app.get("/api/recommendations", async (req, res, next) => {
    try {
      const userId = req.isAuthenticated() ? req.user.id : undefined;
      const recommendations = await storage.getRecommendedProducts(userId);
      res.json(recommendations);
    } catch (error) {
      next(error);
    }
  });

  // Trending products route
  app.get("/api/trending", async (req, res, next) => {
    try {
      const trendingProducts = await storage.getTrendingProducts();
      res.json(trendingProducts);
    } catch (error) {
      next(error);
    }
  });

  // Middleware to check admin role
  function requireAdmin(req: any, res: any, next: any) {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    
    if (req.user.role !== "admin") {
      return res.sendStatus(403);
    }
    
    next();
  }

  // Admin routes (protected)
  app.post("/api/admin/products", requireAdmin, async (req, res, next) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res, next) => {
    try {
      const productId = parseInt(req.params.id);
      await storage.deleteProduct(productId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/admin/products/:id", requireAdmin, async (req, res, next) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.updateProduct(productId, req.body);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
