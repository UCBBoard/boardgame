import React from "react";
import "./ListItem.css";
import {Button, Icon} from "react-materialize";

const ListItem = props =>
  <li className="gamelist-item" id={props.game}>
    <div className="list-item-box">
      <h4 className="list-item-name">{props.game}</h4>
      <Icon className="game-list-icon" onClick="">delete</Icon>
      <Icon className="game-list-icon" onClick="">keyboard_arrow_down</Icon>
    </div>
  </li>;

export default ListItem;
