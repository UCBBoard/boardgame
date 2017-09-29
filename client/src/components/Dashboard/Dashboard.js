import React, { Component } from 'react';
import "./Dashboard.css";
import Axios from "axios";
import Gamelist from "../Gamelist";
import firebase from "firebase";
import Newsfeed from "../Newsfeed";
import HoverButtons from "../HoverButtons";
import Background from "../Background"
import logo from "../../assets/img/logo.png"


class Dashboard extends Component {
	state = {}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			let uid = firebase.auth().currentUser.uid;
			Axios.post("/api/user/" + uid)
				.then((response) => {
    			console.log("searching database for user:" + response);
    	})
      .catch((error) => {
      	console.log(error);
    })
		})
	};

	render () {
		return (
			 <Background backgroundName="dash-background">
			  <div className="center">
			  	<img src={logo} className="siteLogoDash" alt="logo" /><h1 className="logoH1Dash">GameVault</h1>
			  </div>
		      <div className="container dashContainer">
		        <div className="row dashRow">
		          <Gamelist />
		          <Newsfeed />
		        </div>
		      </div>
		      <HoverButtons />
		    </Background>
		)
	}
}

export default Dashboard;