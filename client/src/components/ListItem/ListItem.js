import React from "react";
import "./ListItem.css";

const ListItem = props =>
  <Collapsible trigger={props.game} className="collapsibleItem">
        <p>This is the collapsible content. It can be any element or React component you like.</p>
        <p>It can even be another Collapsible component. Check out the next section!</p>
      </Collapsible>

export default ListItem;
