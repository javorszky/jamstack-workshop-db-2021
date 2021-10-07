import { useState } from "react";
import { supabase } from "./supabase.js";
import { useAuth } from "./useAuth";

function AddAddress() {
  const auth = useAuth();
  const [aType, setAType] = useState("shipping");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [city, setACity] = useState("");
  const [aState, setAState] = useState("");
  const [aCountry, setACountry] = useState("");
  const insertAddress = async () => {
    const insertData = {
      address1: a1,
      address2: a2,
      city: city,
      state: aState,
      country: aCountry,
      type: aType,
      user_id: auth.globalSession.user.id,
    };

    console.log(insertData);
    const { data, error } = await supabase
      .from("addresses")
      .insert([insertData]);

    console.log("after insertdata", data, error);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        insertAddress();
      }}
    >
      <div className="field">
        <label className="label" htmlFor="a1">
          Address1
        </label>
        <div className="control">
          <input
            value={a1}
            id="a1"
            type="text"
            className="input"
            onChange={(e) => {
              setA1(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="a2">
          Address2
        </label>
        <div className="control">
          <input
            value={a2}
            id="a2"
            type="text"
            className="input"
            onChange={(e) => {
              setA2(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="city">
          City
        </label>
        <div className="control">
          <input
            value={city}
            id="city"
            type="text"
            className="input"
            onChange={(e) => {
              setACity(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="state">
          State
        </label>
        <div className="control">
          <input
            value={aState}
            id="state"
            type="text"
            className="input"
            onChange={(e) => {
              setAState(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="country">
          Country
        </label>
        <div className="control">
          <input
            value={aCountry}
            id="country"
            type="text"
            className="input"
            onChange={(e) => {
              setACountry(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="field">
        <div className="select">
          <select
            value={aType}
            onChange={(e) => {
              setAType(e.target.value);
            }}
          >
            <option value="shipping">Shipping</option>
            <option value="billing">Billing</option>
          </select>
        </div>
      </div>
      <div className="control">
        <button className="button is-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddAddress;
