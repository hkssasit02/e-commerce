import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Product } from '@/types';
import { cartService } from '@/services/cartService';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product, quantity: number, variants?: { [key: string]: string }) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItemsCount: () => number;
  getCartTotal: () => number;
}

type CartAction =
  | { type: 'CART_LOADING' }
  | { type: 'CART_LOADED'; payload: Cart }
  | { type: 'CART_ERROR'; payload: string }
  | { type: 'CART_CLEARED' }
  | { type: 'ITEM_ADDED'; payload: CartItem }
  | { type: 'ITEM_UPDATED'; payload: { itemId: string; quantity: number } }
  | { type: 'ITEM_REMOVED'; payload: string };

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'CART_LOADED':
      return {
        ...state,
        cart: action.payload,
        isLoading: false,
        error: null,
      };
    case 'CART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CART_CLEARED':
      return {
        ...state,
        cart: null,
        isLoading: false,
        error: null,
      };
    case 'ITEM_ADDED':
      if (!state.cart) return state;
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, action.payload],
        },
      };
    case 'ITEM_UPDATED':
      if (!state.cart) return state;
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map(item =>
            item.id === action.payload.itemId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        },
      };
    case 'ITEM_REMOVED':
      if (!state.cart) return state;
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(item => item.id !== action.payload),
        },
      };
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      // Load cart from localStorage for guest users
      loadGuestCart();
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    try {
      dispatch({ type: 'CART_LOADING' });
      const cart = await cartService.getCart();
      dispatch({ type: 'CART_LOADED', payload: cart });
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message || 'Failed to load cart' });
    }
  };

  const loadGuestCart = () => {
    const guestCart = localStorage.getItem('guestCart');
    if (guestCart) {
      try {
        const cart = JSON.parse(guestCart);
        dispatch({ type: 'CART_LOADED', payload: cart });
      } catch (error) {
        localStorage.removeItem('guestCart');
      }
    }
  };

  const saveGuestCart = (cart: Cart) => {
    if (!isAuthenticated) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  };

  const addToCart = async (product: Product, quantity: number, variants?: { [key: string]: string }) => {
    try {
      dispatch({ type: 'CART_LOADING' });
      const cartItem = await cartService.addToCart(product.id, quantity, variants);
      dispatch({ type: 'ITEM_ADDED', payload: cartItem });
      
      if (!isAuthenticated && state.cart) {
        saveGuestCart(state.cart);
      }
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message || 'Failed to add item to cart' });
      throw error;
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      await cartService.updateCartItem(itemId, quantity);
      dispatch({ type: 'ITEM_UPDATED', payload: { itemId, quantity } });
      
      if (!isAuthenticated && state.cart) {
        saveGuestCart(state.cart);
      }
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message || 'Failed to update cart item' });
      throw error;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await cartService.removeFromCart(itemId);
      dispatch({ type: 'ITEM_REMOVED', payload: itemId });
      
      if (!isAuthenticated && state.cart) {
        saveGuestCart(state.cart);
      }
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message || 'Failed to remove item from cart' });
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      dispatch({ type: 'CART_CLEARED' });
      
      if (!isAuthenticated) {
        localStorage.removeItem('guestCart');
      }
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message || 'Failed to clear cart' });
      throw error;
    }
  };

  const getCartItemsCount = (): number => {
    if (!state.cart) return 0;
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    if (!state.cart) return 0;
    return state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    cart: state.cart,
    isLoading: state.isLoading,
    error: state.error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartItemsCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};