import React, { Component } from 'react';
import "./Splash.css";
import Axios from "axios";
import ModalForm from "../ModalForm";
import ModalLogin from "../ModalLogin";

// First page visitors encounter. Splash gives users the option to
// log in or sign up, available via the Modalform and ModalLogin components.
// Also, fancy background.

class Splash extends Component {
  render () {
    return(
      <div className="splash-background">
        <h1>GameVault</h1>
        <h2>Your digital board game shelf</h2><br/>
        <h3>Share</h3>
        <h3>Record</h3>
        <h3>Something Else...</h3>
        <ModalForm />
        <ModalLogin />
      </div>
    );
  }

}

export default Splash;