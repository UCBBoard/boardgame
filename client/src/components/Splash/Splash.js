import React, { Component } from 'react';
import "./Splash.css";
import Axios from "axios";
import ModalForm from "../ModalForm";
import ModalLogin from "../ModalLogin";
import GoogleLogin from "../GoogleLogin";

// First page visitors encounter. Splash gives users the option to
// log in or sign up, available via the Modalform and ModalLogin components.
// Also, fancy background.

class Splash extends Component {
  render () {
    return(
      <div className="splash-background">
        <h1 className="center-align">GameVault</h1><br/>
        <h2 className="center-align">Your digital board game shelf</h2><br/>
        <h3 className="center-align">Share | Store | Record</h3>
        <div className="center-align">
          <ModalForm />
          <ModalLogin />
          <GoogleLogin />
        </div>
      </div>
    );
  }

}

export default Splash;