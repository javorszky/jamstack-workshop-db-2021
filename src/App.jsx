import Signup from './Signup'
import Home from './Home'
import Nav from './Nav'

import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default App
