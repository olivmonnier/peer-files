import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RowFile from './RowFile';
import { addFiles, removeFiles } from '../../actions/fileActions';

class ManageFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesSelected: []
    }
    this.handleAddFiles = this.handleAddFiles.bind(this);
    this.handleChangeInputFile = this.handleChangeInputFile.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.onChangeFilesSelected = this.onChangeFilesSelected.bind(this);
  }
  render() {
    const { files, editMode } = this.props;
    const inputStyle = {
      display: 'none'
    }
    const classNameBtDisabled = (this.state.filesSelected.length === 0 ? 'disabled ' : '') + 'item';

    return (
      <div>
        {editMode && 
          <div className="ui secondary menu">
            <a className="item" onClick={this.handleAddFiles}>
              Add files
              <input type="file" multiple style={inputStyle} onChange={this.handleChangeInputFile} />
            </a>
            <a className={classNameBtDisabled} onClick={this.handleRemove}>Remove</a>
          </div>
        }
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              {editMode && 
                <th></th>
              }
              <th>Name</th>
              <th>Content Type</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => 
              <RowFile key={file.id} file={file} editMode={editMode} onChangeFilesSelected={this.onChangeFilesSelected}/>)}
          </tbody>
        </table>
      </div>
    )
  }
  handleAddFiles(event) {
    const el = event.currentTarget;

    el.querySelector('input').click();
  }
  handleChangeInputFile(event) {
    const { repositoryId, addFiles, changeStateloading } = this.props;

    changeStateloading(true);
    addFiles(event.target.files, repositoryId)
      .then(() => changeStateloading(false));
  }
  handleRemove() {
    const { removeFiles } = this.props;

    removeFiles(this.state.filesSelected)
  } 
  onChangeFilesSelected(file, isChecked) {
    this.setState(prevState => ({
      filesSelected: () => {
        if (isChecked) {
          return prevState.filesSelected.concat(file)
        } else {
          return prevState.filesSelected.filter(f => f.id !== file.id)
        }
      }
    }))
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addFiles, removeFiles }, dispatch)
}

export default connect(null, mapDispatchToProps)(ManageFiles);