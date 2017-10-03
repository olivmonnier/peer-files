import React from 'react';
import ExplorerItemFile from './ExplorerItemFile';
import {
  selectRepository
} from '../../actions/RepositoryActions.js'

export default class ExplorerItemRepository extends React.Component {
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
      <div className="item" data-id={id} data-type="repository" onClick={this.handleToggleClick}>
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
        return <ExplorerItemFile key={file.id} {...file} onSelectFile={this.props.onSelectFile}/>
      })
    }
  }
  handleToggleClick() {
    const { id, name, onSelectRepository } = this.props;

    this.setState(prevState => ({
      opened: !prevState.opened 
    }));
    onSelectRepository({ id, name });
  }
}