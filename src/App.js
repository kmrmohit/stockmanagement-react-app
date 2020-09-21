import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Manager from "./components/manager.component";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navigation">
          <Link className="nav-link" to={"/sign-in"}>
            Login
          </Link>
          <Link className="nav-link" to={"/sign-up"}>
            Sign up
          </Link>
        </div>

        <div className="auth-wrapper">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>

        <div className="use-cases">
          <Route path="/manager" component={Manager} />
        </div>
      </div>
    </Router>
  );
}

export default App;
