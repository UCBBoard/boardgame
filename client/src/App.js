import React, { Component } from "react";
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
// import firebase from "firebase";
// import Nav from "./components/Nav";
// import Gamelist from "./components/Gamelist";
// import Friendslist from "./components/Friendslist";
// import Newsfeed from "./components/Newsfeed";
// import { logout } from './helpers/auth.js';
import { firebaseAuth } from './config/constants';
// import Nav from "./components/Nav";
// import Gamelist from "./components/Gamelist";
// import Friendslist from "./components/Friendslist";
// import Newsfeed from "./components/Newsfeed";
import Dashboard from "./components/Dashboard";
import Splash from "./components/Splash";

class App extends Component {

	state = {
		authed: false,
		loading: true,
	}

	componentDidMount () {
		this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					authed: true,
					loading: false,
				})
			} else {
				this.setState({
					authed: false,
					loading: false
				})
			}
		})
	}

	componentWillUnmount () {
		this.removeListener()
	}

	render() {
		return this.state.loading === true ? <h1>Loading</h1> : (
			<BrowserRouter>
				<div>
					{this.state.authed? <Dashboard/> : <Splash/>}
						<Switch>
						</Switch>
				</div>
			</BrowserRouter>
		);
	}}

	export default App;
