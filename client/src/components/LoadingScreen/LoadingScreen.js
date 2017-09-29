import React from "react";
import Background from "../Background"
import "./LoadingScreen.css";
import logo from "../../assets/img/logo.png"

const LoadingScreen = () =>
	<Background backgroundName="dash-background">
		<img src={logo} className="loadingLogo" alt="logo" />
		<h2>Loading</h2>
	</Background>
export default LoadingScreen;
