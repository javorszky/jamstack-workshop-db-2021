import { useEffect, useState } from "react";
import { useCart } from "./useCart";

function CartMenu() {
  const cart = useCart();
  const [count, setCount] = useState(Object.keys(cart.cartItems).length);

  useEffect(() => {
    setCount(Object.keys(cart.cartItems).length);
  }, [cart.cartItems]);

  return <p>Cart ({count})</p>;
}

export default CartMenu;
