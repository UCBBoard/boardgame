import React, { Component } from 'react';
import "./ModalForm.css";
import {Button} from "react-materialize";
import firebase from 'firebase';
// Modal form called by Splash.
// Responsible for new user creation.


class ModalForm extends Component {
 constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      errors: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.classList.add('active');
    this.setState({
      [e.target.name]: e.target.value
    });
    this.showInputError(e.target.name);
  }
  handleSubmit(e, email, password) {
    e.preventDefault();
    email = this.state.username;
    console.log(email)
    password = this.state.password
    if (password !== this.state.passwordConfirm){
      return false
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      if(error) this.setState({errors:error.message})
    });
  }

  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    inputs.forEach(input => {
      input.classList.add('active');
      const isInputValid = this.showInputError(input.name);
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    return isFormValid
  }
  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';

    if (isPasswordConfirm) {
      if (this.refs.password.value !== this.refs.passwordConfirm.value) {
        this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
      } else {
        this.refs.passwordConfirm.setCustomValidity('');
      }
    }

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`;
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be at least 6 chars`;
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = 'Passwords do not match';
      }
      return false;
    }
    error.textContent = '';
    return true
;  }

  render() {
    return (
      <form noValidate>
        <div className="form-group">
          <div className = "error">
            {this.state.errors}
          </div>
          <label id="usernameLabel"></label>
          <input className="form-control"
            placeholder="Enter your Email"
            type="email"
            name="username"
            ref="username"
            value={ this.state.username }
            onChange={ this.handleChange }
            required />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <label id="passwordLabel"></label>
          <input className="form-control"
            placeholder="Enter your Password"
            type="password"
            name="password"
            ref="password"
            value={ this.state.password }
            onChange={ this.handleChange }
            pattern=".{6,}"
            required />
          <div className="error" id="passwordError" />
        </div>
        <div className="form-group">
          <label id="passwordConfirmLabel"></label>
          <input className="form-control"
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            ref="passwordConfirm"
            value={ this.state.passwordConfirm }
            onChange={ this.handleChange }
            required />
          <div className="error" id="passwordConfirmError" />
        </div>
        <Button waves ="light" className="modalButton"
          onClick={ this.handleSubmit }>submit</Button>

      </form>
    );
  }
}



export default ModalForm;
