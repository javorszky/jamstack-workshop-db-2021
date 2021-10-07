import Product from "./Product";

function Products() {
  const products = [
    {
      name: "widgetinator 9000",
      price: 1337,
      id: "w90sss",
      sku: "w90sss-433",
    },
    {
      name: "recombobulat-o-tron 2000",
      price: 9001,
      id: "rot2k",
      sku: "rot2k-bla",
    },
  ];

  const ProductList = () => {
    if (products.length === 0) {
      return (
        <tr>
          <td className="colspan">4There are no products</td>
        </tr>
      );
    }

    const pmap = products.map((product) => {
      return <Product product={product} />;
    });

    return <>{pmap}</>;
  };
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
          <ProductList />
        </tbody>
      </table>
    </>
  );
}

export default Products;
