import { useRef } from "react";
import Product from "./Product";
import { useCart } from "./useCart";

function CartList() {
  const cart = useCart();
  const total = useRef(0);

  const ItemList = () => {
    if (Object.keys(cart.cartItems).length === 0) {
      return (
        <tr>
          <td colSpan="4">Your cart is empty</td>
        </tr>
      );
    }

    let items = [];

    for (const [key, value] of Object.entries(cart.cartItems)) {
      console.log("total is", total);
      items.push(value);
    }

    const pmap = items.map((item) => {
      total.current = total.current + (item.qty * item.price) / 100;
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.qty}</td>
          <td>
            $ {Number.parseFloat((item.qty * item.price) / 100).toFixed(2)}
          </td>
        </tr>
      );
    });

    return <>{pmap}</>;
  };

  return (
    <>
      <h1 className="title">hello this is the cart page</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>qty</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <ItemList />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total</td>
            <td>{Number.parseFloat(total.current).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default CartList;
