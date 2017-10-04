import React from 'react';
import $ from 'jquery';
import ExplorerList from './Explorer/ExplorerList';
import PrimaryContainer from './PrimaryContainer/PrimaryContainer';

class MainContainer extends React.Component {
  componentDidMount() {
    $('#menuTabPrimary .item').tab()
  }
  render() {
    return (
      <div>
        <div id="menuTabPrimary" className="ui menu">
          <a className="active item" data-tab="explorer">Explorer</a>
        </div>
        <div className="ui grid padded active tab" data-tab="explorer">
          <div className="six wide column">
            <ExplorerList />
          </div>
          <div className="ten wide column">
            <PrimaryContainer />
          </div>
        </div>
      </div>    
    )
  }
}

export default MainContainer;