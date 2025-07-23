import { useState, useEffect } from 'react';
import { CartItem } from '@/lib/types';
import { ClientStorage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedCart = ClientStorage.getCart();
    setCart(savedCart);
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      
      let updatedCart: CartItem[];
      if (existingItem) {
        updatedCart = currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...currentCart, { ...item, quantity: 1 }];
      }

      ClientStorage.setCart(updatedCart);
      return updatedCart;
    });
    
    toast({
      title: "Added to cart",
      description: `${item.nameEn} has been added to your cart.`,
    });
  };

  const removeFromCart = (id: number) => {
    setCart(currentCart => {
      const updatedCart = currentCart.filter(item => item.id !== id);
      ClientStorage.setCart(updatedCart);
      return updatedCart;
    });
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(currentCart => {
      const updatedCart = currentCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      ClientStorage.setCart(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    ClientStorage.clearCart();
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
}
