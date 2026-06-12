import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProductStock } from '@/data/inventory';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleDrawer: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const stock = getProductStock(item.id);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        if (existing.quantity >= stock) {
          return prev;
        }
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: Math.min(i.quantity + 1, stock) } : i
        );
      }
      if (stock <= 0) {
        return prev;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const stock = getProductStock(id);
    const targetQuantity = Math.min(quantity, stock);
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: targetQuantity } : i))
    );
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext value={{
      cartItems,
      isDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      toggleDrawer,
      clearCart,
    }}>
      {children}
    </CartContext>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
