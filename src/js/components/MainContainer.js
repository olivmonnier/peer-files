import React from 'react';
import { observer } from "mobx-react";
import ExplorerFiles from './ExplorerFiles';
import PrimaryContainer from './PrimaryContainer';

@observer 
export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      data: {}
    }
    this.onShowContent = this.onShowContent.bind(this);
  }

  render() {
    const { repositoryStore, fileStore } = this.props;

    return (
      <div className="ui grid container">
        <div className="six wide column">
          <ExplorerFiles repositoryStore={repositoryStore} fileStore={fileStore} onShowContent={this.onShowContent}/>
        </div>
        <div className="ten wide column">
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