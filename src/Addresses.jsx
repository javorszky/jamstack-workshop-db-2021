import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";
import { useAuth } from "./useAuth";
import AddAddress from "./AddAddress.jsx";
import RenderAddresses from "./RenderAddresses.jsx";

function Addresses() {
  const auth = useAuth();
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);

  const getAddresses = async () => {
    const sha = await getAddress("shipping");
    const ba = await getAddress("billing");
    console.log(sha, "in getaddresses");

    setShippingAddresses(JSON.parse(JSON.stringify(sha)));
    setBillingAddresses(JSON.parse(JSON.stringify(ba)));
  };

  const getAddress = async (type) => {
    const { data, error } = await supabase
      .from("addresses")
      .select()
      .eq("user_id", auth.globalSession.user.id)
      .eq("type", type);

    console.log(data, error, "in getaddress", type);
    if (error) {
      auth.setNotification({
        type: "is-danger",
        message: "There was an issue grabbing the addresses",
      });
      return [];
    }

    return data;
  };

  useEffect(async () => {
    getAddresses();
  }, []);

  return (
    <>
      <h2 className="subtitle">Address stuff</h2>
      <h3 className="subtitle is-3">Add an address</h3>
      <AddAddress />
      <div className="shipping">
        <h3 className="subtitle is-3">Shipping</h3>
        <ul>
          <RenderAddresses type="shipping" addresses={shippingAddresses} />
        </ul>
      </div>
      <div className="billing">
        <h3 className="subtitle is-3">Billing</h3>
        <ul>
          <RenderAddresses type="billing" addresses={billingAddresses} />
        </ul>
      </div>
    </>
  );
}

export default Addresses;
