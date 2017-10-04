import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createObjectUrl } from '../../utils/uint8array';
import { uncompress } from '../../utils/buffer';
import { removeFile } from '../../actions/fileActions';

class PreviewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      removed: false
    }
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    this.setUrlStateContent(this.props.buffer)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      removed: false
    });
    this.setUrlStateContent(nextProps.buffer);
  }
  render() {
    const { name } = this.props;

    return (
      <div>
        { this.state.removed ? (
          <div className="ui positive message">
            <p>File removed with success</p>
          </div>
        ) : (
          <div>
            <div className="ui mini top attached menu">
              <div className="header item">{name}: </div>
              <a id="btRemoveFile" className="item" onClick={this.handleRemove}>
                Delete file
              </a>
            </div>
            <div className="ui center aligned attached segment">
              <div className="ui image">
                <img src={this.state.url} />
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
    const { id, repositoryId } = this.props;

    this.props.removeFile(id, repositoryId);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeFile }, dispatch)
}

export default connect(null, mapDispatchToProps)(PreviewImage);