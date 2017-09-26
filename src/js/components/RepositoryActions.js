import React from 'react';

export default class RepositoryActions extends React.Component {
  render() {
    const { id } = this.props;
    const inputStyle = {
      display: 'none'
    }

    return (
      <div className="ui buttons">
        <label htmlFor="btInputFile" className="ui positive button">
          Add file
          <input type="file" id="btInputFile" data-id={ id } multiple style={ inputStyle } />
        </label>
        <div className="or"></div>
        <button id="btRemoveRepository" className="ui button">Remove repository</button>
      </div>
    )
  }
}