import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import { selectFile, removeFiles } from '../../../actions/fileActions';

class ManageFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesSelected: []
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidUpdate() {
    const { editMode } = this.props;

    if(editMode) {
      $('.ui.checkbox').checkbox();
    }
  }
  render() {
    const { files, editMode } = this.props;
    const classNameBtDisabled = (this.state.filesSelected.length === 0 ? 'disabled ' : '') + 'item';

    return (
      <div>
        {editMode && 
          <div className="ui secondary menu">
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
            {files.map(file => {
              return (
                <tr key={file.id} onClick={this.handleSelect(file)}>
                  { editMode && 
                    <td>
                      <div className="ui checkbox">
                        <input type="checkbox" className="hidden"/>
                      </div>
                    </td>
                  }
                  <td><i className="file outline icon"></i> {file.name}</td>
                  <td>{file.type}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
  handleSelect(file) {
    const { selectFile, editMode } = this.props;
    
    return function(event) {
      if (editMode) {
        const $checkbox = $(event.currentTarget).find('.ui.checkbox');
        const isChecked = $checkbox.checkbox('is checked');

        $checkbox.checkbox('toggle');

        this.setState(prevState => ({
          filesSelected: this.changeStateFilesSelected(isChecked, prevState, file)
        }))
      } else {
        selectFile(file)
      }
    }.bind(this)
  }
  handleRemove() {
    const { removeFiles } = this.props;

    removeFiles(this.state.filesSelected)
  }
  changeStateFilesSelected(isChecked, prevState, file) {
    if(isChecked) {
      return prevState.filesSelected.filter(f => f.id !== file.id)
    } else {
      return prevState.filesSelected.concat(file)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectFile, removeFiles }, dispatch)
}

export default connect(null, mapDispatchToProps)(ManageFiles);