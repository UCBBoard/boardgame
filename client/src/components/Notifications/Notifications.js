import React, { Component } from "react";
import firebase from "firebase";
import Axios from "axios";

class Notifications extends Component {

	state = {
		notifications: []
	}

	componentDidMount(){
		let activeUser = firebase.auth().currentUser.uid
		Axios.get(`api/user/${activeUser}/notifications`)
			.then(res => {
				console.log(res)
				this.setState({notifications: res.data})
			}).catch(function(error) {
				console.error(error)
			})
	}

	render(){
		return(
			<div>These are the notifications
			{this.state.notifications.map((element, i) =>
				<div key={i}>
					{element._id}
				</div>
				)}
			</div>
		)
	}
}

export default Notifications;



