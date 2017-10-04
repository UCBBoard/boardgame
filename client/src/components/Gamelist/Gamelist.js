import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";
import SearchListItem from "../SearchListItem";
import ListItem from "../ListItemTemp"
import firebase from "firebase";
import {Modal, Button, Collapsible, CollapsibleItem, Input} from "react-materialize";


class Gamelist extends Component {
  state = {
    myGames: [],
    buttonDisabled: false,
    query: "",
    gameInfo: [],
    searchArray: [],
    nameArray: [],
    dateArray: [],
    idArray: []
  }

// For loading a users list of games when the Dashboard >>> Gamelist is rendered.
fetchGames = () => {
  let myId = firebase.auth().currentUser.uid
  console.log(`this is my id ${myId}`)
  console.log("Searching for user games");
  Axios.get("/api/games/" + myId + "/mylist")
      .then(response => {
        // console.log(response.data.mygameslist);
        this.setState({myGames : response.data});
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.fetchGames();
    // Axios.get("api/games" + )
  }

  // handleNewGameSubmit = () => {
  //   console.log("submitting");
  //   const gameName = document.getElementById("newGame").value;
  //   // document.getElementById("newGame").value = "";
  //   let userId = firebase.auth().currentUser.uid;
  //   const postRoute = "/api/newgame/" + gameName + "/" + userId;
  //   Axios.post(postRoute, {
  //     title: gameName,
  //     users: userId,
  //   })
  //   .then((response) => {
  //     this.setState({
  //       myGames: [...this.state.myGames, gameName]
  //     });
  //   })
  //   .catch((error) => { console.log(error) })
  // }

  handleNewGameSubmit1 = (gameId) => {
    // const gameID = 213460;
    console.log("subbing new game");
    this.props.notification("New game added!");
    let userId = firebase.auth().currentUser.uid;
    const postRoute = "/api/newgame/" + gameId + "/" + userId;
    Axios.post(postRoute)
    .then((response) => {
      console.log(response);
      this.setState({
        query: ""
      });
      document.getElementById('new-game-modal').remove();
      document.querySelector(".modal-overlay").remove();
      this.fetchGames();
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
    Axios.get("/api/games/search/" + currentValue)
      .then((response) => {
        // console.log(response.data);
        response.data.map((data) => {
          console.log(data);
          let dataName = data.name[0]._;
          let dataDate = data.yearpublished[0];
          let dataId = data.$.objectid;
          let resultObj = {
            name: dataName,
            date: dataDate,
            id: dataId
          };
          // resultObj[dataName] = [dataDate, dataId];
          // console.log(resultObj);
          return this.setState({
              searchArray: [...this.state.searchArray, resultObj]
            // nameArray: [...this.state.nameArray, data.name[0]._],
            // dateArray: [...this.state.dateArray, data.yearpublished[0]],
            // idArray: [...this.state.idArray, data.$.objectid]
          })
        })
      })
      .catch((error) => {
        return console.log (error)
      })
  }

  deleteGame = (e) => {
    this.props.notification("Game deleted!");
    let userId = firebase.auth().currentUser.uid;
    let game = e.target.dataset.id;
    let route = `/api/games/deletegame/${userId}/${game}`;
    Axios.delete(route);
    this.fetchGames();
  }
  render () {
    return (
      <div className="col s12 center card-panel gamelistBox">
        <h2 className="gamelistHeader">Gamelist
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
              <Collapsible className="gamelistGames" defaultActiveKey={0}>

                <SearchListItem
                  // onSelect={null}
                  expanded={true}
                  header={this.state.query}
                  dataResults={this.state.searchArray}
                  saveGame={this.handleNewGameSubmit1}
                />
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
              return <CollapsibleItem header={gameName.title} icon='filter_drama' key={i + "gList"}>
                      <ListItem name={gameName.title} minPlayers={gameName.minPlayers} maxPlayers={gameName.maxPlayers} playtime={gameName.playtime} />
                    <Button data-id={gameName._id} onClick={this.deleteGame}> Delete game </Button>
                    </CollapsibleItem>
            })
          }
        </Collapsible>
      </div>

    )
  }
}

export default Gamelist;
