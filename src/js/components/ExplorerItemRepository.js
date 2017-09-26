import React from 'react';
import { observer } from "mobx-react";
import ExplorerItemFile from './ExplorerItemFile';

@observer class ExplorerItemRepository extends React.Component {
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
    if (this.state.opened) {
      return this.props.files.map(file => {
        return <ExplorerItemFile key={file.id} {...file} onShowContent={this.props.onShowContent} />
      })
    }
  }
  handleToggleClick() {
    this.setState(prevState => ({
      opened: !prevState.opened 
    }));
    this.props.onShowContent('repository', { id: this.props.id });
  }
}

export default ExplorerItemRepository;