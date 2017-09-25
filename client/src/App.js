import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import firebaseConfig from './firebase.js'; 
import firebase from "firebase"
import Nav from "./components/Nav";
import Gamelist from "./components/Gamelist";
import Friendslist from "./components/Friendslist";
import Newsfeed from "./components/Newsfeed";
import Dashboard from "./components/Dashboard";
import Splash from "./components/Splash";
const localToken = localStorage.getItem('userId')




class App  extends Component {


	state = {
		currentUser: ''
	}

	userLogin = () => {
		let currentUser = localStorage.getItem("currentUser")
		if(currentUser){
			this.setState({currentUser:currentUser})
		} else {
			this.setState({currentUser:''})
		}
	}
	componentDidMount(){
		this.userLogin();

	};

	render(){
		return(
			<Router>
			<Switch>
			<Route exact path='/' render={() => (
				this.state.currentUser !== '' ? (
					<Redirect to="/dashboard"/>
					) : (
					<Splash/>
					)
					)}/>
			<Route exact path="/dashboard" component={Dashboard}/>
			</Switch>
			</Router>
			)
	}
}
export default App;




