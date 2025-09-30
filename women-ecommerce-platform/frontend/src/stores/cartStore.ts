import { create } from 'zustand';
import { Cart, CartItem } from '../types';

interface CartState {
  cart: Cart | null;
  itemCount: number;
  total: number;
  setCart: (cart: Cart) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  itemCount: 0,
  total: 0,
  
  setCart: (cart: Cart) => {
    set({ cart });
    get().calculateTotals();
  },
  
  addItem: (item: CartItem) => {
    const { cart } = get();
    if (cart) {
      const existingItemIndex = cart.items.findIndex(
        i => i.productId === item.productId && i.size === item.size && i.color === item.color
      );
      
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
      
      set({ cart: { ...cart } });
      get().calculateTotals();
    }
  },
  
  removeItem: (itemId: string) => {
    const { cart } = get();
    if (cart) {
      cart.items = cart.items.filter(item => item.id !== itemId);
      set({ cart: { ...cart } });
      get().calculateTotals();
    }
  },
  
  updateItemQuantity: (itemId: string, quantity: number) => {
    const { cart } = get();
    if (cart) {
      const item = cart.items.find(i => i.id === itemId);
      if (item) {
        item.quantity = quantity;
        set({ cart: { ...cart } });
        get().calculateTotals();
      }
    }
  },
  
  clearCart: () => {
    set({ cart: null, itemCount: 0, total: 0 });
  },
  
  calculateTotals: () => {
    const { cart } = get();
    if (cart) {
      const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      set({ itemCount, total });
    }
  },
}));