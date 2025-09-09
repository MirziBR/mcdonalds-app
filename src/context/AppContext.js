import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

const initialState = {
  cart: [],
  user: null,
  selectedAddress: null,
  orders: [],
  favorites: [],
};

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_USER: 'SET_USER',
  SET_SELECTED_ADDRESS: 'SET_SELECTED_ADDRESS',
  ADD_ORDER: 'ADD_ORDER',
  SET_ORDERS: 'SET_ORDERS',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  LOAD_STATE: 'LOAD_STATE',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case ACTIONS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ACTIONS.SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };

    case ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: [], // Limpar carrinho após pedido
      };

    case ACTIONS.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case ACTIONS.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case ACTIONS.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
      };

    case ACTIONS.LOAD_STATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    loadStoredData();
  }, []);

  // Salvar dados importantes quando o estado mudar
  useEffect(() => {
    saveDataToStorage();
  }, [state.cart, state.favorites, state.selectedAddress]);

  const loadStoredData = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const storedAddress = await AsyncStorage.getItem('selectedAddress');
      const storedUser = await AsyncStorage.getItem('user');

      const loadedData = {};
      
      if (storedCart) loadedData.cart = JSON.parse(storedCart);
      if (storedFavorites) loadedData.favorites = JSON.parse(storedFavorites);
      if (storedAddress) loadedData.selectedAddress = JSON.parse(storedAddress);
      if (storedUser) loadedData.user = JSON.parse(storedUser);

      if (Object.keys(loadedData).length > 0) {
        dispatch({ type: ACTIONS.LOAD_STATE, payload: loadedData });
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const saveDataToStorage = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(state.cart));
      await AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      if (state.selectedAddress) {
        await AsyncStorage.setItem('selectedAddress', JSON.stringify(state.selectedAddress));
      }
      if (state.user) {
        await AsyncStorage.setItem('user', JSON.stringify(state.user));
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  // Actions
  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateCartQuantity = (productId, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_CART_QUANTITY, payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
  };

  const setSelectedAddress = (address) => {
    dispatch({ type: ACTIONS.SET_SELECTED_ADDRESS, payload: address });
  };

  const addOrder = (order) => {
    dispatch({ type: ACTIONS.ADD_ORDER, payload: order });
  };

  const addToFavorites = (productId) => {
    if (!state.favorites.includes(productId)) {
      dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload: productId });
    }
  };

  const removeFromFavorites = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITES, payload: productId });
  };

  // Computed values
  const cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = state.cart.reduce((count, item) => count + item.quantity, 0);
  const deliveryFee = cartTotal > 30 ? 0 : 4.90;
  const finalTotal = cartTotal + deliveryFee;

  const value = {
    // State
    ...state,
    
    // Computed
    cartTotal,
    cartItemsCount,
    deliveryFee,
    finalTotal,
    
    // Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setUser,
    setSelectedAddress,
    addOrder,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};
