import React from 'react';
import RepositoryActions from '../actions/RepositoryActions';
import FileActions from '../actions/FileActions';

export default class RepositoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    }
    this.handleSelectFiles = this.handleSelectFiles.bind(this);
    this.handleChangeInputFile = this.handleChangeInputFile.bind(this);
    this.handleRemoveRepository = this.handleRemoveRepository.bind(this);
  }
  render() {
    const { id, name } = this.props;
    const inputStyle = {
      display: 'none'
    }

    return (
      <div>
        { this.state.removed ? (
          <div className="ui positive message">
            <p>Repository removed with success</p>
          </div>
        ) : (
          <div className="ui secondary menu">
            <div className="header item">{name}: </div>
            <a className="item" id="btInputFile" onClick={this.handleSelectFiles}>
              Add files
              <input type="file" data-id={id} multiple style={inputStyle} onChange={this.handleChangeInputFile} />
            </a>
            <a id="btRemoveRepository" className="item" onClick={this.handleRemoveRepository}>Remove repository</a>
          </div>
        )}
      </div>     
    )
  }
  handleSelectFiles(event) {
    const el = event.currentTarget;

    el.querySelector('input').click();
  }
  handleChangeInputFile(event) {
    const { onStateChangeloading } = this.props;
    const el = event.currentTarget;
    const repositoryId = el.dataset.id;

    onStateChangeloading(true);

    FileActions.addFiles(event.target.files, repositoryId);

    FileActions.addFiles.success.listen(function() {
      onStateChangeloading(false)
    })
  }
  handleRemoveRepository() {
    const { id, onStateChangeloading } = this.props;
    const self = this;

    onStateChangeloading(true);

    FileActions.removeFiles.success.listen(function() {
      RepositoryActions.removeRepository(id);
    })
    RepositoryActions.removeRepository.success.listen(function() {
      onStateChangeloading(false);
      self.setState({ removed: true });
    })
    FileActions.removeFiles(id);
  }
}