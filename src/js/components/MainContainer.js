import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';
import ExplorerFiles from './ExplorerFiles';
import PrimaryContainer from './PrimaryContainer';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      data: {}
    }
    this.onShowContent = this.onShowContent.bind(this);
  }

  render(props) {
    return (
      <div class="ui grid container">
        <div class="six wide column">
          <ExplorerFiles {...props} onShowContent={this.onShowContent}/>
        </div>
        <div class="ten wide column">
          <PrimaryContainer {...this.state}/>
        </div>
      </div>
    )
  }

  onShowContent(type, data) {
    this.setState({
      type, data
    })
  }
}