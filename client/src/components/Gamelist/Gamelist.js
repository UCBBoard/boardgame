import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";
// import {firebase} from "firebase";
import {Modal, Button} from "react-materialize";

class Gamelist extends Component {
  state = {
    myGames: [],
    firebaseUid: ""
  }

  // For loading a users list of games when the Dashboard >>> Gamelist is rendered.
  componentDidMount() {
    let myId = localStorage.getItem("myId");
    console.log("Searching for user games");
    Axios.get("/api/games/" + myId + "/mylist")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
  }

  //Just for testing
  // checkDB() {
  //   let myId = localStorage.getItem("myId");
  //   console.log("here we go with this id:" + myId);
  //   Axios.get("/api/user/" + myId)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  handleNewGameSubmit = () => {
    console.log("trying to submit new game");
    let gameName = document.getElementById("newGame").value;
    let userId = localStorage.getItem("myId");
    let postRoute = "/api/newgame/" + gameName + "/" + userId;
    console.log(postRoute);
    Axios.post(postRoute, {
      title: gameName,
      users: userId,
    })
    .then((response) => { console.log(response) })
    .catch((error) => { console.log(error) })
  }

  render () {
    return (
      <div className="col s9 center card-panel">Gamelist
        <Modal
          header="Add a game to your collection:"
          trigger={<Button floating large className='red' id="add-games-btn" waves='light' icon='add' />}
        >
          <input
            placeholder="Game Name"
            id="newGame"
          />
          <Button waves='light' onClick={() => {this.handleNewGameSubmit()}}>Submit</Button>
        </Modal>
        <Button waves='light' onClick={() => {this.checkDB()}}>checkDB</Button>
      </div>

    )
  }
}

export default Gamelist;
