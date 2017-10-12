import React from 'react';
import {Button} from "react-materialize";
import "./DemoLogin.css"
import firebase from "firebase";

const login = () => {
	  firebase.auth().signInWithEmailAndPassword('testdummy123@gmail.com', 'testing123').catch(error => {
	  	if(error) console.log(error)
		});
}

const DemoLogin = () => (
		<Button waves="light" className="modal-btn" onClick={login}> Demo </Button>
	)

export default DemoLogin