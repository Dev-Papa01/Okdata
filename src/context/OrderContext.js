import React, { createContext, useContext, useState } from 'react';
import { useCart } from './CartContext';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { clearCart, cartItems, getCartTotal } = useCart();

  const generateOrderId = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const placeOrder = (shippingInfo) => {
    const newOrder = {
      id: generateOrderId(),
      items: [...cartItems],
      total: getCartTotal(),
      status: 'pending',
      date: new Date().toISOString(),
      shippingInfo,
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: 'cancelled' }
          : order
      )
    );
  };

  const replaceOrder = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    if (!order) return null;

    const newOrder = {
      ...order,
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: 'pending'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder;
  };

  const getOrderHistory = () => {
    return [...orders].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  };

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const value = {
    orders,
    placeOrder,
    cancelOrder,
    replaceOrder,
    getOrderHistory,
    getOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
