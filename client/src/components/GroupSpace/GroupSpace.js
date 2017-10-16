import React, { Component } from "react";
import "./GroupSpace.css";
import {Button, Modal, Input} from "react-materialize";

class GroupSpace extends Component {

  state = {
    groupName : "",
    groupDesc: "",
    groupLoc: ""
  }

  addAndJoinGroup = () => {
    let uID = this.props.uID;
  }

  onInputChange = (e) => {
    let key = e.target.id;
    let val = e.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  render (props) {
    return (
      <div className="col s12 center grouplistBox">
        <div className="groupspaceHeader">
          <h2 className="grouplistHeader">Groups</h2>

          <Modal
            header="Create a group"
            id="new-group-modal"
            actions=" "
            trigger={<Button className='blue' id="new-group-btn" waves='light'>Create a new group</Button>}>
            <form>
              <Input s={10} placeholder="Group Name" id="groupName" name="ng-name" onChange={this.onInputChange}/>
              <Input s={10} placeholder="Description" id="groupDesc" name="ng-descrip" onChange={this.onInputChange}/>
              <Input s={10} placeholder="Location" id="groupLoc" name="ng-loc" onChange={this.onInputChange}/>
              <Input type="submit"/>
            </form>
          </Modal>

        </div>

      </div>
    )
  }
}

export default GroupSpace;