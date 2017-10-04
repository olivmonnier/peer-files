import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FILE,
  REPOSITORY
} from '../../constants/contentTypes.js';
import PreviewImage from './PreviewImage';
import PreviewVideo from './PreviewVideo';
import RepositoryView from './RepositoryView';

class PrimaryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.onStateChangeloading = this.onStateChangeloading.bind(this);
  }
  render() {
    const classNameContainer = (this.state.loading ? 'loading ' : '');

    return (
      <div id="primaryContent" className={classNameContainer}>
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
      return <RepositoryView {...repository} onStateChangeloading={this.onStateChangeloading} />
    } else {
      return <div/>;
    }
  }
  showFile() {
    const { file } = this.props.selectedInExplorer;
    const { type } = file;

    if (type.includes('video')) {
      return <PreviewVideo {...file} />
    } else if (type.includes('image')) {
      return <PreviewImage {...file} />
    }
  }
  onStateChangeloading(isLoading) {
    this.setState({
      loading: isLoading
    })
  }
}

function mapStateToProps(state) {
  const { selectedInExplorer } = state;

  return {
    selectedInExplorer
  }
}

export default connect(mapStateToProps)(PrimaryContainer);