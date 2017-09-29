import React from 'react';
import { createObjectUrl } from '../../utils/uint8array';
import { uncompress } from '../../utils/buffer';
import FileActions from '../../actions/FileActions';

export default class PreviewVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      removed: ''
    }
    this.handleRemove = this.handleRemove.bind(this);
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
        {this.state.removed ? (
          <div className="ui positive message">
            <p>File removed with success</p>
          </div>
        ) : (
          <div>
            <div className="ui mini top attached menu">
              <div className="header item">{name}</div>
              <a id="btRemoveFile" data-id={id} className="item">
                Delete file
              </a>
            </div>
            <div className="ui center aligned attached segment">
              <div className="ui image">
                <video src={this.state.url} autoplay controls />
              </div>
            </div>
          </div>
        )}
      </div>     
    )
  }
  setUrlStateContent(buffer) {
    const content = uncompress(buffer);

    createObjectUrl(content)
      .then(url => this.setState({ url }));
  }
  handleRemove(event) {
    const el = event.currentTarget;
    const id = parseInt(el.dataset.id, 10);
    const self = this;

    FileActions.removeFile(id);
    FileActions.removeFile.success.listen(function () {
      self.setState({ removed: true });
    })
  }
} 