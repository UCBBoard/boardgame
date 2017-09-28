import React from "react";
import "./Background.css";

const Background = props =>
	<div className={props.backgroundName}>
		{props.children}
	</div>
export default Background;
