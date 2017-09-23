import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Gamelist from "./components/Gamelist";
import Friendslist from "./components/Friendslist";
import Newsfeed from "./components/Newsfeed";

const App = () =>
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/games" component={Gamelist} />
        <Route exact path="/news" component={Newsfeed} />
        <Route exact path="/friends" component={Friendslist} />
      </Switch>
    </div>
  </Router>;

export default App;
