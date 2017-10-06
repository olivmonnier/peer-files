import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import {
  IMAGE,
  VIDEO
} from '../../constants/contentTypes';
import { selectFile } from '../../actions/fileActions';

class RowFile extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidUpdate() {
    const { editMode } = this.props;

    if (editMode) {
      $('.ui.checkbox').checkbox();
    }
  }
  render() {
    const { editMode, file } = this.props;

    return (
      <tr key={file.id} onClick={this.handleSelect(file)}>
        {editMode &&
          <td>
            <div className="ui checkbox">
              <input type="checkbox" className="hidden" />
            </div>
          </td>
        }
        <td><i className={this.renderTypeIcon(file.type)}></i> {file.name}</td>
        <td>{file.type}</td>
      </tr>
    )
  }
  renderTypeIcon(type) {
    let icon = 'file outline icon';
    const typeUpper = type.toUpperCase();

    if (typeUpper.includes(VIDEO)) {
      icon += ' video';
    } else if (typeUpper.includes(IMAGE)) {
      icon += ' image';
    }

    return icon;
  }
  handleSelect() {
    const { file, editMode, selectFile } = this.props;

    return function (event) {
      if (editMode) {
        this.onClickItemFileInEditMode(event, file)
      } else {
        selectFile(file)
      }
    }.bind(this)
  }
  onClickItemFileInEditMode(event, file) {
    const $checkbox = $(event.currentTarget).find('.ui.checkbox');
    const $parent = $(event.target).parent();

    if (!$parent.hasClass('checkbox')) {
      $checkbox.checkbox('toggle');
    }

    const isChecked = $checkbox.checkbox('is checked');

    this.props.onChangeFilesSelected(file, isChecked)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectFile }, dispatch)
}

export default connect(null, mapDispatchToProps)(RowFile);