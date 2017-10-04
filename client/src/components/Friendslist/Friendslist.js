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


	componentDidMount() {
		// this.showMyFriends();
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
	showAllFriends = () => {
		Axios.get(`/api/user/all`)
			.then(res => {
				this.setState({friends: res.data, friendsView: 'all'})
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
					<div key={i}> {element._id}
						{this.state.friendsView === 'all' ?
						<Button data-id={element._id} onClick={this.addFriend} className="add"> Add friend </Button> :
						<Button data-id={element._id} onClick={this.removeFriend} className ="delete"> Delete friend </Button>
						}
					</div>
				)}
			</div>
	  );
	};
};

export default Friendslist;


