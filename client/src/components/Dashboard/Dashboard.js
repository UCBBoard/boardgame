import React, { Component } from 'react';
import "./Dashboard.css";
import Axios from "axios";
import Gamelist from "../Gamelist";
import firebase from "firebase";
import Newsfeed from "../Newsfeed";
import HoverButtons from "../HoverButtons";
import Background from "../Background"
import Discord from "../Discord"
import logo from "../../assets/img/logo.png"
import LevelBar from "../LevelBar";
import UserProfile from "../UserProfile";
import UserProfileThumb from "../UserProfileThumb";
import Friendspace from "../FriendSpace";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';

import openSocket from 'socket.io-client';
const socket = openSocket();

class Dashboard extends Component {
	state = {
		// state will be passed into hoverbuttons component as prop to render correct material-icon based on if user has notifications
		notifications:[],
		friends: [],
		cardNum: 0
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

	getFriends = () => {
		let activeUser = firebase.auth().currentUser.uid
		Axios.get(`api/user/${activeUser}/friends`)
			.then(res => {
				this.setState({friends: res.data})
			}).catch(function(error) {
				console.error(error)
			})
	}

	getLvl = () => {
		let activeUser = firebase.auth().currentUser.uid
		this.props.updateLvl(activeUser);
	}

	componentDidMount() {
		//if modal exists from splash page login screen, remove it
		const elem = document.querySelector(".modal-overlay")
		if(elem) elem.remove();
		this.getNotifications();
		this.getFriends();
		socket.on(firebase.auth().currentUser.uid, thingToUpdate => {
			if (thingToUpdate === "notifications"){
				this.getNotifications();
				this.notify("New notification!")
			}

			if (thingToUpdate === "friends"){
				this.getNotifications();
				this.getFriends();
				this.notify("New friend added! How nice! +50xp")
				this.props.increaseExp(50);
			}

			if (thingToUpdate === "exp"){
				this.getLvl();
			}
		})

	};


	notify = text => toast(text);

	render (props) {
		return (
			 <Background backgroundName="dash-background">

			  <div className="center mainContainer">
			  			 <div className="loggedIn col s6 right">Logged in as {this.props.userName}
		          	<UserProfileThumb cardNum={this.props.cardNum}/>
			 </div>
			  	<img src={logo} className="siteLogoDash" alt="logo" /><h1 className="logoH1Dash">GameVault</h1>
			  </div>
		      <div className="container dashContainer">
		        <div className="row dashRow">
		          	<Gamelist notification={this.notify} increaseExp={this.props.increaseExp} />
		        </div>
		        <div className="row dashRow">
		          	<Newsfeed />
		        </div>

		        <div className="row dashRow">
		          	<UserProfile level={this.props.level} userName={this.props.userName} cardNum={this.props.cardNum}/>
		        </div>

		        <div className="row dashRow">
		          	<Friendspace friends={this.state.friends}/>
		        </div>
		         
	      			
		      </div>
		     
		      
		      <LevelBar exp={this.props.exp} toNextLevel={this.props.toNextLevel}/>
		      <HoverButtons notifications={this.state.notifications} getNotifications={this.getNotifications}/>
		      <ToastContainer 
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
		    </Background>
		)
	}
}

export default Dashboard;