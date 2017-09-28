import React from "react";
import "./Friendslist.css";
import firebase from "firebase";
import Axios from "axios";
import {Button} from "react-materialize";

const addFriend = () => {
	let activeUser = firebase.auth().currentUser.uid
	let secondUser = 33333333
	let route = `/api/user/addfriend/${activeUser}/${secondUser}`
	Axios.post(route, {
		activeUser: activeUser,
		secondUser: secondUser
	})
}

export const Friendslist = ({ children }) => {
  return (
    <div className="col s3 center card-panel">Friendslist
    	<Button onClick={addFriend}>Click me</Button>
    </div>
  );
};

export default Friendslist;