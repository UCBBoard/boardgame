import React from "react";
import {Icons} from "react-materialize";
import "./ListItem.css";


const ListItem = props =>
	<div className="collapsibleContent">
  		<div icon="person"><p className="collapseP">Minimum Players: {props.minPlayers}</p></div>
  		<div icon="group"/><p className="collapseP">Maximum Players: {props.maxPlayers}</p>
  		<div icon="schedule"/><p className="collapseP">Average Playtime: {props.playtime} minutes</p>
  	</div>

export default ListItem;
