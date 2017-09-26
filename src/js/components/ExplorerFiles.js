import React from 'react';
import orderBy from 'lodash/fp/orderBy';
import ExplorerItemRepository from './ExplorerItemRepository';

export default class ExplorerFiles extends React.Component {
  render() {
    return (
      <div className="ui segment" id="explorerFiles">
        <div className="ui list" id="listFiles">
          {this.renderListRepositories()}
        </div>
      </div>     
    )
  }
  renderListRepositories() {
    return this.props.repositories.map(repo => {
      const files = this.props.files.filter(file => file.repositoryId == repo.id);

      return <ExplorerItemRepository key={repo.id} {...repo} files={files} onShowContent={this.props.onShowContent}/>
    })
  }
}
