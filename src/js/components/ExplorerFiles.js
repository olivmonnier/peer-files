import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';
import orderBy from 'lodash/fp/orderBy';
import ExplorerItemRepository from './ExplorerItemRepository';

export default class ExplorerFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      files: []
    }
  }
  componentDidMount() {
    this.props.repositories
      .then(repos => orderBy('name', 'asc')(repos))
      .then(repositories => this.setState({ repositories }));

    this.props.files
      .then(files => orderBy('name', 'asc')(files))
      .then(files => this.setState({ files }));
  }
  render() {
    return (
      <div class="ui segment" id="explorerFiles">
        <div className="ui list" id="listFiles">
          {this.renderListRepositories()}
        </div>
      </div>     
    )
  }
  renderListRepositories() {
    return this.state.repositories.map(repo => {
      const files = this.state.files.filter(file => file.repositoryId == repo.id);

      return <ExplorerItemRepository {...repo} files={files} onShowContent={this.props.onShowContent}/>
    })
  }
}