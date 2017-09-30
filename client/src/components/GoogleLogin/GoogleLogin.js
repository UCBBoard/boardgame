import React, { Component } from "react";
import "./GoogleLogin.css"
import {Button} from "react-materialize";
import firebase from "firebase";
import {googleLogin} from "../../helpers/auth.js";
// import Axios from "axios";
// import mongoose from "mongoose";

class GoogleLogin extends Component {

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
	    if (user) {
					let uid = firebase.auth().currentUser.uid;
					console.log("logged in as " + user.displayName + ' ' + user.uid);
					// localStorage.setItem("myid", user.uid);
	    } else {
	      console.log("not logged in");
	    }
 		});
	}

	render(){
		return(
			<div>
				<Button className="googleLoginBtn" modal="close" waves='light'
				onClick={googleLogin}>
					Login With Google
				</Button>
			</div>
			)
	};
}

export default GoogleLogin;
