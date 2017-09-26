import React, { Component } from "react";
import "./GoogleLogin.css"
import {Button} from "react-materialize";
import firebase from "firebase"
import {googleLogin} from "../../helpers/auth.js"

class GoogleLogin extends Component {

	componentDidMount(){
		firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
	    	console.log(firebase.auth().currentUser.uid)
	    	localStorage.setItem("currentUser", firebase.auth().currentUser.uid)
	      console.log("logged in as " + user.displayName + ' ' + user.uid);
	    } else {
	      console.log("not logged in");
	    }
 		});
	}

render(){
	return(
		<div>
		<Button waves='light'
		onClick={googleLogin}>
		Login With Google
		</Button>
		</div>
		)
};
}

export default GoogleLogin;