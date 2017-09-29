import React from "react";
import "./ListItem.css";
import {Button, Icon, CollapsibleItem} from "react-materialize";

const ListItem = props =>
  <CollapsibleItem
      header={props.game}
      className="gamelist-item"
      id={props.game}
      icon="delete"
      iconClassName={props.game}
  >
    <div className="list-item-box">
    </div>
  </CollapsibleItem>;

export default ListItem;
