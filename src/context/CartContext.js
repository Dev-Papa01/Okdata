import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();
const API_URL = 'http://localhost:5000/api';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Replace with actual user ID from authentication

  // Fetch cart items on mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      // Log the incoming product object for debugging
      console.log('Adding product to cart:', product);

      // Use product_id instead of id
      const productId = product.product_id || product.id;
      if (!productId) {
        console.error('Product ID not found in:', product);
        throw new Error('Product ID is required');
      }

      const response = await axios.post(`${API_URL}/cart/${userId}/add`, {
        productId: productId,
        quantity: 1
      });

      console.log('Add to cart response:', response.data);
      await fetchCartItems(); // Refresh cart items
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', {
        error: error.response?.data || error.message,
        product: product
      });
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${API_URL}/cart/${userId}/remove/${productId}`);
      await fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(`${API_URL}/cart/${userId}/update`, {
        productId,
        quantity: newQuantity
      });
      await fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart/${userId}/clear`);
      setCartItems([]); // Clear local state
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.product_id === productId || item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
