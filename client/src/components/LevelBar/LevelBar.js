import React, { Component } from "react";
import "./LevelBar.css"
import {ProgressBar} from "react-materialize";


class LevelBar extends Component {
	state = {
		level: 1,
		expToLevel: 100,
		exp: 1
	}

	increaseLvl = num => {
		let newNum = this.state.exp + 10
		this.setState({exp: newNum})
		console.log(this.state.exp)
	}

	render(){
		return(
			<div className="col s12 levelDiv">
				<h3 className="levelHeader">To Next Level</h3>
				<ProgressBar progress={Math.floor(this.props.exp / this.props.toNextLevel * 100)}/>
			</div>
			
			)
	};
}

export default LevelBar;
