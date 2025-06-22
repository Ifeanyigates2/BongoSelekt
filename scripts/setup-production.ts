import { db } from "../server/db";
import { users } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function setupProduction() {
  console.log("Setting up production environment...");

  try {
    // Check if admin user exists
    const existingAdmin = await db.select().from(users).where(users.username === "admin").limit(1);
    
    if (existingAdmin.length === 0) {
      console.log("Creating admin user...");
      const hashedPassword = await hashPassword("admin123");

      await db.insert(users).values({
        username: "admin",
        email: "admin@bongoselekt.com",
        password: hashedPassword,
        fullName: "Admin User",
        role: "admin",
        location: "Lagos",
      });

      console.log("✓ Admin user created successfully!");
      console.log("  Username: admin");
      console.log("  Password: admin123");
      console.log("  Email: admin@bongoselekt.com");
    } else {
      console.log("✓ Admin user already exists");
    }

    console.log("✓ Production setup completed successfully!");
    
  } catch (error) {
    console.error("❌ Error during production setup:", error);
    process.exit(1);
  }
}

setupProduction();