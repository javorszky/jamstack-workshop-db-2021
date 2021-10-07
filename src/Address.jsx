import { supabase } from "./supabase";
import { useAuth } from "./useAuth";
function Address(props) {
  const auth = useAuth();
  const deleteThis = () => {
    const { data, error } = await supabase
      .from(props.type + "_addresses")
      .eq("id", props.id);

    if (error) {
      auth.setNotification({
        type: "is-danger",
        message: "Failed to delete address: " + error.message,
      });
      return;
    }
  };
  return (
    <>
      <h3 className="subtitle is-3">an address</h3>
      <button onClick={deleteThis}></button>
    </>
  );
}

export default Address;
