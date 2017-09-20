import React from "react";
import Nav from "./components/Nav";
import Gamelist from "./components/Gamelist";
import Friendslist from "./components/Friendslist";
import Newsfeed from "./components/Newsfeed";

const App = () => 
  <div>
    <Nav />

    <div className="container">
    	<div className="row">
    		<Gamelist />
    		<Friendslist />
    		<Newsfeed />
    	</div>
    </div>
    
  </div>;

export default App;
