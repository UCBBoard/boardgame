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
		return(
			<div className="col s12 center">
				<h1 className="userSpaceH1">Your Card</h1>
				<h3 className="userSpaceH3">By adding games, adding friends, or more, you can level up your card!</h3>
				<div className="cardDiv center">
					<div className="cardTextDiv">
						<h3 className="cardUsername">{this.props.userName}</h3>
						<h5 className="cardLvl">Lv.{this.props.level}</h5>
						<div className="cardDescriptionDiv valign-wrapper">
							<p className="cardDescription">{cardFlavourText[cardNum]}</p>
						</div>
					</div>
					<img src={cardGraphic[cardNum]} className="userCard"/>
				</div>
			</div>
			)
	}

	render(){
		return this.determineCard(this.props.cardNum)
	};
}

export default UserProfile;
