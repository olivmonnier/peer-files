import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FILE,
  REPOSITORY,
  IMAGE,
  VIDEO
} from '../../constants/contentTypes.js';
import MediaView from './MediaView';
import RepositoryView from './RepositoryView';

class PrimaryContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.selectTypeView()}
      </div>
    )
  }
  selectTypeView() {
    const { typeContent } = this.props.selectedInExplorer;

    if (typeContent == FILE) {
      return this.showFile();
    } else if (typeContent == REPOSITORY) {
      const { repository } = this.props.selectedInExplorer;
      return <RepositoryView {...repository} />
    }
  }
  showFile() {
    const { file } = this.props.selectedInExplorer;
    const { type } = file;
    const typeUpper = type.toUpperCase();

    if (typeUpper.includes(IMAGE) || typeUpper.includes(VIDEO)) {
      return <MediaView {...file} />
    }
  }
}

function mapStateToProps(state) {
  const { selectedInExplorer } = state;

  return {
    selectedInExplorer
  }
}

export default connect(mapStateToProps)(PrimaryContainer);