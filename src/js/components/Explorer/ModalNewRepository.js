import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from '../Modal';
import { addRepository } from '../../actions/repositoryActions';

class ModalNewRepository extends Component {
  constructor(props) {
    super(props);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  render() {
    const { visible } = this.props;
    
    return (
      <Modal header={"New Repository"} visible={visible} approveAction={this.handleApprove} cancelAction={this.handleCancel}>
        <div className="ui left icon fluid input">
          <input ref={input => this.input = input} type="text" name="repository-name" placeholder="Repository name" />
          <i className="folder icon"></i>
        </div>
      </Modal>
    )
  }
  handleApprove() {
    const name = this.input.value;
    this.props.addRepository({ name })
  }
  handleCancel() {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRepository }, dispatch);
}

export default connect(null, mapDispatchToProps)(ModalNewRepository)