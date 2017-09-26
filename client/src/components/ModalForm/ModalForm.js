import React, { Component } from 'react';
import "./ModalForm.css";
// import Axios from "axios";
import {Modal, Button} from "react-materialize";

// Modal form called by Splash.
// Responsible for new user creation.

class ModalForm extends Component {
  render () {
    return (
      <Modal
        header="Sign Up for GameVault"
        trigger={<Button className="modal-btn">Sign Up</Button>}
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
          <input
            placeholder="Repeat Password"
            type="password"
            id="user-input-pw"
            name="user-input-pw"
          /><br/>
          <Button waves='light'>Submit</Button>

        </form>
      </Modal>
    )
  };
}

export default ModalForm;
