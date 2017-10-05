import React, { Component } from "react";
import { BrowserRouter, Switch } from 'react-router-dom'
import { firebaseAuth } from './config/constants';
import Dashboard from "./components/Dashboard";
import Splash from "./components/Splash";
import LoadingScreen from "./components/LoadingScreen";
import Axios from "axios";

class App extends Component {
	state = {
		authed: false,
		loading: true,
		uid: ''
	}

	componentDidMount () {
		this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
			// let uid = firebase.auth().user.uid;
			// console.log(user);
			if (user) {
				console.log(user)
				this.setState({
					authed: true,
					loading: false,
					uid: user.uid
				});
				Axios.post("/api/user/" + this.state.uid)
						.then((response) => {
							this.setState({level: response.data.level})
		    			console.log("searching database for user:" + response);
		    	})
		      .catch((error) => {
		      	// console.log(error);
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
				</div>
			</BrowserRouter>
		);
	}}

	export default App;
