import React, { Component } from "react";
import "./GoogleLogin.css"
import {Button} from "react-materialize";
import firebase from "firebase"

class GoogleLogin extends Component {
	componentDidMount(){

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			console.log("logged in as " + user.displayName + ' ' + user.uid);
    	} else {
    	console.log("not logged in");
    	}
  	});
	}
	userLogin = () => {
	let provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  let token = result.credential.accessToken;
  // The signed-in user info.
  let user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  // The email of the user's account used.
  let email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  let credential = error.credential;
  // ...
});
}
render(){
	return(
		<Button waves='light'
		onClick={this.userLogin}>
		Login With Google
		</Button>
		)
};
}

export default GoogleLogin;