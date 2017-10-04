import React, { Component } from 'react';
import "./ModalLogin.css";
// import Axios from "axios";
import {Button} from "react-materialize";
import GoogleLogin from "../GoogleLogin";
import firebase from 'firebase';
// Displayed on Splash page along with ModalForm
// This modal is for returning users to sign into their accounts

class ModalLogin extends Component {
  state = {
    email:'',
    password:'',
    errors: '',
  };

  login = (event, email, password) => {
    email = this.state.email;
    password = this.state.password
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
      if(error) this.setState({errors:error.message})
    });
  }

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  }
  render(){
    return(
      <div>
        <div className="errorMsg">
          {this.state.errors}
        </div>
        <form>
          <input
          placeholder="Enter your Email"
          type="text"
          id="user-input-name"
          name="email"
          label="Enter Your Email Address"
          onChange={this.handleInputChange}
          required={true} /><br/>
          <input
          placeholder="Password"
          type="password"
          id="user-input-pw"
          name="password"
          onChange={this.handleInputChange}
          /><br/>
          <Button waves='light' className="modalButton" onClick={this.login}>Submit</Button>
        </form>
      <GoogleLogin />
    </div>
    )
  }
}

  export default ModalLogin;


