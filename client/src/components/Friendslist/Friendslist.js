import React from "react";
import "./Friendslist.css";
import firebase from "firebase";
import Axios from "axios";
import {Button} from "react-materialize";

const addFriend = (event) => {
	let activeUser = firebase.auth().currentUser.uid
	let secondUser = event.target
	let route = `/api/user/addfriend/${activeUser}/${secondUser}`
	Axios.post(route, {
		activeUser: activeUser,
		secondUser: secondUser
	})
}

export const Friendslist = ({ children }) => {
  return (
    <div className="col s3 center card-panel">Friendslist
    	<Button onClick={addFriend} data-id="33">Add a friend</Button>
    </div>
  );
};

export default Friendslist;