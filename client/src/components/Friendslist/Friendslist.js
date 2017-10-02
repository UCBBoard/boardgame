import React, { Component } from "react";
import "./Friendslist.css";
import firebase from "firebase";
import Axios from "axios";
import {Button} from "react-materialize";



class Friendslist extends Component {

	state ={
		friends:[]
	}


	componentDidMount() {
	let activeUser = firebase.auth().currentUser.uid
		Axios.get(`/api/user/all`)
			.then(res => {
				this.setState({friends: res.data})
		}).catch(function(error) {
				console.error(error);
		});
	}

 	addFriend = (event) => {
		let activeUser = firebase.auth().currentUser.uid
		let secondUser = event.target.dataset.id
		let route = `/api/user/addfriend/${activeUser}/${secondUser}`
		Axios.post(route, {
			activeUser: activeUser,
			secondUser: secondUser
		})
	}

	render(){
	  return (
	  	<div>
<div>
{this.state.friends.map((element) =>

	<div>
		{element._id}
	</div>
)}
</div>
</div>
	  );
	};
};

export default Friendslist;


