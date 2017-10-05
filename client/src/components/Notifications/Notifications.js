import React, { Component } from "react";
import firebase from "firebase";
import Axios from "axios";
import {Button} from "react-materialize";


class Notifications extends Component {

	state = {
		notifications: []
	}

 	addFriend = (event) => {
		let activeUser = firebase.auth().currentUser.uid
		let secondUser = event.target.dataset.id
		let route = `/api/user/addfriend/${activeUser}/${secondUser}`
		Axios.post(route);
		this.getNotifications();
	}

	getNotifications = () => {
		let activeUser = firebase.auth().currentUser.uid
		Axios.get(`api/user/${activeUser}/notifications`)
			.then(res => {
				this.setState({notifications: res.data})
			}).catch(function(error) {
				console.error(error)
			})
	}

	componentDidMount(){
		this.getNotifications()
	}

	render(){
		return(
			<div>These are the notifications
			{this.state.notifications.map((element, i) =>
				<div key={i}>
					{element.name} sent you a friend request.
						<Button data-id={element._id} onClick={this.addFriend}> Add friend </Button>
				</div>
				)}
			</div>
		)
	}
}

export default Notifications;



