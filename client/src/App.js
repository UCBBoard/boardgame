import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Gamelist from "./components/Gamelist";
import Friendslist from "./components/Friendslist";
import Newsfeed from "./components/Newsfeed";

const App = () => 
  <Router>
    <Switch>
      <Route exact path="dash" component={Dashboard} />
      <Route path="/" component={Splash} />
    <div>
      <Nav />
      <div className="container">
        <div className="row">
          <Gamelist />
          <Newsfeed />
        </div>
      </div>
    </div>
    </Switch>
  </Router>

export default App;
