import { db } from "../server/db";
import { users, products, categories } from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  // Seed categories
  const categoriesData = [
    { name: "Furniture", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Electronics", imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Clothing", imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Home Goods", imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
  ];

  await db.insert(categories).values(categoriesData).onConflictDoNothing();
  console.log("Categories seeded");

  // Create a test user first
  const [testUser] = await db.insert(users).values({
    username: "seller1",
    email: "seller1@example.com",
    password: "hashedpassword123",
    fullName: "Test Seller"
  }).onConflictDoNothing().returning();

  const sellerId = testUser?.id || 1;

  // Seed products
  const productsData = [
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
      sellerId
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
      sellerId
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
      sellerId
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
      sellerId
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
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      sellerId
    },
    {
      title: "Designer Handbag",
      description: "Authentic designer handbag in mint condition. Originally purchased from boutique.",
      category: "Clothing",
      condition: "Like New",
      price: 35000,
      originalPrice: 85000,
      discountPercentage: 59,
      location: "Abuja",
      isVerified: true,
      isNewWithTags: false,
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      sellerId
    },
    {
      title: "Gaming Laptop",
      description: "High-performance gaming laptop with RTX graphics. Excellent for gaming and work.",
      category: "Electronics",
      condition: "Good",
      price: 285000,
      originalPrice: 450000,
      discountPercentage: 37,
      location: "Lagos",
      isVerified: true,
      isNewWithTags: false,
      imageUrl: "https://images.unsplash.com/photo-1593640408182-31174c76c1de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      sellerId
    }
  ];

  await db.insert(products).values(productsData).onConflictDoNothing();
  console.log("Products seeded");

  console.log("Database seeding completed!");
}

seedDatabase().catch(console.error);