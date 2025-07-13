import { createContext, useContext, useReducer } from "react";

// Helper functions for session storage
const saveToSessionStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to session storage:', error);
  }
};

const loadFromSessionStorage = (key, defaultValue) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from session storage:', error);
    return defaultValue;
  }
};

const clearSessionStorage = () => {
  try {
    sessionStorage.removeItem('cartState');
  } catch (error) {
    console.error('Error clearing session storage:', error);
  }
};

// Load initial state from session storage
const initialState = loadFromSessionStorage('cartState', {
  items: [],
  totalItems: 0,
  totalPrice: 0,
});

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      
      if (existingItem) {
        const toBeUpdatedItem = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        newState = {
          ...state,
          items: toBeUpdatedItem,
          totalPrice: state.totalPrice + action.payload.price,
          totalItems: state.totalItems + 1,
        };
      } else {
        const newCartItem = {
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.name,
          price: action.payload.price,
          description: action.payload.description,
          quantity: 1,
        };

        newState = {
          ...state,
          items: [...state.items, newCartItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
      break;

    case "REMOVE_CART_ITEM":
      const requiredItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!requiredItem) {
        return state;
      }

      if (requiredItem.quantity === 1) {
        const updatedCartItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        newState = {
          ...state,
          items: updatedCartItems,
          totalPrice: state.totalPrice - action.payload.price,
          totalItems: state.totalItems - 1,
        };
      } else {
        const updatedArray = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        newState = {
          ...state,
          items: updatedArray,
          totalPrice: state.totalPrice - action.payload.price,
          totalItems: state.totalItems - 1,
        };
      }
      break;

    case "CLEAR_CART":
      newState = {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
      break;

    default:
      return state;
  }

  // Save to session storage whenever state changes
  saveToSessionStorage('cartState', newState);
  return newState;
};

export const cartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId, price) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: { id: productId, price } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    clearSessionStorage(); // Also clear from session storage
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const getTotalPrice = () => {
    return state.totalPrice.toFixed(2);
  };

  const getTotalItems = () => {
    return state.totalItems;
  };

  const getCartItems = () => {
    return state.items;
  };

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isInCart,
    getTotalPrice,
    getTotalItems,
    getCartItems
  };

  return (
    <cartContext.Provider value={value}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};