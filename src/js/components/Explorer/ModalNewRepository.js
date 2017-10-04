import React, { Component } from 'react';

export default class ModalNewRepository extends Component {
  render() {
    return (
      <div className="ui basic modal" id="newRepositoryModal">
        <div className="ui header">
          New Repository
        </div>
        <div className="content">
          <div className="ui left icon fluid input">
            <input type="text" name="repository-name" placeholder="Repository name" />
            <i className="folder icon"></i>
          </div>
        </div>
        <div className="actions">
          <div className="ui red basic cancel inverted button">
            <i className="remove icon"></i> Cancel
              </div>
          <div className="ui green ok inverted button">
            <i className="checkmark icon"></i> Save
              </div>
        </div>
      </div> 
    )
  }
}