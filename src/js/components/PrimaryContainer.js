import React from 'react';
import PreviewImage from './PreviewImage';
import PreviewVideo from './PreviewVideo';
import RepositoryView from './RepositoryView'

export default class PrimaryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.onStateChangeloading = this.onStateChangeloading.bind(this);
  }
  render() {
    const classNameContainer = (this.state.loading ? 'loading ' : '') + 'ui center aligned segment';

    return (
      <div id="primaryContent" className={classNameContainer}>
        {this.selectTypeView()}
      </div>
    )
  }
  selectTypeView() {
    const { type } = this.props;

    if(type == 'file') {
      return this.showFile();
    } else if(type == 'repository') {
      return <RepositoryView {...this.props.data} onStateChangeloading={this.onStateChangeloading} />
    } else {
      return <div/>;
    }
  }
  showFile() {
    const { type } = this.props.data;

    if (type.includes('video')) {
      return <PreviewVideo {...this.props.data} />
    } else if (type.includes('image')) {
      return <PreviewImage {...this.props.data} />
    }
  }
  onStateChangeloading(isLoading) {
    this.setState({
      loading: isLoading
    })
  }
}