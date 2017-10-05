import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManageFiles from './ManageFiles';
import { addFiles, removeFiles } from '../../../actions/fileActions';
import { removeRepository } from '../../../actions/repositoryActions';

class RepositoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false,
      loading: false,
      edit: false
    }
    this.handleSelectFiles = this.handleSelectFiles.bind(this);
    this.handleChangeInputFile = this.handleChangeInputFile.bind(this);
    this.handleRemoveRepository = this.handleRemoveRepository.bind(this);
    this.handleToggleEditMode = this.handleToggleEditMode.bind(this);
  }
  componentWillReceiveProps() {
    this.setState({
      removed: false,
      edit: false
    });
  }
  render() {
    const { id, name } = this.props;
    const inputStyle = {
      display: 'none'
    }
    const classNameLoader = (this.state.loading ? 'active ' : '') + 'ui dimmer';
    const classNameEdit = (this.state.edit ? 'active ' : '') + 'item';

    return (
      <div>
        { this.state.removed ? (
          <div className="ui positive message">
            <p>Repository removed with success</p>
          </div>
        ) : (
          <div>
            <div className="ui top attached menu">
              <div className="header item">{name}: </div>
              <a className="item" onClick={this.handleRemoveRepository}>Remove repository</a>
              <a className="item" onClick={this.handleSelectFiles}>
                Add files
                <input type="file" multiple style={inputStyle} onChange={this.handleChangeInputFile} />
              </a>             
              <a className={classNameEdit} onClick={this.handleToggleEditMode}>Edit files</a>
            </div>
            <div className="ui attached segment">
              {this.renderFilesList()}
              <div className={classNameLoader}>
                <div className="ui loader"></div>
              </div>
            </div>
          </div>
        )}
      </div>     
    )
  }
  renderFilesList() {
    const { files } = this.props;

    if(files && files.length > 0) {
      return(
        <ManageFiles files={files} editMode={this.state.edit}/>
      )
    }
  }
  changeStateloading(isLoading) {
    this.setState({
      loading: isLoading
    })
  }
  handleSelectFiles(event) {
    const el = event.currentTarget;

    el.querySelector('input').click();
  }
  handleChangeInputFile(event) {
    const { id, addFiles } = this.props;

    this.changeStateloading(true);
    addFiles(event.target.files, id)
      .then(() => this.changeStateloading(false));
  }
  handleToggleEditMode() {
    this.setState(prevState => ({
      edit: !prevState.edit
    }))
  }
  handleRemoveRepository() {
    const { id, files, removeFiles, removeRepository } = this.props;

    this.changeStateloading(true);
    removeFiles(files)
      .then(() => removeRepository(id))
      .then(() => {
        this.changeStateloading(false);
        this.setState({
          removed: true
        })
      })
  }
}

function mapStateToProps(state) {
  const { filesByRepository, selectedInExplorer } = state;
  const id = selectedInExplorer.repository.id;

  return {
    files: filesByRepository[id]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addFiles, removeFiles, removeRepository }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryView)