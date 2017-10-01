import React, { Component } from "react";
import { BrowserRouter, Switch } from 'react-router-dom'
import { firebaseAuth } from './config/constants';
import Dashboard from "./components/Dashboard";
import Splash from "./components/Splash";
import LoadingScreen from "./components/LoadingScreen";

class App extends Component {
	state = {
		authed: false,
		loading: true
	}

	componentDidMount () {
		this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
			// let uid = firebase.auth().user.uid;
			// console.log(user);
			if (user) {
				this.setState({
					authed: true,
					loading: false
					// uid: uid
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
		return this.state.loading === true ? <LoadingScreen /> : (
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
