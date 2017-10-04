import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFile } from '../../actions/fileActions';
class ExplorerItemFile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const { name } = this.props.file;

    return (
      <div className="item" onClick={this.handleClick}>
        <i className="file icon"></i>
        <div className="content">
          <div className="header">{name}</div>
        </div>
      </div>
    )
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

export default connect(null, mapDispatchToProps)(ExplorerItemFile);