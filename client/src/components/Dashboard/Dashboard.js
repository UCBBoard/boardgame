import React, { Component } from 'react';
import "./Dashboard.css";
import Axios from "axios";
import Gamelist from "../components/Gamelist";
import Friendslist from "../components/Friendslist";
import Newsfeed from "../components/Newsfeed";

class Dashboard extends Component {
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