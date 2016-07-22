import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Images from '../components/Images';
import * as ImagesActions from '../actions/images';

Images.need = [
  ImagesActions.fetchPosts
]

function mapStateToProps(state) {
  let { postsByImages } = state;
  postsByImages = postsByImages.present;

  const {
    isFetching,
    lastUpdated,
    error,
    items: posts
  } = postsByImages || {
    isFetching: true,
    error: { },
    items: [ ]
  };

  return {
    posts,
    isFetching,
    lastUpdated,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ImagesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);