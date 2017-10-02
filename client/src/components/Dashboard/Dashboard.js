import React, { Component } from 'react';
import "./Dashboard.css";
import Axios from "axios";
import Gamelist from "../Gamelist";
import firebase from "firebase";
import Newsfeed from "../Newsfeed";
import HoverButtons from "../HoverButtons";
import Background from "../Background"
import Discord from "../Discord"
import logo from "../../assets/img/logo.png"
import LevelBar from "../LevelBar";


class Dashboard extends Component {

	state = {
		// uid: "",
		// state will be passed into hoverbuttons component as prop to render correct material-icon based on if user has notifications
		notifications:[]
	}

	componentDidMount() {
		const elem = document.querySelector(".modal-overlay")
		if(elem) elem.remove()
		firebase.auth().onAuthStateChanged((user) => {
			if (firebase.auth().currentUser.uid){
				let uid = firebase.auth().currentUser.uid;
					Axios.post("/api/user/" + uid)
						.then((response) => {
		    			console.log("searching database for user:" + response);
		    	})
		      .catch((error) => {
		      	// console.log(error);
		    })
			}
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
		      <LevelBar />
		      <Discord />
		    </Background>
		)
	}
}

export default Dashboard;