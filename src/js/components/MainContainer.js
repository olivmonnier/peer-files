import React from 'react';
import Reflux from 'reflux';
import $ from 'jquery';
import ExplorerList from './Explorer/ExplorerList';
import PrimaryContainer from './PrimaryContainer/PrimaryContainer';
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
  componentDidMount() {
    $('#menuTabPrimary .item').tab()
  }
  render() {
    const { repositories, files } = this.state;

    return (
      <div>
        <div id="menuTabPrimary" className="ui menu">
          <a className="active item" data-tab="explorer">Explorer</a>
        </div>
        <div className="ui grid padded active tab" data-tab="explorer">
          <div className="six wide column">
            <ExplorerList repositories={repositories} files={files} onShowContent={this.onShowContent} />
          </div>
          <div className="ten wide column">
            <PrimaryContainer {...this.state} />
          </div>
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