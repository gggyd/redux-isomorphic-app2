import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import News from '../components/News';
import * as NewsActions from '../actions/news';

News.need = [
  NewsActions.fetchNews
]

function mapStateToProps(state) {
  let {  newsByTypes } = state;
  const {
    isFetching,
    lastUpdated,
    error,
    items: posts
  } = newsByTypes[0] || {
    isFetching: true,
    error:{},
    items: []
  };

  return {
    posts,
    isFetching,
    lastUpdated,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NewsActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(News);