import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";
import { useAuth } from "./useAuth";

import Addresses from "./Addresses";

function Account() {
  const auth = useAuth();
  const [roles, setRoles] = useState({});

  return (
    <>
      <h1 className="title">Account</h1>

      <Addresses />
    </>
  );
}

export default Account;
