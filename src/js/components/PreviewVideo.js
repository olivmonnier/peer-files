import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';
import { createObjectUrl } from '../utils/uint8array';
import { uncompress } from '../utils/buffer';

export default class PreviewVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }
  componentDidMount() {
    const content = uncompress(this.props.buffer);

    createObjectUrl(content)
      .then(url => this.setState({ url }));
  }
  render(props) {
    const { name, id, url } = props;

    return (
      <div>
        <div class="ui secondary menu">
          <div class="header item">{name}</div>
          <div class="right menu">
            <a id="btRemoveFile" data-id={id} class="ui icon item">
              <i class="trash icon"></i>
            </a>
          </div>
        </div>
        <div class="ui image">
          <video src={this.state.url} autoplay controls />
        </div>
      </div>
    )
  }
} 