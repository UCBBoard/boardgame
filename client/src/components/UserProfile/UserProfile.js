import React, { Component } from "react";
import "./UserProfile.css"
import goblin from "../../assets/cards/goblinCard.png"
import ctrice from "../../assets/cards/ctriceCard.png"
import robo from "../../assets/cards/roboCard.png"
import rat from "../../assets/cards/ratCard.png"
import gnome from "../../assets/cards/gnomeCard.png"

class UserProfile extends Component {
	determineCard = cardNum => {
		let cardGraphic = [goblin, ctrice, robo, rat, gnome];
		let cardFlavourText = ["Reviled by most forest dwellers that come upon them, the Goblin nonetheless has a keen propensity for survival.",
		"That's no chicken...",
		"Does not compute.",
		"The plague rat has been known to bring even the mightiest of civilizations to its knees through the spread of pestilence. Should you see one, erradicate it at once.",
		"See, there's nutin' quite in this world like tinkerin'. Tinkerin's the best thing a gnome can do, y'see."
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
