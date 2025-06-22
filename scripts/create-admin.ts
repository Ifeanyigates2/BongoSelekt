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

async function createAdminUser() {
  console.log("Creating admin user...");

  try {
    const hashedPassword = await hashPassword("admin123");

    const [adminUser] = await db.insert(users).values({
      username: "admin",
      email: "admin@bongoselekt.com",
      password: hashedPassword,
      fullName: "Admin User",
      role: "admin",
      location: "Lagos",
    }).onConflictDoNothing().returning();

    if (adminUser) {
      console.log("Admin user created successfully!");
      console.log("Username: admin");
      console.log("Password: admin123");
      console.log("Email: admin@bongoselekt.com");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();