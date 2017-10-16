import React, { Component } from "react";
import "./GroupSpace.css";
import {Button, Modal, Input} from "react-materialize";

class GroupSpace extends Component {


  render (props) {
    return (
      <div className="col s12 center gamelistBox">
        <div className="groupspaceHeader">
          <h2>Groups</h2>

          <Modal
            header="Create a group"
            id="new-group-modal"
            actions=" "
            trigger={<Button className='blue' id="new-group-btn" waves='light'>Create a new group</Button>}>
            <form>
              <Input s={10} placeholder="Group Name" name="newgroup"/>
            </form>
          </Modal>

        </div>
      </div>
    )
  }
}

export default GroupSpace;