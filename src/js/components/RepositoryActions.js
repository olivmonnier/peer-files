import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';

export default class RepositoryActions extends Component {
  render(props) {
    const { id } = props;
    
    return (
      <div class="ui buttons">
        <label for="btInputFile" class="ui positive button">
          Add file
          <input type="file" id="btInputFile" data-id={ id } multiple style="display: none" />
        </label>
        <div class="or"></div>
        <button id="btRemoveRepository" class="ui button">Remove repository</button>
      </div>
    )
  }
}