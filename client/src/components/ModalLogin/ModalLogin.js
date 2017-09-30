import React from 'react';
import "./ModalLogin.css";
// import Axios from "axios";
import { Button} from "react-materialize";
import GoogleLogin from "../GoogleLogin";

// Displayed on Splash page along with ModalForm
// This modal is for returning users to sign into their accounts

const ModalLogin = props =>
      <div>
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
          <Button waves='light' className="modalButton" modal="close">Submit</Button>
        </form>
        <GoogleLogin />
    </div>

export default ModalLogin;
