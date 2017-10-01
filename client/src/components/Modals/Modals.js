import React from 'react';
import "./Modals.css";
// import Axios from "axios";
import {Modal, Button} from "react-materialize";

// Modal form called by Splash.
// Responsible for new user creation.

const Modals = props =>
      <Modal
        header={props.header}
        trigger={<Button className="modal-btn">{props.buttonText}</Button>}
        >
          {props.children}
      </Modal>

export default Modals;
