import React from "react";
import "./ListItem.css";
import {Button, Icon, CollapsibleItem} from "react-materialize";

const ListItem = props =>
  <CollapsibleItem
      header={props.game}
      className="gamelist-item"
      id={props.game}
  >
    <div className="list-item-box">
      <Icon
          className="game-list-icon"
      >delete
      </Icon>
      <Icon
          className="game-list-icon"
      >keyboard_arrow_down
      </Icon>
    </div>
  </CollapsibleItem>;

export default ListItem;
