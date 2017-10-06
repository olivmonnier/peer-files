import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemRepository from './ItemRepository';
import ModalNewRepository from './ModalNewRepository';
import { fetchRepositories } from '../../actions/repositoryActions';
import { fetchFiles } from '../../actions/fileActions';
import { REPOSITORY } from '../../constants/contentTypes.js';

class Explorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalNewRepository: false
    }
    this.handleClickNewRepository = this.handleClickNewRepository.bind(this);
  }
  componentDidMount() {
    this.props.fetchRepositories();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedInExplorer !== this.props.selectedInExplorer) {
      if (nextProps.selectedInExplorer.typeContent == REPOSITORY) {
        const { repository } = nextProps.selectedInExplorer;
        this.props.fetchFiles(repository);
      }
    }
  }
  render() {
    return (
      <div>
        <div className="ui top attached menu">
          <a className="item" id="btNewRepository" onClick={this.handleClickNewRepository}>
            New Repository
          </a>
        </div>
        <div className="ui attached segment" id="explorerFiles">
          <div className="ui list" id="listFiles">
            {this.renderListRepositories()}
          </div>
        </div>  
        <ModalNewRepository visible={this.state.showModalNewRepository}/>
      </div>
    )
  }
  renderListRepositories() {
    const { repositories, files } = this.props;

    return this.props.repositories.map(repo => {
      return (
        <ItemRepository 
          key={repo.id} 
          {...repo} 
          files={files[repo.id]} />
      )
    })
  }
  handleClickNewRepository() {
    this.setState({
      showModalNewRepository: true
    })
  }
}

function mapStateToProps(state) {
  const { repositories, selectedInExplorer, filesByRepository } = state;
  return {
    repositories, 
    selectedInExplorer,
    files: filesByRepository
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFiles, fetchRepositories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Explorer)