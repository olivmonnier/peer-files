import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFiles } from '../../actions/fileActions';

class RepositoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    }
    this.handleSelectFiles = this.handleSelectFiles.bind(this);
    this.handleChangeInputFile = this.handleChangeInputFile.bind(this);
    this.handleRemoveRepository = this.handleRemoveRepository.bind(this);
  }
  componentWillReceiveProps() {
    this.setState({
      removed: false
    });
  }
  render() {
    const { id, name } = this.props;
    const inputStyle = {
      display: 'none'
    }

    return (
      <div>
        { this.state.removed ? (
          <div className="ui positive message">
            <p>Repository removed with success</p>
          </div>
        ) : (
          <div>
            <div className="ui mini top attached menu">
              <div className="header item">{name}: </div>
              <a className="item" id="btInputFile" onClick={this.handleSelectFiles}>
                Add files
                <input type="file" multiple style={inputStyle} onChange={this.handleChangeInputFile} />
              </a>
              <a id="btRemoveRepository" className="item" onClick={this.handleRemoveRepository}>Remove repository</a>
            </div>
            <div className="ui attached segment"></div>
          </div>
        )}
      </div>     
    )
  }
  handleSelectFiles(event) {
    const el = event.currentTarget;

    el.querySelector('input').click();
  }
  handleChangeInputFile(event) {
    const { id } = this.props;

    this.props.addFiles(event.target.files, id)
  }
  handleRemoveRepository() {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addFiles }, dispatch)
}

export default connect(null, mapDispatchToProps)(RepositoryView)