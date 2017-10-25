import React, { Component } from 'react';
import "./FriendSpace.css";
import noFriends from "../../assets/img/noFriends.png";
import {Modal, Button} from "react-materialize";
import Friendslist from "../Friendslist";
import FriendProfileDash from "../FriendProfileDash";
import {Carousel} from "react-materialize";



class FriendSpace extends Component {
  conditional = props => {
    let friends = this.props.friends.map((element, i) => {
            console.log(element);
            return <div key={"fc" + element._id + i}><FriendProfileDash level={element.level} userName={element.name} cardNum={element.cardNum} /></div>
          }
          )

    if (this.props.friends.length > 0){
      return (
        <Carousel options={{ fullWidth: false }}>
          {friends}
        </Carousel>
        )
    }

    else {
      return ( <div>
        <img src={noFriends} alt="noFriends" className="friendsImg"/ >
        <h3 className="friendsSpaceH3">Oh no! Looks like you have no friends yet. Why not add a couple?</h3>
        </div>)
    }
  }

  render = (props) =>
  <div className="col s12 center">
    <h1 className="friendsSpaceH1">Friends</h1>
      <div className="noFriendsDiv">
        {this.conditional()}
        <Modal
	        header="Friends"
	        trigger={<Button className="addFriendButtonDash">Add Friend</Button>}
	        >
	        	<Friendslist uID={this.props.uID}/>
					</Modal>
	      </div>
  </div>
}

export default FriendSpace;
