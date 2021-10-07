import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProvideAuth } from "./use-auth";
import { ProvideCart } from "./useCart";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProvideAuth>
        <ProvideCart>
          <App />
        </ProvideCart>
      </ProvideAuth>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
