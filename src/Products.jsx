import Product from "./Product";
import { supabase } from "./supabase";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

function Products() {
  const auth = useAuth();

  const [dynamicProducts, setDynamicProducts] = useState([]);

  // const products = [
  //   {
  //     name: "widgetinator 9000",
  //     price: 1337,
  //     id: "w90sss",
  //     sku: "w90sss-433",
  //   },
  //   {
  //     name: "recombobulat-o-tron 2000",
  //     price: 9001,
  //     id: "rot2k",
  //     sku: "rot2k-bla",
  //   },
  // ];

  const getProducts = async () => {
    const { data, error, count } = await supabase.from("products").select();

    if (error) {
      auth.setNotification({
        type: "is-danger",
        message: "Failed to get products: " + error.message,
      });
      return;
    }

    setDynamicProducts(data);
  };

  const ProductList = (props) => {
    if (props.products.length === 0) {
      return (
        <tr>
          <td className="colspan">There are no products</td>
        </tr>
      );
    }

    const pmap = props.products.map((product) => {
      return <Product key={product.id} product={product} />;
    });

    return <>{pmap}</>;
  };

  useEffect(async () => {
    await getProducts();
  }, []);
  return (
    <>
      <h1 className="title">hello this is the products page</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>qty</th>
            <th>price</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <ProductList products={dynamicProducts} />
        </tbody>
      </table>
    </>
  );
}

export default Products;
