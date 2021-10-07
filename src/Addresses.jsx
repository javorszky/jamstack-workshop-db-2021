import { useState } from "react";
import { supabase } from "./supabase.js";
import { useAuth } from "./useAuth";

function Addresses() {
  const auth = useAuth();
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);

  const getShipping = async () => {
    const sha = await getAddress("shipping");
    const ba = await getAddress("billing");

    setShippingAddresses(addresses.concat(data));
  };

  const getAddress = async (type) => {
    const { data, error } = await supabase
      .from("addresses")
      .eq("user_id", auth.globalSession.user.id)
      .eq("type", type);

    if (error) {
      auth.setNotification({
        type: "is-danger",
        message: "There was an issue grabbing the addresses",
      });
      return [];
    }

    return data;
  };

  function RenderAddresses(props) {
    if (!props.addresses || props.addresses.length) {
      return <li>No {props.type} addresses held.</li>;
    }
    return props.addresses.map((item) => {
      return (
        <li>
          {item.address1}
          <br />
          {item.address2}
          <br />
          {item.city}
          <br />
          {item.state}
          <br />
          {item.country}
        </li>
      );
    });
  }

  return (
    <>
      <h2 className="subtitle">Address stuff</h2>
      <div className="shipping">
        <h3 className="subtitle is-3">Shipping</h3>
        <RenderAddresses type="shipping" addresses={sha} />
      </div>
      <div className="billing">
        <h3 className="subtitle is-3">Billing</h3>
        <RenderAddresses type="billing" addresses={ba} />
      </div>
    </>
  );
}

export default Addresses;
