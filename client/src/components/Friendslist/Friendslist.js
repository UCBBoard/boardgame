import React, { Component } from "react";
import "./Friendslist.css";
// import firebase from "firebase";
import Axios from "axios";
import {Button, Input, Row, Col} from "react-materialize";
import FriendProfile from "../FriendProfile";


class Friendslist extends Component {

	state ={
		friends:[],
		friendsView: '',
		query: ''
	}

	showMyFriends = () => {
		let activeUser = this.props.uID;
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

	findAFriend = (event) => {
		event.preventDefault();
			Axios.get("/api/user/search/" + this.state.query)
				.then(res => {
					this.setState({
						query: "",
						friends: res.data,
						friendsView: 'all'
					})
				}).catch(err => {
					console.log(err)
				})
	}

	showAllFriends = () => {
		Axios.get("/api/user/all/" + this.props.uID)
			.then(res => {
				// console.log()
				this.setState({friends: res.data, friendsView: 'all'})
		}).catch(function(error) {
				console.error(error);
		});
	}

  handleChange = (e) => {
    let searchQuery = e.target.value;
    console.log(searchQuery);
    this.setState({
      query: e.target.value
    })
  }


	addNotification = (event) => {
		let activeUser = this.props.uID;
		let secondUser = event.target.dataset.id;
		let route = `/api/user/${secondUser}/addNotification/${activeUser}`
		Axios.post(route)
		this.showAllFriends()
	}

	removeFriend = (event) => {
		let activeUser = this.props.uID;
		let secondUser = event.target.dataset.id
		let route = `/api/user/deletefriend/${activeUser}/${secondUser}`
		Axios.delete(route)
		this.showMyFriends()
	}

	render(){
	  return (
	  	<div>

	  		<Row>
	  			<Col s={3}>
	  				<Button className="friend-button" onClick={this.showMyFriends}>My Friends</Button>
	  			</Col>
	  			<Col s={3}>
		  			<Button className="friend-button" onClick={this.showAllFriends}>All users</Button>
		  		</Col>
		  		<form>
			  		<Col s={3}>
			  			<Input type="text" onChange={this.handleChange} value={this.state.query}/>
			  		</Col>
			  		<Col s={3}>
			  			<Button className="friend-button" type="submit" onClick={this.findAFriend}>Find</Button>
			  		</Col>
		  		</form>
	  		</Row>

				{this.state.friends.map((element, i) =>
					<div key={i} className="center">
						<FriendProfile level={element.level} userName={element.name} cardNum={element.cardNum}/>
						{this.state.friendsView === 'all' ?
						<Button data-id={element._id} onClick={this.addNotification} className="addFriendButton"> Add friend </Button> :
						<Button data-id={element._id} onClick={this.removeFriend} className ="delete"> Delete friend </Button>
						}
					</div>
				)}
			</div>
	  );
	};
};

export default Friendslist;


