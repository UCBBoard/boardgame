import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Nav from "./components/Nav";
// import Gamelist from "./components/Gamelist";
// import Friendslist from "./components/Friendslist";
// import Newsfeed from "./components/Newsfeed";
import Dashboard from "./components/Dashboard";
import Splash from "./components/Splash";

const App = () =>
  <Router>
    <Switch>
      <Route exact path="/dash" component={Dashboard} />
      <Route path="/" component={Splash} />
    </Switch>
  </Router>

export default App;
