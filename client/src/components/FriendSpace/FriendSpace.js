import React from "react";
import "./FriendSpace.css";
import noFriends from "../../assets/img/noFriends.png"

const FriendSpace = () =>
  <div className="col s12 center">
    <h1 className="friendsSpaceH1">Friends</h1>
      <div className="noFriendsDiv">
        <img src={noFriends} alt="noFriends" className="friendsImg"/ >
        <h3 className="friendsSpaceH3">Oh no! Looks like you have no friends yet. Why not add a couple?</h3>
      </div>
  </div>
export default FriendSpace;
