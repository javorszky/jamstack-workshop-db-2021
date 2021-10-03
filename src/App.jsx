import Signup from './Signup'
import Home from './Home'
import Nav from './Nav'
import Login from './Login'
import Notification from './Notification'

import {
  Switch,
  Route
} from "react-router-dom";
import { useAuth } from './use-auth'

function App() {
  const auth = useAuth()
  return (
    <section className="container">
      <Nav />
      {Object.keys(auth.notification).length ? <Notification /> : ''}
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
