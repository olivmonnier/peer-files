import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemFile from './ItemFile';
import { selectRepository } from '../../actions/repositoryActions';
import { selectFile } from '../../actions/fileActions';

class ItemRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
  }
  render() {
    const { id, name } = this.props;
    const classNamesIcoFolder = (this.state.opened ? 'open ' : '') + 'folder icon outline';

    return (
      <div className="item">
        <i className={classNamesIcoFolder} onClick={this.handleToggleOpen}></i>
        <div className="middle aligned content">
          <div className="header" onClick={this.handleSelect}>{name}</div>
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
        return <ItemFile key={file.id} file={file}/>
      })
    }
  }
  handleSelect() {
    const { id, name, selectRepository } = this.props;

    selectRepository({ id, name });

    this.setState({
      opened: true
    })
  }
  handleToggleOpen() {
    const { files } = this.props;

    if(!this.state.opened && !files) {
      this.handleSelect()
    } else {
      this.setState(prevState => ({
        opened: !prevState.opened
      }));
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRepository }, dispatch);
}

export default connect(null, mapDispatchToProps)(ItemRepository);