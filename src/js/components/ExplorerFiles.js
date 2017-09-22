import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';
import orderBy from 'lodash/fp/orderBy';
import ExplorerItemRepository from './ExplorerItemRepository';

export default class ExplorerFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: []
    }
  }
  componentDidMount() {
    this.props.repositories
      .then(repos => orderBy('name', 'asc')(repos))
      .then(repositories => this.setState({ repositories }));
  }
  render() {
    return (
      <div class="ui list" id="listFiles">
        {this.renderListRepositories()}
      </div>
    )
  }
  renderListRepositories() {
    return this.state.repositories.map(repos => 
      <ExplorerItemRepository {...repos}/>)
  }
}