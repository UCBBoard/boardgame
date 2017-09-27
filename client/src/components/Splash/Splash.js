import React, { Component } from 'react';
import "./Splash.css";
// import Axios from "axios";
import ModalForm from "../ModalForm";
import ModalLogin from "../ModalLogin";
import logo from "../../assets/img/logo.png"

// First page visitors encounter. Splash gives users the option to
// log in or sign up, available via the Modalform and ModalLogin components.
// Also, fancy background.

class Splash extends Component {
  render () {
    return(
      <div className="splash-background">
        <div className="splashHolder">
          <img src={logo} className="siteLogo" alt="logo" />
          <h1 className="center-align logoH1">GameVault</h1><br/>
          <h4 className="center-align splashHs splashh4">Your digital board game shelf</h4><br/>
          <div className="center-align">
            <ModalForm />
            <ModalLogin />
          </div>
          <h2 className="center-align splashHs splashLowerH">Share | Store | Record</h2>
        </div>
        
       
      </div>
    );
  }

}

export default Splash;