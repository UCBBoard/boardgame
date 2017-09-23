import React, { Component } from 'react';
import "./Splash.css";
import Axios from "axios";
import ModalForm from "../ModalForm";
// import {Modal} from "react-materialize";

class Splash extends Component {
  render () {
    return(
      <div className="splash-background">
        <p>Displaying</p>
        <ModalForm />
      </div>
    );
  }

}

export default Splash;