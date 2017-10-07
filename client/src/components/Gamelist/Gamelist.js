import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";
import mongoose from 'mongoose';
import SearchListItem from "../SearchListItem";
import ListItem from "../ListItemTemp"
import firebase from "firebase";
// import ReactTooltip from 'react-tooltip';
import {Modal, Button, Collapsible, CollapsibleItem, Input, Collection, Preloader} from "react-materialize";


class Gamelist extends Component {
  state = {
    myGames: [],
    buttonDisabled: false,
    query: "",
    gameInfo: [],
    searchArray: [],
    nameArray: [],
    dateArray: [],
    idArray: [],
    //current list
    otherList: "wishlist",
    //list to switch to
    currentList: "owned",
    switchValue: true,
    collVis: false,
    preloader: false
  }

// For loading a users list of games when the Dashboard >>> Gamelist is rendered.
  fetchGames = (listChoice) => {
    let myId = firebase.auth().currentUser.uid
    console.log(`this is my id ${myId}`)
    console.log(`Searching for user ${listChoice}`);
    this.setState({
      switchValue: listChoice
    })
    Axios.get("/api/games/" + myId + "/mylist/" + [listChoice])
        .then(response => {
          this.setState({myGames : response.data});
        })
        .catch(error => {
          console.log(error)
        })
    }

  componentDidMount() {
    this.fetchGames("owned");
  }

  switchList = () => {
    let oldList = this.state.currentList;
    let newList = this.state.otherList;
    this.fetchGames(newList);
    this.setState({
      otherList: oldList,
      currentList: newList
    })
  }

// Handles adding new games to the DB when the user clicks on a search result in Gamelist.
  handleNewGameSubmit1 = (gameId, owned) => {
    // const gameID = 213460;
    console.log("<<<<getting second argument in handleNewGameSubmit1");
    console.log(owned);
    {this.props.increaseExp(10)}
    console.log("subbing new game");
    this.props.notification("New game added! +10 EXP!");
    let userId = firebase.auth().currentUser.uid;
    const postRoute = "/api/newgame/" + gameId + "/" + userId + "/" + owned;
    console.log("postroute: " + postRoute);
    Axios.post(postRoute)
    .then((response) => {
      console.log(response);
      this.setState({
        query: "",
        searchArray: [],
        preloader: false,
        collVis: false
      });
      document.getElementById('new-game-modal').remove();
      document.querySelector(".modal-overlay").remove();
      this.fetchGames(this.state.currentList);
    })
    .catch((error) => { console.log(error) })
  }

//For handling input Change - may no longer be needed.
  handleChange = (e) => {
    let searchQuery = e.target.value;
    console.log(searchQuery);
    this.setState({
      query: e.target.value
    })
  }

// Searches BGG API for games and returns 6.
  searchGames = (event) => {
    event.preventDefault();
    this.setState({
      searchArray: [],
      preloader: true,
      collVis: false
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
          return this.setState({
              searchArray: [...this.state.searchArray, resultObj],
              preloader: false,
              collVis: true
          })
        })
      })
      .catch((error) => {
        return console.log (error)
      })
  }

//Method of removing games from a users gamelist.
  deleteGame = (e) => {
    this.props.notification("Game deleted!");
    let userId = firebase.auth().currentUser.uid;
    let game = e.target.dataset.id;
    console.log(`/api/games/deletegame/${userId}/${game}/${this.state.currentList}`);
    let route = `/api/games/deletegame/${userId}/${game}/${this.state.currentList}`;
    Axios.delete(route)
      .then((res) => {
        this.fetchGames(this.state.currentList)
      })
  }

//Render it all!
  render () {
    return (
      <div className="col s12 center card-panel gamelistBox">
        <div className="gamelistHeaderDiv">
          <h2 className="gamelistHeader">Game Shelf</h2>
          <Input name="Wishlist" id="list-switch" type="switch" offLabel="Your Games" onLabel="Your Wishlist" onChange={this.switchList}/>
          <Modal
            header="Add a game to your collection"
            id="new-game-modal"
            actions=" "
            trigger={<Button floating large className='green' id="add-games-btn" waves='light' icon='add' />}>
            <form>
              <Input s={10} placeholder="Search for your game" name="newgame" id="newGame"
                onChange={this.handleChange}
              />
              <Button waves='light' id="search-games-btn"
                disabled={this.state.buttonDisabled}
                onClick={(event) => this.searchGames(event)}>
                  Search
              </Button>
            </form>

            <div className="modal-row" style={{visibility: this.state.preloader ? 'visible' : 'hidden'}}>
              <Preloader flashing/>
            </div>

            <div style={{visibility: this.state.collVis ? 'visible' : 'hidden'}}>

              <Collection className="gamelistGames" id="gamelist-games" defaultActiveKey={0} style={{visibility: this.state.collVis ? 'visible' : 'hidden'}}>
                <SearchListItem
                  // expanded={true}
                  dataResults={this.state.searchArray}
                  saveGame={this.handleNewGameSubmit1}
                  preloader={this.state.preloader}
                  visiblity={this.state.collVis}/>

              </Collection>
            </div>
          </Modal>
        </div>
        <Collapsible className="gamelistGames">
          {this.state.myGames.map((gameName, i) => {
              return <CollapsibleItem header={gameName.title} icon='filter_drama' key={i + "gList"}>
                      <ListItem name={gameName.title} minPlayers={gameName.minPlayers} maxPlayers={gameName.maxPlayers} playtime={gameName.playtime} />
                    <Button data-id={gameName._id} onClick={this.deleteGame}>Remove game</Button>
                    </CollapsibleItem>
            })
          }
        </Collapsible>
      </div>

    )
  }
}

export default Gamelist;