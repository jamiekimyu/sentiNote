import React from 'react';
import store from '../store'
import {hashHistory, Link} from 'react-router'
import { Button, ButtonToolbar, Modal, Component } from 'react-bootstrap';
import SignUp from '../components/SignUp';


export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {show:true}
    this.hideModal = this.hideModal.bind(this)
  }

  hideModal() {
    this.setState({show: false});
    history.back()
  }

  render () {
    return ( 
      <div>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          bsSize="large" 
          aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className='center' id="contained-modal-title-lg"><p className='text-primary'>Sign Up For a New Account</p></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignUp/>
          </Modal.Body>
          <Modal.Footer>
            <Button className='button btn btn-danger' id='closeModal' onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}