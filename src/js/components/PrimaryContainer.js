import React from 'react';
import PreviewImage from './PreviewImage';
import PreviewVideo from './PreviewVideo';
import RepositoryActions from './RepositoryActions'

export default class PrimaryContainer extends React.Component {
  render() {
    return (
      <div id="primaryContent" className="ui center aligned very padded piled segment">
        {this.selectTypeView()}
      </div>
    )
  }
  selectTypeView() {
    const { type } = this.props;

    if(type == 'file') {
      return this.showFile();
    } else if(type == 'repository') {
      return <RepositoryActions id={this.props.data.id}/>
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
}