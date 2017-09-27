import React from "react";
import "./ListItem.css";

const ListItem = props =>
  <li className="gamelist-item" id={props.iteration}>
    <p>{props.game}</p>
  </li>;

export default ListItem;
