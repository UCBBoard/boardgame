import React from "react";
import {logout} from "../../helpers/auth"
import Friendslist from "../Friendslist";
import {Modal} from "react-materialize";
import ReactTooltip from 'react-tooltip';


const HoverButtons = () =>

	<div className="fixed-action-btn">
		<ReactTooltip type="light" effect="solid"/>
			<a className="btn-floating btn-large orange darken-3" p data-place="top" data-tip="Notifications" >
				<i className="large material-icons" >notifications</i>
			</a>
		<ul>
			<li><a className="btn-floating orange darken-3" onClick={logout}><i className="material-icons" p data-tip="Log Out">exit_to_app</i></a></li>
			<li><a className="btn-floating orange darken-3"><i className="material-icons" p data-tip="Profile" >person</i></a></li>
				<Modal
        header="Friends"
        trigger={<li><a className="btn-floating orange darken-3"><i className="material-icons" p data-tip="Contacts">contacts</i></a></li>}
        >
        	<Friendslist/>
				</Modal>
		</ul>
	</div>
export default HoverButtons;
