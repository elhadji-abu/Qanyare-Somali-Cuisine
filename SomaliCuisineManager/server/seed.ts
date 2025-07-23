import { db } from "./db";
import { 
  users, categories, menuItems, orders, reservations, reviews, staff, tables,
  type InsertUser, type InsertCategory, type InsertMenuItem, 
  type InsertOrder, type InsertReservation, type InsertReview,
  type InsertStaff, type InsertTable
} from "@shared/schema";

async function seedDatabase() {
  console.log("Starting database seeding...");

  try {
    // Seed Users
    const usersData: InsertUser[] = [
      {
        username: "admin",
        password: "admin123",
        name: "Admin User",
        email: "admin@qanyare.co.ke",
        phone: "+254700123456",
        isAdmin: true,
      },
      {
        username: "customer1",
        password: "password123",
        name: "Ahmed Hassan",
        email: "ahmed@email.com",
        phone: "+254701234567",
        isAdmin: false,
      },
      {
        username: "customer2", 
        password: "password123",
        name: "Fatima Ali",
        email: "fatima@email.com",
        phone: "+254702345678",
        isAdmin: false,
      }
    ];

    await db.insert(users).values(usersData).onConflictDoNothing();

    // Seed Categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Drinks",
        nameEn: "Drinks",
        nameSo: "Cabitaannada",
        description: "Traditional Somali drinks and beverages",
        isActive: true,
      },
      {
        name: "Main Dishes",
        nameEn: "Main Dishes",
        nameSo: "Cuntada Weyn",
        description: "Traditional Somali main course dishes",
        isActive: true,
      },
      {
        name: "Rice Dishes",
        nameEn: "Rice Dishes", 
        nameSo: "Bariis",
        description: "Various rice preparations",
        isActive: true,
      },
      {
        name: "Bread & Flatbreads",
        nameEn: "Bread & Flatbreads",
        nameSo: "Rooti iyo Canjeero",
        description: "Traditional breads and flatbreads",
        isActive: true,
      }
    ];

    await db.insert(categories).values(categoriesData).onConflictDoNothing();

    // Get categories for foreign key references
    const dbCategories = await db.select().from(categories);
    const drinksCategory = dbCategories.find(c => c.nameEn === "Drinks");
    const mainCategory = dbCategories.find(c => c.nameEn === "Main Dishes");
    const riceCategory = dbCategories.find(c => c.nameEn === "Rice Dishes");
    const breadCategory = dbCategories.find(c => c.nameEn === "Bread & Flatbreads");

    // Seed Menu Items
    const menuItemsData: InsertMenuItem[] = [
      {
        name: "Shaah Somali",
        nameEn: "Somali Tea",
        nameSo: "Shaah Somali",
        description: "Traditional spiced tea with cardamom, cinnamon, and milk",
        price: 150,
        categoryId: drinksCategory?.id || 1,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&h=300&fit=crop",
        isAvailable: true,
        isActive: true,
      },
      {
        name: "Caano Nabad",
        nameEn: "Fresh Camel Milk",
        nameSo: "Caano Nabad", 
        description: "Fresh camel milk served chilled",
        price: 200,
        categoryId: drinksCategory?.id || 1,
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=300&fit=crop",
        isAvailable: true,
        isActive: true,
      },
      {
        name: "Bariis Iskukaris",
        nameEn: "Somali Spiced Rice",
        nameSo: "Bariis Iskukaris",
        description: "Fragrant basmati rice cooked with traditional Somali spices",
        price: 450,
        categoryId: riceCategory?.id || 3,
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=300&fit=crop",
        isAvailable: true,
        isActive: true,
      },
      {
        name: "Suugo Pasta",
        nameEn: "Somali Pasta",
        nameSo: "Suugo Pasta",
        description: "Pasta with traditional Somali meat sauce and spices",
        price: 550,
        categoryId: mainCategory?.id || 2,
        image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=500&h=300&fit=crop",
        isAvailable: true,
        isActive: true,
      },
      {
        name: "Canjeero",
        nameEn: "Flatbread",
        nameSo: "Canjeero",
        description: "Traditional Somali sourdough flatbread served with honey or sugar",
        price: 100,
        categoryId: breadCategory?.id || 4,
        image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&h=300&fit=crop",
        isAvailable: true,
        isActive: true,
      },
      {
        name: "Hilib Ari",
        nameEn: "Grilled Goat Meat",
        nameSo: "Hilib Ari",
        description: "Tender grilled goat meat with traditional spices",
        price: 800,
        categoryId: mainCategory?.id || 2,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=300&fit=crop",
        isAvailable: true,
        isActive: true,
      }
    ];

    await db.insert(menuItems).values(menuItemsData).onConflictDoNothing();

    // Seed Tables
    const tablesData: InsertTable[] = [
      {
        name: "Table 1",
        type: "Regular",
        capacity: 4,
        description: "Small table for 4 people",
        isAvailable: true,
      },
      {
        name: "Table 2", 
        type: "Regular",
        capacity: 6,
        description: "Medium table for 6 people",
        isAvailable: true,
      },
      {
        name: "Family Hall",
        type: "Hall",
        capacity: 20,
        description: "Large family hall for events and gatherings",
        isAvailable: true,
      },
      {
        name: "VIP Room",
        type: "VIP",
        capacity: 8,
        description: "Private VIP room with premium service",
        isAvailable: true,
      }
    ];

    await db.insert(tables).values(tablesData).onConflictDoNothing();

    // Seed Staff
    const staffData: InsertStaff[] = [
      {
        name: "Omar Abdullahi",
        role: "Head Chef",
        email: "omar@qanyare.co.ke",
        phone: "+254703456789",
        isActive: true,
      },
      {
        name: "Amina Mohamed",
        role: "Waitress",
        email: "amina@qanyare.co.ke", 
        phone: "+254704567890",
        isActive: true,
      },
      {
        name: "Hassan Ali",
        role: "Manager",
        email: "hassan@qanyare.co.ke",
        phone: "+254705678901",
        isActive: true,
      }
    ];

    await db.insert(staff).values(staffData).onConflictDoNothing();

    // Seed Reviews
    const reviewsData: InsertReview[] = [
      {
        customerName: "Ahmed Hassan",
        rating: 5,
        comment: "Excellent authentic Somali food! The bariis iskukaris was perfectly spiced.",
        isApproved: true,
      },
      {
        customerName: "Fatima Ali",
        rating: 4,
        comment: "Great atmosphere and friendly service. The canjeero was fresh and delicious.",
        isApproved: true,
      },
      {
        customerName: "Mohamed Omar",
        rating: 5,
        comment: "Best Somali restaurant in Mandera! Highly recommend the hilib ari.",
        isApproved: true,
      }
    ];

    await db.insert(reviews).values(reviewsData).onConflictDoNothing();

    console.log("Database seeding completed successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log("Seeding finished!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

export { seedDatabase };