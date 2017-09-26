import React, { Component } from "react";
import "./GoogleLogin.css"
import {Button} from "react-materialize";
import firebase from "firebase"

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
	userLogin = () => {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
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