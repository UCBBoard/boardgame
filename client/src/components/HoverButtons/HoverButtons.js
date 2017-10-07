import React from "react";
import {logout} from "../../helpers/auth"
import Friendslist from "../Friendslist";
import Notifications from "../Notifications";
import {Modal} from "react-materialize";
import ReactTooltip from 'react-tooltip';
import "./HoverButtons.css";


const HoverButtons = (props) =>
	<div className="fixed-action-btn">
		<ReactTooltip type="light" effect="solid"/>
		<Modal
      header="Notifications"
      trigger={<a className="btn-floating btn-large orange darken-3" data-place="top" data-tip="Notifications">
			<i className="material-icons">{props.notifications.length > 0 ? "notifications_active" : "notifications" }</i></a>}>
      <Notifications notifications={props.notifications} getNotifications={props.getNotifications}/>
		</Modal>
		<ul>
			<li className="hoverButtonLi"><a className="btn-floating orange darken-3" onClick={logout}><i className="material-icons" data-tip="Log Out" >exit_to_app</i></a></li>
				<Modal
        header="Friends"
        trigger={<li className="hoverButtonLi"><a className="btn-floating orange darken-3"><i className="material-icons" data-tip="Contacts" data-place="left" >contacts</i></a></li>}
        >
        	<Friendslist/>
				</Modal>
		</ul>
	</div>
export default HoverButtons;
