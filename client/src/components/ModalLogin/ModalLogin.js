import React, { Component } from 'react';
import "./ModalLogin.css";
import Axios from "axios";
import {Modal, Button} from "react-materialize";

// Displayed on Splash page along with ModalForm
// This modal is for returning users to sign into their accounts

class ModalLogin extends Component {

  state = {
    UID : ""
  }

  tempLogIn = (event) => {
    event.preventDefault();
    console.log("loggin in");
    const userName = document.getElementById("user-input-name").val();
    console.log(userName);
    this.setState({UID: userName});
  }


  // dashRedirect = (arg) => {
  //   console.log("redirecting");
  //   return Axios.get('/dash/' + arg);
  // }

  render (props) {
    return (
      <Modal
        header="Sign In To GameVault"
        trigger={<Button className="modal-btn">Sign In</Button>}
        >
        <form>
          <input
            placeholder="Enter your Email"
            type="text"
            id="user-input-name"
            name="user-input-name"
            label="Enter Your Email Address"
          /><br/>
          <input
            placeholder="Password"
            type="password"
            id="user-input-pw"
            name="user-input-pw"
          /><br/>
          <Button waves='light' onClick={(event) => {this.tempLogIn}}>Submit</Button>
        </form>
      </Modal>
    )

  };
}

export default ModalLogin;
