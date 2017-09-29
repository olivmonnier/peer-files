import React from 'react';
import ExplorerItemRepository from './ExplorerItemRepository';
import ModalNewRepository from './ModalNewRepository';
import RepositoryActions from '../../actions/RepositoryActions';

export default class ExplorerList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickNewRepository = this.handleClickNewRepository.bind(this);
  }
  render() {
    return (
      <div>
        <div className="ui mini top attached menu">
          <a className="item" id="btNewRepository" onClick={this.handleClickNewRepository}>
            New Repository
          </a>
        </div>
        <div className="ui attached segment" id="explorerFiles">
          <div className="ui list" id="listFiles">
            {this.renderListRepositories()}
          </div>
        </div>  
        <ModalNewRepository />
      </div>
    )
  }
  renderListRepositories() {
    return this.props.repositories.map(repo => {
      const files = this.props.files.filter(file => file.repositoryId == repo.id);

      return <ExplorerItemRepository key={repo.id} {...repo} files={files} onShowContent={this.props.onShowContent}/>
    })
  }
  handleClickNewRepository() {
    $('#newRepositoryModal')
      .modal({
        blurring: true,
        onApprove: () => {
          const name = $('input[name="repository-name"]').val();

          RepositoryActions.addRepository({ name });
          this.props.onShowContent();
        }
      })
      .modal('show');
  }
}
