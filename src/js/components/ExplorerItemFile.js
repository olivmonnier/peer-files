import React from 'react';

export default class ExplorerItemFile extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const { id, name } = this.props;

    return (
      <div className="item" data-id={id} data-type="file" onClick={this.handleClick}>
        <i className="file icon"></i>
        <div className="content">
          <div className="header">{name}</div>
        </div>
      </div>
    )
  }

  handleClick(event) {
    event.stopPropagation();

    this.props.onShowContent('file', this.props)
  }
}