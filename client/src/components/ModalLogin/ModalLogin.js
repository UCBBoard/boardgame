import React, { Component } from 'react';
import "./ModalLogin.css";
// import Axios from "axios";
import {Modal, Button} from "react-materialize";

// Displayed on Splash page along with ModalForm
// This modal is for returning users to sign into their accounts

class ModalLogin extends Component {

  render () {
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
          <Button waves='light' onClick={}>Submit</Button>
        </form>
      </Modal>
    )

  };
}

export default ModalLogin;
