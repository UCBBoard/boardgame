import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";
import ListItem from "../ListItemTemp"
import firebase from "firebase";
import {Modal, Button, Collapsible, CollapsibleItem, Input} from "react-materialize";

class Gamelist extends Component {
  state = {
    myGames: [],
    buttonDisabled: false,
    query: "",
    gameInfo: [],
    searchArray: []
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
    let searchQuery = e.target.value;
    console.log(searchQuery);
    this.setState({
      query: e.target.value
    })
    // let myGamesVar = this.state.myGames;
    // if (currentValue.length > 3) {
    //   console.log("currentValue is over 3.");

    // }
    // if(!myGamesVar.includes(currentValue)){
    //   return this.setState({buttonDisabled: false})
    // } else {
    //   return this.setState({buttonDisabled: true})
    // }
  }

  searchGames = (event) => {
    event.preventDefault();
    this.setState({
      searchArray: []
    })
    let currentValue = document.getElementById("newGame").value;
    // let searchObj = {};
    Axios.get("/api/games/search/" + currentValue)
      .then((response) => {
        // console.log(response.data);
        response.data.map((data) => {
          let dataName = data.name[0]._;
          let dataDate = data.yearpublished[0];
          let dataId = data.$.objectid;
          let resultObj = {};
          resultObj[dataName] = [dataDate, dataId];
          // console.log(resultObj);
          this.setState({
            searchArray: [...this.state.searchArray, resultObj]
          })
        })
      })
      .catch((error) => {
        return console.log (error)
      })
  }

  render () {
    return (
      <div className="col s8 center card-panel gamelistBox">
        <h2>Gamelist
          <Modal
            header="Add a game to your collection:"
            id="new-game-modal"
            trigger={<Button floating large className='red' id="add-games-btn" waves='light' icon='add' />}>
              <Input
                placeholder="Search for your game"
                name="newgame"
                id="newGame"
                onChange={this.handleChange}
              />
              <br/>
              <Collapsible>
                <CollapsibleItem header={this.state.query}>
                  {this.state.searchArray.map(
                    (data, i) => {
                      // console.log("mapping array")
                      console.log("test");
                      <div className="new-game-select">
                          {Object.keys(data)}
                      </div>
                    })
                  }
                </CollapsibleItem>
              </Collapsible>

              <Button
                waves='light'
                // modal='close'
                disabled={this.state.buttonDisabled}
                onClick={(event) => this.searchGames(event)}>
                  Search
              </Button>
          </Modal>
        </h2>
        <Collapsible className="gamelistGames">
          {this.state.myGames.map((gameName, i) => {
              return <CollapsibleItem header={gameName} icon='filter_drama' key={i + "gList"}>
                      <ListItem name={gameName} minPlayers={2} maxPlayers={4} playtime={360} />
                    </CollapsibleItem>
            })
          }
        </Collapsible>
      </div>

    )
  }
}

export default Gamelist;
