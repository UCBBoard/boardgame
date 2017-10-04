import React from "react";
import {Icon, Row, Col} from "react-materialize";
import ReactTooltip from 'react-tooltip';
import "./ListItem.css";


const ListItem = props =>
	<div className="collapsibleContent">
    <ReactTooltip type="light" effect="solid"/>
    <Row>
  		  <Col s={4}>
          <Icon small data-place="top" data-tip="Minimum Players">person</Icon>
          <p className="collapseP">Minimum Players: {props.minPlayers}</p>
      </Col>

  		  <Col s={4}>
          <Icon small data-place="top" data-tip="Maximim Players">group</Icon>
          <p className="collapseP">Maximum Players: {props.maxPlayers}</p>
      </Col>

  		  <Col s={4}>
          <Icon small data-place="top" data-tip="Average Playtime">schedule</Icon>
          <p className="collapseP">Average Playtime: {props.playtime} min</p>
      </Col>
    </Row>
  	</div>

export default ListItem;
