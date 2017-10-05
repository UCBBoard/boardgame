import React, { Component } from "react";
import "./UserProfile.css"
import goblin from "../../assets/cards/goblinCard.png"
import ctrice from "../../assets/cards/ctriceCard.png"

class UserProfile extends Component {
	determineCard = cardNum => {
		let cardGraphic = [goblin, ctrice, goblin, ctrice, goblin];
		let cardFlavourText = ["Reviled by most forest dwellers that come upon them, the Goblin nonetheless has a keen propensity for survival.",
		"That's no chicken...",
		"Reviled by most forest dwellers that come upon them, the Goblin nonetheless has a keen propensity for survival.",
		"That's no chicken...",
		"Reviled by most forest dwellers that come upon them, the Goblin nonetheless has a keen propensity for survival."
		]
		let cardAlt = ["Goblin card image", "Cockatrice card image", "Goblin card image", "Cockatrice card image", "Goblin card image"]
		return(
			<div className="col s12 center cardDiv">
				<div className="cardTextDiv">
					<h3 className="cardUsername">{this.props.userName}</h3>
					<h5 className="cardLvl">Lv.{this.props.level}</h5>
					<div className="cardDescriptionDiv valign-wrapper">
						<p className="cardDescription">{cardFlavourText[cardNum]}</p>
					</div>
					
				</div>
				<img src={cardGraphic[cardNum]} alt={cardAlt[cardNum]} className="userCard"/>
			</div>
			)
	}

	render(){
		return this.determineCard(this.props.cardNum)
	};
}

export default UserProfile;
