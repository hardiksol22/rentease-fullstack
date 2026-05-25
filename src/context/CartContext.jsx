import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, chosenTenure = 3) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, tenure: chosenTenure } : item
        );
      }
      return [...prev, { ...product, tenure: chosenTenure }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateTenure = (productId, newTenure) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, tenure: newTenure } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      let factor = 1.0;
      if (item.tenure === 6) factor = 0.95;
      if (item.tenure === 12) factor = 0.90;
      return acc + (item.monthlyRent * factor);
    }, 0);
  };

  const calculateTotalDeposit = () => {
    return cartItems.reduce((acc, item) => acc + (item.deposit || item.monthlyRent * 3), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateTenure,
      clearCart,
      calculateSubtotal,
      calculateTotalDeposit
    }}>
      {children}
    </CartContext.Provider>
  );
};