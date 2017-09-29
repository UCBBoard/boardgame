import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";
import ListItem from "../ListItem"
// import {firebase} from "firebase";
import ReactTooltip from 'react-tooltip'
import {Modal, Button} from "react-materialize";

class Gamelist extends Component {
  state = {
    myGames: [],
    buttonDisabled: false,
    autocompleteRes: [],
    gameInfo: []
  }

  // For loading a users list of games when the Dashboard >>> Gamelist is rendered.
  componentDidMount = () => {
    // let myId = this.props.user;
    let myId = localStorage.getItem("myid");
    console.log(myId);
    console.log("Searching for user games");
    // console.log(this.props);
    Axios.get("/api/games/" + myId + "/mylist")
      .then(response => {
        console.log(response.data.mygameslist);
        this.setState({myGames : response.data.mygameslist});
      })
      .catch(error => {
        console.log(error)
      })
    // Axios.get("api/games" + )
  }

  handleNewGameSubmit = () => {
    console.log("trying to submit new game");
    const gameName = document.getElementById("newGame").value;
    document.getElementById("newGame").value = "";
    const userId = this.state.uid;
    const postRoute = "/api/newgame/" + gameName + "/" + userId;
    console.log(postRoute);
    Axios.post(postRoute, {
      title: gameName,
      users: userId,
    })
    .then((response) => {
      console.log(">>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<")
      console.log(response);
      this.setState({
        myGames: [...this.state.myGames, gameName]
      });
    })
    .catch((error) => { console.log(error) })
    // Axios.get("api/games/" + gameName)
  }

  handleChange = (e) => {
    let myGamesVar = this.state.myGames
    if(!myGamesVar.includes(e.target.value)){
      this.setState({buttonDisabled: false})
    } else {
      this.setState({buttonDisabled: true})
    }
  }

  render () {
    return (
      <div className="col s9 center card-panel">
        <h2>Gamelist
          <Modal
            header="Add a game to your collection:"
            id="new-game-modal"
            trigger={<Button floating large className='red' id="add-games-btn" waves='light' icon='add' />}>
            <input
              placeholder="Game Name"
              onChange={this.handleChange}
              id="newGame"
              />
            <br/>
            <Button
              waves='light'
              modal='close'
              disabled={this.state.buttonDisabled}
              onClick={this.handleNewGameSubmit}>
                Submit
            </Button>
          </Modal>
        </h2>
 
        {this.state.myGames.map((gameName, i) => {
            console.log("making a list item");
            return <ListItem
                    game={gameName}
                    key={i}
                    iteration={i}
                  />
          })
        }
      </div>

    )
  }
}

export default Gamelist;
