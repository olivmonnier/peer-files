import React, { Component } from 'react';
import $ from 'jquery';
import Explorer from './Explorer';
import PrimaryContainer from './PrimaryContainer';

class MainContainer extends Component {
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
            <Explorer />
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