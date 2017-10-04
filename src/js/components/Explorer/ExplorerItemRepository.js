import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExplorerItemFile from './ExplorerItemFile';
import { selectRepository } from '../../actions/repositoryActions';
import { selectFile } from '../../actions/fileActions';

class ExplorerItemRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  render() {
    const { id, name } = this.props;
    const classNamesIcoFolder = (this.state.opened ? 'open ' : '') + 'folder icon';

    return (
      <div className="item" onClick={this.handleToggleClick}>
        <i className={classNamesIcoFolder} ></i>
        <div className="content">
          <div className="header">{name}</div>
          <div className="list">
            {this.renderFileList()}
          </div>
        </div>
      </div>
    )
  }
  renderFileList() {
    if (this.state.opened && this.props.files) {
      return this.props.files.map(file => {
        return <ExplorerItemFile key={file.id} file={file}/>
      })
    }
  }
  handleToggleClick() {
    const { id, name } = this.props;

    this.setState(prevState => ({
      opened: !prevState.opened 
    }));
    this.props.selectRepository({ id, name })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRepository }, dispatch);
}

export default connect(null, mapDispatchToProps)(ExplorerItemRepository);