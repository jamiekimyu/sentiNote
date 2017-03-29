import React, { Component } from 'react';
import ModalSignUp from '../components/ModalSignUp';
import { connect } from 'react-redux';

function mapDispatchToProps (dispatch) {
  return {
  
  };
};

function mapStateToProps (state) {
  return {

  };
}

const ModalSignUpContainer = connect(
  mapStateToProps, mapDispatchToProps
)(ModalSignUp);

export default ModalSignUpContainer