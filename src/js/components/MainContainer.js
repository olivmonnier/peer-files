import React from 'react';
import Reflux from 'reflux';
import ExplorerFiles from './ExplorerFiles';
import PrimaryContainer from './PrimaryContainer';
import RepositoryStore from '../stores/RepositoryStore';
import FileStore from '../stores/FileStore';

export default class MainContainer extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      data: {}
    }
    this.onShowContent = this.onShowContent.bind(this);
    this.stores = [RepositoryStore, FileStore] ;
  }

  render() {
    const { repositories, files } = this.state;

    return (
      <div className="ui grid padded">
        <div className="six wide column">
          <ExplorerFiles repositories={repositories} files={files} onShowContent={this.onShowContent}/>
        </div>
        <div className="ten wide column">
          <PrimaryContainer {...this.state} />
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