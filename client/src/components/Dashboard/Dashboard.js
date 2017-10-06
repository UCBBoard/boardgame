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
import Friendspace from "../FriendSpace";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';

import openSocket from 'socket.io-client';
const socket = openSocket();

class Dashboard extends Component {
	state = {
		// state will be passed into hoverbuttons component as prop to render correct material-icon based on if user has notifications
		notifications:[],
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

	componentDidMount() {
		socket.on("working", function(){
			console.log("WORKING")
		})
		//if modal exists from splash page login screen, remove it
		const elem = document.querySelector(".modal-overlay")
		this.emitTest();
		if(elem) elem.remove();
		this.getNotifications();


	};

	emitTest = () => {
		console.log("emiting")
		socket.emit("notification", {hey: "sup"});
	}

	notify = text => toast(text);

	render (props) {
		return (
			 <Background backgroundName="dash-background">

			  <div className="center">
			  			 <div className="loggedIn col s6 right">Logged in as {this.props.userName}
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
		          	<Friendspace />
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