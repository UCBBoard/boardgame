import React, { Component } from 'react';
import "./Dashboard.css";
import Axios from "axios";
import Gamelist from "../Gamelist";
// import Friendslist from "../Friendslist";
import Newsfeed from "../Newsfeed";
import Nav from "../Nav";
import {Modal, Button} from "react-materialize";


class Dashboard extends Component {

	state={}

	handleNewGameSubmit = () => {
		console.log("trying to submit new game");
		let gameName = document.getElementById("newGame").value;
		// let postRoute = "/newgame/" + gameName + "/59c96a5ce9dfb9a045666f0c";
		// console.log(postRoute);
		Axios.post("api/newgame/" + gameName + "/59c96a5ce9dfb9a045666f0c")
			.then(
				console.log()
			)
	}

	render () {
		return (
			 <div>
		      <Nav />
		      <div className="container">
		        <div className="row">
		          <Gamelist />
		          <Newsfeed />
		          	<Modal
		          		header="Add a game to your collection:"
		          		trigger={<Button floating large className='red' waves='light' icon='add' />}
		          	>
		          	<input
		          		placeholder="Game Name"
		          		id="newGame"
		          	/>
		          	<Button waves='light' onClick={() => {this.handleNewGameSubmit()}}>Submit</Button>
		          	</Modal>
		        </div>
		      </div>
		    </div>
		)
	}
}

export default Dashboard;