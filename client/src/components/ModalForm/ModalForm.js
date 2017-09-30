import React from 'react';
import "./ModalForm.css";
import {Button} from "react-materialize";

// Modal form called by Splash.
// Responsible for new user creation.

const ModalForm = props =>
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
          <Button waves='light' className="submitButton">Submit</Button>
        </form>

export default ModalForm;
