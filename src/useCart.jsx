import React, { useState, useEffect, useContext, createContext } from "react";

const cartContext = createContext();

export function ProvideCart({ children }) {
  const cart = useProvideCart();
  return <cartContext.Provider value={cart}>{children}</cartContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useCart = () => {
  return useContext(cartContext);
};

// Provider hook that creates auth object and handles state
function useProvideCart() {
  const [cartItems, setCartItems] = useState({});

  const addItem = (item, qty) => {
    const existing = cartItems[item.id];
    if (existing) {
      cartItems[item.id].qty += qty;
    } else {
      item.qty = qty;
      cartItems[item.id] = item;
    }

    const newCI = JSON.parse(JSON.stringify(cartItems));
    setCartItems(newCI);
  };

  return { cartItems, setCartItems, addItem };
}
