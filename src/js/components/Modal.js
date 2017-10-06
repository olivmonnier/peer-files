import React, { Component } from 'react';
import $ from 'jquery';

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showing: false
    }
  }
  componentDidMount() {
    this.setShowingState(this.props.visible);
  }
  /*componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.visible, prevState.showing, this.props.visible, this.state.showing)
    if (prevProps.visible !== this.props.visible) {
      this.setShowingState(this.props.visible);
    }
  }*/
  componentWillReceiveProps(nextProps) {
    this.setState({ showing: false })
  }
  shouldComponentUpdate() {
    console.log('pop');
    return true;
  }
  render() {
    const { header, children, approveAction, cancelAction } = this.props;

    return (
      <div className="ui basic modal" ref={(el) => this.el = el }>
        {header && 
          <div className="ui header">
            {header} 
          </div>
        }
        <div className="content">
          {children}
        </div>
        { (approveAction || cancelAction ) ? (
          <div className="actions">
            {
              cancelAction &&
              <div className="ui red basic cancel inverted button" onClick={cancelAction}>
                <i className="remove icon"></i> Cancel
              </div>
            }
            { approveAction && 
              <div className="ui green ok inverted button" onClick={approveAction}>
                <i className="checkmark icon"></i> Save
              </div>
            }
          </div>
        ) : ""}
      </div>
    )
  }
  setShowingState(visible) {
    $(this.el).modal({
      blurring: true,
      onHidden: () => this.setState({ showing: false })
    }).modal(visible ? 'show' : 'hide');
  }
}