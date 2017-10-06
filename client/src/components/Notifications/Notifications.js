import React, { Component } from "react";
import firebase from "firebase";
import Axios from "axios";
import "./Notifications.css";
import {Button} from "react-materialize";
import FriendProfile from "../FriendProfile";

class Notifications extends Component {

 	addFriend = (event) => {
		let activeUser = firebase.auth().currentUser.uid
		let secondUser = event.target.dataset.id
		let route = `/api/user/addfriend/${activeUser}/${secondUser}`
		Axios.post(route)
		this.props.getNotifications();
	}

	render(props){
		return(
			<div className="center">
			{this.props.notifications.map((element, i) =>
				<div key={i}>
					<FriendProfile level={element.level} userName={element.name} cardNum={element.cardNum}/>
					<p className="notificationText">{element.name} sent you a friend request.</p>
					<Button className="notificationAddFriend" data-id={element._id} onClick={this.addFriend}> Add friend </Button>
				</div>
				)}
			</div>
		)
	}
}

export default Notifications;



