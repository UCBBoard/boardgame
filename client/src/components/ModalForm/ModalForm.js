import React, { Component } from 'react';
import "./ModalForm.css";
import {Button} from "react-materialize";
import firebase from 'firebase';
import ReactTooltip from 'react-tooltip';

// Modal form called by Splash.
// Responsible for new user creation.




class ModalForm extends Component {
    state = {
      newEmail:'',
      newPassword:''
    };

  create = (event, email, password) => {
    email = this.state.newEmail
    password = this.state.newPassword
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      if(error) console.log(error)
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
      <form>
        <input
        placeholder="Enter your Email"
        type="text"
        id="user-input-name"
        name="newEmail"
        value={this.state.newEmail}
        label="Enter Your Email Address"
        onChange={this.handleInputChange}
        /><br/>
        <input
        placeholder="Password"
        type="password"
        id="newPassword"
        name="newPassword"
        value={this.state.password}
        onChange={this.handleInputChange}
        /><br/>
        <input
        placeholder="Repeat Password"
        type="password"
        id="repeatPassword"
        name="repeatPassword"
        /><br/>
        <Button className="submitButton"  waves='light' onClick={this.create} modal="close">Submit</Button>
        </form>
      )
  }
}
export default ModalForm;
