import React from "react";
import {Icon, Row, Col} from "react-materialize";
import ReactTooltip from 'react-tooltip';
import "./ListItem.css";


const ListItem = props =>
	<div className="collapsibleContent">
    <ReactTooltip type="light" effect="solid" />
    <Row>
  		  <Col s={4} data-place="top" data-tip="Minimum Players" data-offset="{'top': -15}">
          <Icon small>person</Icon>
          <p className="collapseP">{props.minPlayers}</p>
      </Col>

  		  <Col s={4} data-place="top" data-tip="Maximum Players" data-offset="{'top': -15}">
          <Icon small>group</Icon>
          <p className="collapseP">{props.maxPlayers}</p>
      </Col>

  		  <Col s={4} data-place="top" data-tip="Average Playtime" data-offset="{'top': -15}">
          <Icon small>schedule</Icon>
          <p className="collapseP">{props.playtime} min.</p>
      </Col>
    </Row>
  	</div>

export default ListItem;
