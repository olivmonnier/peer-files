import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFile } from '../../actions/fileActions';
import {
  IMAGE,
  VIDEO
} from '../../constants/contentTypes';

class ItemFile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const { name, type } = this.props.file;

    return (
      <a className="item" onClick={this.handleClick}>
        <i className={this.renderTypeIcon(type)}></i>
        <div className="content">
          <div className="header">{name}</div>
        </div>
      </a>
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
  handleClick(event) {
    event.stopPropagation();

    const { file } = this.props;

    this.props.selectFile(file);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectFile }, dispatch);
}

export default connect(null, mapDispatchToProps)(ItemFile);