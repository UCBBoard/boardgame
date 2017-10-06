import React, { Component } from "react";
import "./UserProfile.css"
import goblin from "../../assets/cards/goblinCard.png";
import ctrice from "../../assets/cards/ctriceCard.png";
import robo from "../../assets/cards/roboCard.png";
import rat from "../../assets/cards/ratCard.png";
import gnome from "../../assets/cards/gnomeCard.png";
import archer from "../../assets/cards/archerCard.png";
import undead from "../../assets/cards/undeadCard.png";
import naga from "../../assets/cards/nagaCard.png";
import medusa from "../../assets/cards/medusaCard.png";
import bear from "../../assets/cards/bearCard.png";

class UserProfile extends Component {
	determineCard = cardNum => {
		let cardGraphic = [goblin, ctrice, robo, rat, gnome, archer, undead, naga, medusa, bear];
		let cardFlavourText = ["Reviled by most forest dwellers that come upon them, the Goblin nonetheless has a keen propensity for survival.",
		"That's no chicken...",
		'"Does not compute."',
		"The plague rat has been known to bring even the mightiest of civilizations to its knees through the spread of pestilence. Should you see one, erradicate it at once.",
		'"See, there is nutin quite in this world like tinkerin. Tinkerin is the best thing a gnome can do, you see."',
		'"Take the shot, but take it true."',
		"In the coldest corners of the land thera are legends of the dead rising from their graves. Do not be alarmed, however, for such folly could not be true.",
		"Many a sailor has met a gruesome end at the hands of the naga.",
		'"Quick! Look awa-',
		'"ROOOAAAR" - Bear Bearington'
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
