import React, { Component } from 'react';
import "./Dashboard.css";
// import Axios from "axios";
import Gamelist from "../Gamelist";
// import Friendslist from "../Friendslist";
import Newsfeed from "../Newsfeed";
import Nav from "../Nav";


class Dashboard extends Component {

	state = {}

	render () {
		return (
			 <div>
		      <Nav />
		      <div className="container">
		        <div className="row">
		          <Gamelist />
		          <Newsfeed />
		        </div>
		      </div>
		    </div>
		)
	}
}

export default Dashboard;