import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createObjectUrl } from '../../utils/uint8array';
import { uncompress } from '../../utils/buffer';
import { removeFile } from '../../actions/fileActions';
import { IMAGE } from '../../constants/contentTypes';

class MediaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
    const { name, type } = this.props;
    const typeUpper = type.toUpperCase();
    const classNameLoader = (this.state.loading ? 'active ' : '') + 'ui dimmer';

    return (
      <div>
        {this.state.removed ? (
          <div className="ui positive message">
            <p>File removed with success</p>
          </div>
        ) : (
            <div>
              <div className="ui top attached menu">
                <div className="header item">{name}: </div>
                <a id="btRemoveFile" className="item" onClick={this.handleRemove}>
                  Delete file
              </a>
              </div>
              <div className="ui center aligned attached segment">
                <div className="ui image">
                  { typeUpper.includes(IMAGE) ? (
                    <img src={this.state.url} />
                  ) : (
                    <video src={this.state.url} autoplay controls />
                  )}                 
                </div>
                <div className={classNameLoader}>
                  <div className="ui loader"></div>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
  changeStateloading(isLoading) {
    this.setState({
      loading: isLoading
    })
  }
  setUrlStateContent(buffer) {
    const content = uncompress(buffer);

    createObjectUrl(content)
      .then(url => this.setState({ url }));
  }
  handleRemove(event) {
    const { id, repositoryId, removeFile } = this.props;

    this.changeStateloading(true);
    removeFile(id, repositoryId)
      .then(() => {
        this.changeStateloading(false);
        this.setState({
          removed: true
        })
      });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeFile }, dispatch)
}

export default connect(null, mapDispatchToProps)(MediaView);