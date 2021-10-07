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

    item.qty = qty;

    setCartItems((cartItems[item.id] = item));
  };

  useEffect(() => {
    console.log("cart items changed", cartItems);
  }, [cartItems]);

  return [cartItems, setCartItems, addItem];
}
