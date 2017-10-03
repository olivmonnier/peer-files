import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import ExplorerList from './Explorer/ExplorerList';
import PrimaryContainer from './PrimaryContainer/PrimaryContainer';
import {
  addRepository,
  fetchRepositories,
  selectRepository
} from '../actions/RepositoryActions';
import {
  fetchFiles
} from '../actions/FileActions';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onAddRepository = this.onAddRepository.bind(this);
    this.onSelectRepository = this.onSelectRepository.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);
  }
  componentDidMount() {
    const { dispatch, selectedRepository } = this.props;
    dispatch(fetchRepositories());

    $('#menuTabPrimary .item').tab()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRepository !== this.props.selectedRepository) {
      const { dispatch, selectedRepository } = nextProps; 
      dispatch(fetchFiles(selectedRepository));
    }
  }
  render() {
    const { repositories, filesByRepository, selectedRepository } = this.props;

    return (
      <div>
        <div id="menuTabPrimary" className="ui menu">
          <a className="active item" data-tab="explorer">Explorer</a>
        </div>
        <div className="ui grid padded active tab" data-tab="explorer">
          <div className="six wide column">
            <ExplorerList 
              repositories={repositories} 
              files={filesByRepository} 
              onAddRepository={this.onAddRepository}
              onSelectRepository={this.onSelectRepository}
              onSelectFile={this.onSelectFile} />
          </div>
          <div className="ten wide column">
            <PrimaryContainer {...this.state} />
          </div>
        </div>
      </div>    
    )
  }
  onAddRepository(newRepository) {
    this.props.dispatch(addRepository(newRepository));
  }
  onSelectRepository(nextRepository) {
    this.props.dispatch(selectRepository(nextRepository));
    this.setState({
      type: 'repository',
      data: nextRepository
    })
  }
  onSelectFile(nextFile) {
    this.setState({
      type: 'file',
      data: nextFile
    })
  }
}

function mapState(state) {
  const { repositories, filesByRepository, selectedRepository } = state;

  return {
    repositories,
    selectedRepository,
    filesByRepository
  }
}

export default connect(mapState)(MainContainer);