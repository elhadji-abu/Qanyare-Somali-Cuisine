import { CartItem } from './types';

export class ClientStorage {
  private static CART_KEY = 'qanyare-cart';
  private static USER_KEY = 'qanyare-user';
  private static ADMIN_KEY = 'qanyare-admin';

  static getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem(this.CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  }

  static setCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    } catch {
      // Handle storage errors silently
    }
  }

  static clearCart(): void {
    try {
      localStorage.removeItem(this.CART_KEY);
    } catch {
      // Handle storage errors silently
    }
  }

  static getUser(): any {
    try {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  static setUser(user: any): void {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch {
      // Handle storage errors silently
    }
  }

  static clearUser(): void {
    try {
      localStorage.removeItem(this.USER_KEY);
    } catch {
      // Handle storage errors silently
    }
  }

  static getAdmin(): any {
    try {
      const admin = localStorage.getItem(this.ADMIN_KEY);
      return admin ? JSON.parse(admin) : null;
    } catch {
      return null;
    }
  }

  static setAdmin(admin: any): void {
    try {
      localStorage.setItem(this.ADMIN_KEY, JSON.stringify(admin));
    } catch {
      // Handle storage errors silently
    }
  }

  static clearAdmin(): void {
    try {
      localStorage.removeItem(this.ADMIN_KEY);
    } catch {
      // Handle storage errors silently
    }
  }
}
