import React from "react";
import "./ListItem.css";
// import Collapsible from 'react-collapsible';
import {CollapsibleItem} from "react-materialize";

const ListItem = props =>
	<div className="collapsibleContent">
  		<p className="collapseP">Minimum Players: {props.minPlayers}</p>
  		<p className="collapseP">Maximum Players: {props.maxPlayers}</p>
  		<p className="collapseP">Average Playtime: {props.playtime} minutes</p>
  	</div>

export default ListItem;
