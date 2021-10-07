import Signup from "./Signup";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Notification from "./Notification";
import Account from "./Account";
import Products from "./Products";

import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./useAuth";
import CartList from "./Cart";

function App() {
  const auth = useAuth();

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.globalSession ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };
  return (
    <section className="container">
      <Nav />
      {Object.keys(auth.notification).length ? <Notification /> : ""}
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/account">
          <Account />
        </PrivateRoute>
        <Route path="/products">
          <Products />
        </Route>
        <PrivateRoute path="/cart">
          <CartList />
        </PrivateRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </section>
  );
}

export default App;
