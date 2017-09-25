import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';
import ExplorerItemFile from './ExplorerItemFile';

export default class ExplorerItemRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  render(props) {
    const { id, name } = props;
    const classNamesIcoFolder = (this.state.opened ? 'open ' : '') + 'folder icon';

    return (
      <a className="item" data-id={id} data-type="repository" onClick={this.handleToggleClick}>
        <i className={classNamesIcoFolder} ></i>
        <div className="content">
          <div className="header">{name}</div>
          <div className="list">
            {this.renderFileList()}
          </div>
        </div>
      </a>
    )
  }
  renderFileList() {
    if (this.state.opened) {
      return this.props.files.map(file => {
        return <ExplorerItemFile {...file} onShowContent={this.props.onShowContent} />
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