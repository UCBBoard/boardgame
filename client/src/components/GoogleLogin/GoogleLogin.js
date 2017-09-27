import React, { Component } from "react";
import "./GoogleLogin.css"
import {Button} from "react-materialize";
import firebase from "firebase";
import {googleLogin} from "../../helpers/auth.js";
// import Axios from "axios";
// import mongoose from "mongoose";

class GoogleLogin extends Component {

	state = {
		uid: ""
	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
	    if (user) {
					let uid = firebase.auth().currentUser.uid;
					console.log("logged in as " + user.displayName + ' ' + user.uid);
					this.setState({
						uid: user.uid
					})
	    } else {
	      console.log("not logged in");
	    }
 		});
	}

	render(){
		return(
			<div>
				<Button className="googleLoginBtn" waves='light'
				onClick={googleLogin}>
					Login With Google
				</Button>
			</div>
			)
	};
}

export default GoogleLogin;
