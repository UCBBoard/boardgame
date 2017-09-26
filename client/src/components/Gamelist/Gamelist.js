import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";

class Gamelist extends Component {
  state = {
    myGames: []
  }

  compondedDidMount() {
    // Axios.get("api/games/" + )
  }

  render () {
    return (
      <div className="col s9 center card-panel">Gamelist</div>
    )
  }
}

export default Gamelist;