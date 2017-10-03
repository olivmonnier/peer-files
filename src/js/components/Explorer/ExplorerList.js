import React from 'react';
import ExplorerItemRepository from './ExplorerItemRepository';
import ModalNewRepository from './ModalNewRepository';

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
    const { repositories, files, onSelectRepository, onSelectFile } = this.props;

    return this.props.repositories.map(repo => {
      const filesInRepository = files[repo.id];
      return (
        <ExplorerItemRepository 
          key={repo.id} 
          {...repo} 
          files={filesInRepository} 
          onSelectRepository={onSelectRepository}
          onSelectFile={onSelectFile} />
      )
    })
  }
  handleClickNewRepository() {
    $('#newRepositoryModal')
      .modal({
        blurring: true,
        onApprove: () => {
          const name = $('input[name="repository-name"]').val();
          this.props.onAddRepository({ name })
        }
      })
      .modal('show');
  }
}
