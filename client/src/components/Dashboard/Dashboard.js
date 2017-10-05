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
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';



class Dashboard extends Component {
	state = {
		// uid: "",
		// state will be passed into hoverbuttons component as prop to render correct material-icon based on if user has notifications
		notifications:[],
		level: 1,
		cardNum: 0
	}

	componentDidMount() {
		//if modal exists from splash page login screen, remove it
		const elem = document.querySelector(".modal-overlay")
		if(elem) elem.remove()

	};

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
		          <Gamelist notification={this.notify}/>
		          <Newsfeed />
		        </div>
		      </div>
		      <HoverButtons />
		      <UserProfile level={this.state.level}/>
		      <LevelBar />
		      <Discord />
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