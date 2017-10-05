import React from "react";
import "./GoogleLogin.css"
import {Button} from "react-materialize";
import {googleLogin} from "../../helpers/auth.js";


const GoogleLogin = () =>
			<div>
				<Button className="googleLoginBtn" modal="close" waves='light'
				onClick={googleLogin}>
					Login With Google
				</Button>
			</div>


export default GoogleLogin;
