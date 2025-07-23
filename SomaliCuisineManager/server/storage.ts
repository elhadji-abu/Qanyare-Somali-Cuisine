import { 
  users, categories, menuItems, orders, reservations, reviews, staff, tables,
  type User, type InsertUser, type Category, type InsertCategory,
  type MenuItem, type InsertMenuItem, type Order, type InsertOrder,
  type Reservation, type InsertReservation, type Review, type InsertReview,
  type Staff, type InsertStaff, type Table, type InsertTable
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Menu Items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;
  deleteMenuItem(id: number): Promise<boolean>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;
  
  // Reservations
  getReservations(): Promise<Reservation[]>;
  getReservation(id: number): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservation(id: number, reservation: Partial<InsertReservation>): Promise<Reservation | undefined>;
  
  // Reviews
  getReviews(): Promise<Review[]>;
  getApprovedReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;
  
  // Staff
  getStaff(): Promise<Staff[]>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: number, staff: Partial<InsertStaff>): Promise<Staff | undefined>;
  deleteStaff(id: number): Promise<boolean>;
  
  // Tables
  getTables(): Promise<Table[]>;
  createTable(table: InsertTable): Promise<Table>;
  updateTable(id: number, table: Partial<InsertTable>): Promise<Table | undefined>;
  deleteTable(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async updateCategory(id: number, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const [category] = await db
      .update(categories)
      .set(updateData)
      .where(eq(categories.id, id))
      .returning();
    return category || undefined;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Menu Items
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.categoryId, categoryId));
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const [menuItem] = await db
      .insert(menuItems)
      .values(insertMenuItem)
      .returning();
    return menuItem;
  }

  async updateMenuItem(id: number, updateData: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const [menuItem] = await db
      .update(menuItems)
      .set(updateData)
      .where(eq(menuItems.id, id))
      .returning();
    return menuItem || undefined;
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    const result = await db.delete(menuItems).where(eq(menuItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async updateOrder(id: number, updateData: Partial<InsertOrder>): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  // Reservations
  async getReservations(): Promise<Reservation[]> {
    return await db.select().from(reservations);
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation || undefined;
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const [reservation] = await db
      .insert(reservations)
      .values(insertReservation)
      .returning();
    return reservation;
  }

  async updateReservation(id: number, updateData: Partial<InsertReservation>): Promise<Reservation | undefined> {
    const [reservation] = await db
      .update(reservations)
      .set(updateData)
      .where(eq(reservations.id, id))
      .returning();
    return reservation || undefined;
  }

  // Reviews
  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async getApprovedReviews(): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.isApproved, true));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(insertReview)
      .returning();
    return review;
  }

  async updateReview(id: number, updateData: Partial<InsertReview>): Promise<Review | undefined> {
    const [review] = await db
      .update(reviews)
      .set(updateData)
      .where(eq(reviews.id, id))
      .returning();
    return review || undefined;
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await db.delete(reviews).where(eq(reviews.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Staff
  async getStaff(): Promise<Staff[]> {
    return await db.select().from(staff);
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const [staffMember] = await db
      .insert(staff)
      .values(insertStaff)
      .returning();
    return staffMember;
  }

  async updateStaff(id: number, updateData: Partial<InsertStaff>): Promise<Staff | undefined> {
    const [staffMember] = await db
      .update(staff)
      .set(updateData)
      .where(eq(staff.id, id))
      .returning();
    return staffMember || undefined;
  }

  async deleteStaff(id: number): Promise<boolean> {
    const result = await db.delete(staff).where(eq(staff.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Tables
  async getTables(): Promise<Table[]> {
    return await db.select().from(tables);
  }

  async createTable(insertTable: InsertTable): Promise<Table> {
    const [table] = await db
      .insert(tables)
      .values(insertTable)
      .returning();
    return table;
  }

  async updateTable(id: number, updateData: Partial<InsertTable>): Promise<Table | undefined> {
    const [table] = await db
      .update(tables)
      .set(updateData)
      .where(eq(tables.id, id))
      .returning();
    return table || undefined;
  }

  async deleteTable(id: number): Promise<boolean> {
    const result = await db.delete(tables).where(eq(tables.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private menuItems: Map<number, MenuItem> = new Map();
  private orders: Map<number, Order> = new Map();
  private reservations: Map<number, Reservation> = new Map();
  private reviews: Map<number, Review> = new Map();
  private staff: Map<number, Staff> = new Map();
  private tables: Map<number, Table> = new Map();
  
  private currentId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const drinkCategory: Category = {
      id: this.currentId++,
      name: "Drinks",
      nameEn: "Drinks",
      nameSo: "Cabitaan",
      description: "Traditional Somali beverages",
      isActive: true
    };
    this.categories.set(drinkCategory.id, drinkCategory);

    const starterCategory: Category = {
      id: this.currentId++,
      name: "Starters",
      nameEn: "Starters",
      nameSo: "Bilowga",
      description: "Appetizers and light bites",
      isActive: true
    };
    this.categories.set(starterCategory.id, starterCategory);

    const mainCategory: Category = {
      id: this.currentId++,
      name: "Main Course",
      nameEn: "Main Course",
      nameSo: "Cunto Weyn",
      description: "Traditional main dishes",
      isActive: true
    };
    this.categories.set(mainCategory.id, mainCategory);

    // Initialize menu items
    const menuItemsData = [
      {
        name: "Shaah Somali",
        nameEn: "Somali Tea",
        nameSo: "Shaah Somali",
        description: "Aromatic tea with milk, cardamom, and cinnamon",
        price: 150,
        categoryId: drinkCategory.id,
        image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
      },
      {
        name: "Casiir Canbe",
        nameEn: "Mango Juice",
        nameSo: "Casiir Canbe",
        description: "Freshly squeezed mango juice from local fruits",
        price: 200,
        categoryId: drinkCategory.id,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
      },
      {
        name: "Sambuus",
        nameEn: "Samosas",
        nameSo: "Sambuus",
        description: "Crispy pastries filled with spiced meat and vegetables",
        price: 300,
        categoryId: starterCategory.id,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
      },
      {
        name: "Canjeero",
        nameEn: "Flatbread",
        nameSo: "Canjeero",
        description: "Traditional fermented pancake, perfect for sharing",
        price: 250,
        categoryId: starterCategory.id,
        image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
      },
      {
        name: "Bariis Iskukaris",
        nameEn: "Spiced Rice",
        nameSo: "Bariis Iskukaris",
        description: "Fragrant rice cooked with aromatic spices and tender meat",
        price: 800,
        categoryId: mainCategory.id,
        image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
      },
      {
        name: "Hilib Shiilan",
        nameEn: "Grilled Meat",
        nameSo: "Hilib Shiilan",
        description: "Tender grilled meat seasoned with traditional Somali spices",
        price: 1200,
        categoryId: mainCategory.id,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
      },
      {
        name: "Baasto",
        nameEn: "Somali Pasta",
        nameSo: "Baasto",
        description: "Pasta with traditional Somali sauce and vegetables",
        price: 650,
        categoryId: mainCategory.id,
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
      }
    ];

    menuItemsData.forEach(item => {
      const menuItem: MenuItem = {
        id: this.currentId++,
        ...item,
        isAvailable: true,
        isActive: true
      };
      this.menuItems.set(menuItem.id, menuItem);
    });

    // Initialize tables
    const tablesData = [
      { name: "Table 1", capacity: 4, type: "table", description: "Perfect for small families" },
      { name: "Table 2", capacity: 6, type: "table", description: "Ideal for medium groups" },
      { name: "Table 3", capacity: 8, type: "table", description: "Great for larger parties" },
      { name: "Main Hall", capacity: 50, type: "hall", description: "Perfect for weddings and large celebrations" },
      { name: "Private Hall", capacity: 20, type: "hall", description: "Intimate setting for special occasions" }
    ];

    tablesData.forEach(table => {
      const tableItem: Table = {
        id: this.currentId++,
        ...table,
        isAvailable: true
      };
      this.tables.set(tableItem.id, tableItem);
    });

    // Initialize staff
    const staffData = [
      { name: "Ahmed Hassan Mohamed", role: "Manager", phone: "+254 712 345 678", email: "ahmed@qanyare.com" },
      { name: "Fatima Omar Ali", role: "Head Chef", phone: "+254 733 456 789", email: "fatima@qanyare.com" },
      { name: "Ibrahim Mohamed Aden", role: "Waiter", phone: "+254 722 567 890", email: "ibrahim@qanyare.com" },
      { name: "Halima Abdi Hassan", role: "Cashier", phone: "+254 711 678 901", email: "halima@qanyare.com" }
    ];

    staffData.forEach(member => {
      const staffMember: Staff = {
        id: this.currentId++,
        ...member,
        isActive: true,
        createdAt: new Date()
      };
      this.staff.set(staffMember.id, staffMember);
    });

    // Initialize some sample reviews
    const reviewsData = [
      {
        customerName: "Ahmed Hassan",
        rating: 5,
        comment: "The best Somali restaurant in Mandera! The Bariis Iskukaris reminded me of my grandmother's cooking. Authentic flavors and warm hospitality.",
        isApproved: true
      },
      {
        customerName: "Fatima Mohamed",
        rating: 5,
        comment: "Perfect venue for our family celebration! The staff was incredibly welcoming and the traditional dishes were absolutely delicious.",
        isApproved: true
      },
      {
        customerName: "Ibrahim Ali",
        rating: 5,
        comment: "Outstanding service and truly authentic Somali cuisine. The Hilib Shiilan was perfectly seasoned and the atmosphere is very cultural.",
        isApproved: true
      },
      {
        customerName: "Zeinab Omar",
        rating: 5,
        comment: "The best place in Mandera for authentic Somali food! Every dish tells a story of our rich culture. Highly recommended!",
        isApproved: true
      },
      {
        customerName: "Mohamed Abdi",
        rating: 5,
        comment: "Excellent venue for our wedding celebration! The team helped us create a memorable experience with traditional Somali hospitality.",
        isApproved: true
      },
      {
        customerName: "Halima Isse",
        rating: 5,
        comment: "The Canjeero here is just like my mother used to make! Clean environment, friendly staff, and prices that won't break the bank.",
        isApproved: true
      }
    ];

    reviewsData.forEach(review => {
      const reviewItem: Review = {
        id: this.currentId++,
        ...review,
        createdAt: new Date()
      };
      this.reviews.set(reviewItem.id, reviewItem);
    });

    // Initialize admin user
    const adminUser: User = {
      id: this.currentId++,
      username: "admin",
      password: "password123",
      name: "Admin User",
      email: "admin@qanyare.com",
      phone: "+254 712 345 678",
      isAdmin: true,
      createdAt: new Date()
    };
    this.users.set(adminUser.id, adminUser);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(cat => cat.isActive);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    
    const updated = { ...category, ...updateData };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Menu item methods
  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(item => item.isActive);
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.categoryId === categoryId && item.isActive
    );
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentId++;
    const item: MenuItem = { ...insertItem, id };
    this.menuItems.set(id, item);
    return item;
  }

  async updateMenuItem(id: number, updateData: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const item = this.menuItems.get(id);
    if (!item) return undefined;
    
    const updated = { ...item, ...updateData };
    this.menuItems.set(id, updated);
    return updated;
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    return this.menuItems.delete(id);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, updateData: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updated = { ...order, ...updateData };
    this.orders.set(id, updated);
    return updated;
  }

  // Reservation methods
  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.currentId++;
    const reservation: Reservation = {
      ...insertReservation,
      id,
      createdAt: new Date()
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async updateReservation(id: number, updateData: Partial<InsertReservation>): Promise<Reservation | undefined> {
    const reservation = this.reservations.get(id);
    if (!reservation) return undefined;
    
    const updated = { ...reservation, ...updateData };
    this.reservations.set(id, updated);
    return updated;
  }

  // Review methods
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getApprovedReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.isApproved)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentId++;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  async updateReview(id: number, updateData: Partial<InsertReview>): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const updated = { ...review, ...updateData };
    this.reviews.set(id, updated);
    return updated;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }

  // Staff methods
  async getStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values()).filter(member => member.isActive);
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const id = this.currentId++;
    const staff: Staff = {
      ...insertStaff,
      id,
      createdAt: new Date()
    };
    this.staff.set(id, staff);
    return staff;
  }

  async updateStaff(id: number, updateData: Partial<InsertStaff>): Promise<Staff | undefined> {
    const staff = this.staff.get(id);
    if (!staff) return undefined;
    
    const updated = { ...staff, ...updateData };
    this.staff.set(id, updated);
    return updated;
  }

  async deleteStaff(id: number): Promise<boolean> {
    return this.staff.delete(id);
  }

  // Table methods
  async getTables(): Promise<Table[]> {
    return Array.from(this.tables.values());
  }

  async createTable(insertTable: InsertTable): Promise<Table> {
    const id = this.currentId++;
    const table: Table = { ...insertTable, id };
    this.tables.set(id, table);
    return table;
  }

  async updateTable(id: number, updateData: Partial<InsertTable>): Promise<Table | undefined> {
    const table = this.tables.get(id);
    if (!table) return undefined;
    
    const updated = { ...table, ...updateData };
    this.tables.set(id, updated);
    return updated;
  }

  async deleteTable(id: number): Promise<boolean> {
    return this.tables.delete(id);
  }
}

export const storage = new DatabaseStorage();
