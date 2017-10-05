import React, { Component } from "react";
import "./Friendslist.css";
import firebase from "firebase";
import Axios from "axios";
import {Button} from "react-materialize";



class Friendslist extends Component {

	state ={
		friends:[],
		friendsView: ''
	}

	showMyFriends = () => {
		let activeUser = firebase.auth().currentUser.uid
		Axios.get(`api/user/${activeUser}/friends`)
			.then(res => {
				this.setState({friends: res.data, friendsView: 'mine'})
			}).catch(function(error) {
				console.error(error)
			})
	}
	componentDidMount() {
		this.showMyFriends();
	}


	showAllFriends = () => {
		Axios.get(`/api/user/all`)
			.then(res => {
				this.setState({friends: res.data, friendsView: 'all'})
		}).catch(function(error) {
				console.error(error);
		});
	}



	addNotification = (event) => {
		let activeUser = firebase.auth().currentUser.uid
		let secondUser = event.target.dataset.id
		let route = `/api/user/${secondUser}/addNotification/${activeUser}`
		Axios.post(route)
		this.showAllFriends()
	}

	removeFriend = (event) => {
		let activeUser = firebase.auth().currentUser.uid
		let secondUser = event.target.dataset.id
		let route = `/api/user/deletefriend/${activeUser}/${secondUser}`
		Axios.delete(route)
		this.showMyFriends()
	}

	render(){
	  return (
	  	<div>
	  		<Button onClick={this.showMyFriends}>My Friends</Button>
	  		<Button onClick={this.showAllFriends}>All users</Button>
				{this.state.friends.map((element, i) =>
					<div key={i}> {element.name}
						{this.state.friendsView === 'all' ?
						<Button data-id={element._id} onClick={this.addNotification} className="add"> Add friend </Button> :
						<Button data-id={element._id} onClick={this.removeFriend} className ="delete"> Delete friend </Button>
						}
					</div>
				)}
			</div>
	  );
	};
};

export default Friendslist;


