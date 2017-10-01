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

		Axios.get(`/api/user/${activeUser}/friends`)
			.then(res => {
				this.setState({friends: res.data})
		}).catch(function(error) {
				console.error(error);
		});
		console.log(this.state)
	}

 	addFriend = (event) => {
		let activeUser = firebase.auth().currentUser.uid
		let secondUser = event.target
		let route = `/api/user/addfriend/${activeUser}/${secondUser}`
		Axios.post(route, {
			activeUser: activeUser,
			secondUser: secondUser
		})
	}

	render(){
	  return (
	    <div className="col s3 center card-panel">Friendslist
	    	<Button onClick={this.addFriend} data-id="33">Add a friend</Button>
	    </div>
	  );
	};
};

export default Friendslist;


