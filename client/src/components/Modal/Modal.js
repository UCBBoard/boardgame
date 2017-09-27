import React, { Component } from 'react';
import "./Modal.css";
// import Axios from "axios";
import {Modal, Button} from "react-materialize";

// Modal form called by Splash.
// Responsible for new user creation.

const Modal = props => 
      <Modal
        header={props.header}
        trigger={<Button className="modal-btn">Sign Up</Button>}
        >

          {props.children}
      </Modal>

export default Modal;
