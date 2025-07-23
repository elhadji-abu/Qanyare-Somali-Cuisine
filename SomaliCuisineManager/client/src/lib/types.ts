export interface CartItem {
  id: number;
  name: string;
  nameEn: string;
  nameSo: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface AuthUser {
  id: number;
  username: string;
  name: string;
  email?: string;
  phone?: string;
  isAdmin: boolean;
}

export interface AnalyticsStats {
  totalOrders: number;
  totalReservations: number;
  totalRevenue: number;
  totalCustomers: number;
  totalReviews: number;
  avgRating: number;
  totalStaff: number;
}
