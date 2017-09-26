import React from 'react';
import { createObjectUrl } from '../utils/uint8array';
import { uncompress } from '../utils/buffer';

export default class PreviewVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }
  componentDidMount() {
    this.setUrlStateContent(this.props.buffer)
  }
  componentWillReceiveProps(nextProps) {
    this.setUrlStateContent(nextProps.buffer)
  }
  render() {
    const { name, id, url } = this.props;

    return (
      <div>
        <div className="ui secondary menu">
          <div className="header item">{name}</div>
          <div className="right menu">
            <a id="btRemoveFile" data-id={id} className="ui icon item">
              <i className="trash icon"></i>
            </a>
          </div>
        </div>
        <div className="ui image">
          <video src={this.state.url} autoplay controls />
        </div>
      </div>
    )
  }
  setUrlStateContent(buffer) {
    const content = uncompress(buffer);

    createObjectUrl(content)
      .then(url => this.setState({ url }));
  }
} 