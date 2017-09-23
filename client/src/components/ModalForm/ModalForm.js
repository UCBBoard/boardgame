import React, { Component } from 'react';
import "./ModalForm.css";
import Axios from "axios";
import {Modal} from "react-materialize";

class ModalForm extends Component {
  render () {
    return (
      <Modal
        header="Sign Up for GameVault"
        trigger={<button></button>}
        >
        <form>
          <label htmlFor="user-input-name">Enter your username/e-mail:</label>
          <input
            type="text"
            id="user-input-name"
            name="user-input-name"
          /><br/>
          <label htmlFor="user-input-pw">Enter your password:</label>
          <input
            type="password"
            id="user-input-pw"
            name="user-input-pw"
          /><br/>

        </form>
      </Modal>
    )

  };
}






export default ModalForm;
