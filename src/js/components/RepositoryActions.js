import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';

export default class RepositoryActions extends Component {
  render(props) {
    const { id } = props;
    
    return (
      <div className="ui buttons">
        <label for="btInputFile" className="ui positive button">
          Add file
          <input type="file" id="btInputFile" data-id={ id } multiple style="display: none" />
        </label>
        <div className="or"></div>
        <button id="btRemoveRepository" className="ui button">Remove repository</button>
      </div>
    )
  }
}