import Signup from './Signup'
import Home from './Home'
import Nav from './Nav'
import Login from './Login'

import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <section className="container">
      <Nav />
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </section>
  )
}

export default App
