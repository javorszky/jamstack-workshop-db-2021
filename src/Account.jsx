import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";
import { useAuth } from "./useAuth";

import Addresses from "./Addresses";

function Account() {
  const auth = useAuth();
  const [roles, setRoles] = useState({});

  //   const fetchRole = async () => {
  //     const employeeCheck = await supabase
  //       .from("user_relationships")
  //       .select("employee_id", { count: "exact" })
  //       .eq("employee_id", auth.globalSession.user.id);

  //     if (employeeCheck.error) {
  //       auth.setNotification({
  //         type: "is-danger",
  //         message: employeeCheck.error.message,
  //       });
  //       setRoles({});
  //       return;
  //     }

  //     if (employeeCheck.count) {
  //       setRoles({
  //         type: "employee",
  //       });
  //       return;
  //     }

  //     const managerCheck = await supabase
  //       .from("user_relationships")
  //       .select("manager_id, employee_id", { count: "exact" })
  //       .eq("manager_id", auth.globalSession.user.id);

  //     if (managerCheck.error) {
  //       auth.setNotification({
  //         type: "is-danger",
  //         message:
  //           "Error while fetching employees: " + managerCheck.error.message,
  //       });
  //       setRoles({});
  //       return;
  //     }

  //     if (!managerCheck.count) {
  //       setRoles({
  //         type: "manager",
  //         managed: [],
  //       });
  //     }

  //     const redu = managerCheck.data.reduce((previous, current) => {
  //       return previous.push({
  //         id: current.id,
  //         email: current.email,
  //       });
  //     }, []);
  //     setRoles({
  //       type: "manager",
  //       managed: redu,
  //     });
  //   };

  useEffect(() => {
    // fetchRole();
  }, []);

  // const bla = async () => {
  //     const managerCheck = await supabase
  //         .from('user_relationships')
  //         .select(`
  //     employee_id:users(id),
  //     employee_id:users(email)
  //     `)
  //         .eq('manager_id', auth.globalSession.user.id)

  //     console.log(managerCheck)
  // }

  // bla()

  return (
    <>
      <h1 className="title">Account</h1>
      <h2 className="subtitle">
        Your title is {roles.type ? roles.type : "dunno"}?
      </h2>
      <Addresses />
    </>
  );
}

export default Account;
