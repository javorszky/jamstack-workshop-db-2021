import { useState } from "react";
import { useCart } from "./useCart";

function Product(props) {
  const product = props.product;
  const [qty, setQty] = useState(1);

  const cart = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();

    cart.addItem(product, qty);
    // console.log("adding " + qty + " of product " + product.id + " to the cart");
  };

  console.log("pid", product.id);
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        <input
          type="number"
          min="1"
          max="5"
          step="1"
          value={qty}
          onChange={(e) => {
            setQty(e.target.value);
          }}
        />
      </td>
      <td>$ {(product.price / 100).toFixed(2)}</td>
      <td>
        <button onClick={handleAddToCart}>add to cart</button>
      </td>
    </tr>
  );
}

export default Product;
