import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createObjectUrl } from '../../utils/uint8array';
import { uncompress } from '../../utils/buffer';
import { IMAGE } from '../../constants/contentTypes';
import { selectRepository } from '../../actions/repositoryActions';
import { removeFile } from '../../actions/fileActions';

class MediaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      url: '',
      removed: false
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSelectRepository = this.handleSelectRepository.bind(this);
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
    const { name, type, repository } = this.props;
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
                <div className="header item">
                  <div className="ui breadcrumb">
                    <a className="section" onClick={this.handleSelectRepository}>{repository.name}</a>
                    <i className="right angle icon divider"></i>
                    <div className="active section">{name}</div>
                  </div>
                </div>
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
  handleSelectRepository() {
    const { repository, selectRepository } = this.props;

    selectRepository(repository);
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

function mapStateToProps(state) {
  const repositoryId = state.selectedInExplorer.file.repositoryId;
  const repository = state.repositories.filter(repo => repo.id === repositoryId)[0];

  return { repository }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeFile, selectRepository }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaView);