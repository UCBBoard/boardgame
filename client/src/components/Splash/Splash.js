import React, { Component } from 'react';
import "./Splash.css";
// import Axios from "axios";
import ModalForm from "../ModalForm";
import Modals from "../Modals"
import Background from "../Background"
import ModalLogin from "../ModalLogin";
import logo from "../../assets/img/logo.png"

// First page visitors encounter. Splash gives users the option to
// log in or sign up, available via the Modalform and ModalLogin components.
// Also, fancy background.

class Splash extends Component {
  render () {
    return(
      <Background backgroundName="splash-background">
        <div className="splashHolder">
          <img src={logo} className="siteLogo" alt="logo" />
          <h1 className="center-align logoH1">GameVault</h1><br/>
          <h4 className="center-align splashHs splashh4">Your digital board game shelf</h4><br/>
          <div className="center-align">
            {
              <Modals buttonText="Sign Up" header="Sign Up for GameVault">
              <ModalForm />
            </Modals>
          }
            <Modals buttonText="Sign In" header="Sign In to GameVault">
              <ModalLogin />
            </Modals>
          </div>
          <h2 className="center-align splashHs splashLowerH">Share | Store | Record</h2>
        </div>   
      </Background >
    );
  }

}

export default Splash;