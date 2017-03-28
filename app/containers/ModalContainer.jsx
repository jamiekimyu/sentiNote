import React, { Component } from 'react';
import ModalLogin from '../components/ModalLogin';
import { connect } from 'react-redux';

function mapDispatchToProps (dispatch) {
  return {
  
  };
};

function mapStateToProps (state) {
  return {

  };
}

const ModalContainer = connect(
  mapStateToProps, mapDispatchToProps
)(ModalLogin);

export default ModalContainer