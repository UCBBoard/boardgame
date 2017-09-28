import React from "react";
import {logout} from "../../helpers/auth"

const HoverButtons = () =>
	<div className="fixed-action-btn horizontal">
		<a className="btn-floating btn-large orange darken-3">
			<i className="large material-icons">notifications</i>
		</a>
		<ul>
			<li><a className="btn-floating orange darken-3" onClick={logout}><i className="material-icons">exit_to_app</i></a></li>
			<li><a className="btn-floating orange darken-3"><i className="material-icons">person</i></a></li>
		</ul>
	</div>
export default HoverButtons;
