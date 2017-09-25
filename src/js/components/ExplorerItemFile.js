import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';

export default class ExplorerItemFile extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  render(props) {
    const { id, name } = props;

    return (
      <a className="item" data-id={id} data-type="file" onClick={this.handleClick}>
        <i className="file icon"></i>
        <div className="content">
          <div className="header">{name}</div>
        </div>
      </a>
    )
  }

  handleClick(event) {
    event.stopPropagation();

    this.props.onShowContent('file', this.props)
  }
}