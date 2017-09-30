import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";
import ListItem from "../ListItemTemp"
import firebase from "firebase";
import {Modal, Button, Collapsible, CollapsibleItem} from "react-materialize";

class Gamelist extends Component {
  state = {
    myGames: [],
    buttonDisabled: false,
    autocompleteRes: [],
    gameInfo: [],
  }

  // For loading a users list of games when the Dashboard >>> Gamelist is rendered.
  componentDidMount() {
    let myId = firebase.auth().currentUser.uid
    console.log(`this is my id ${myId}`)
    console.log("Searching for user games");
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
    const gameName = document.getElementById("newGame").value;
    document.getElementById("newGame").value = "";
    let userId = firebase.auth().currentUser.uid;
    const postRoute = "/api/newgame/" + gameName + "/" + userId;
    Axios.post(postRoute, {
      title: gameName,
      users: userId,
    })
    .then((response) => {
      this.setState({
        myGames: [...this.state.myGames, gameName]
      });
    })
    .catch((error) => { console.log(error) })
  }

  handleChange = (e) => {
    let myGamesVar = this.state.myGames;
    let currentValue = e.target.value;
    if (currentValue.length > 3) {
      console.log("currentValue is over 3.");
      Axios.get("/api/games/search/" + currentValue)
        .then((response) => {
          let autocompleteArray = [];
          console.log(response.data);
          response.data.map((data) => {
            autocompleteArray.push(data.name[0]._)
          })
          console.log("acarray: " + autocompleteArray);
          this.setState({
            autocompleteRes: autocompleteArray
          })
        })
        .catch((error) => {
          return console.log (error)
        })
    }
    if(!myGamesVar.includes(currentValue)){
      return this.setState({buttonDisabled: false})
    } else {
      return this.setState({buttonDisabled: true})
    }
  }

  render (props) {
    return (
      <div className="col s9 center card-panel">
        <h2>Gamelist
          <Modal
            header="Add a game to your collection:"
            id="new-game-modal"
            trigger={<Button floating large className='red' id="add-games-btn" waves='light' icon='add' />}>
            <form>
              <input
                placeholder="Game Name"
                onChange={this.handleChange}
                name="newgame"
                id="newGame"
                list="newgames"
              />
              <datalist id="newgames">
                {this.state.autocompleteRes.map(result =>
                  <option value={result} key={result} />
                )}
              </datalist>
              <br/>
              <Button
                waves='light'
                modal='close'
                disabled={this.state.buttonDisabled}
                onClick={this.handleNewGameSubmit}>
                  Submit
              </Button>
            </form>
          </Modal>
        </h2>
        <Collapsible>
          {this.state.myGames.map((gameName, i) => {
              return <CollapsibleItem header={gameName} icon='filter_drama' key={i + "gList"}>
                      <ListItem name={gameName} minPlayers={2} maxPlayers={4} playtime={360} />
                    </CollapsibleItem>
            })
          }
        </ Collapsible>
      </div>

    )
  }
}

export default Gamelist;
