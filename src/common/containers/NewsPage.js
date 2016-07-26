import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import News from '../components/News';
import * as NewsActions from '../actions/news';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
News.need = [
  NewsActions.fetchNews
]

function mapStateToProps(state) {
  let { selectedNews, newsByTypes } = state;
  selectedNews = selectedNews.present;
  newsByTypes = newsByTypes.present;
  const {
    isFetching,
    lastUpdated,
    error,
    items: posts
  } = newsByTypes[selectedNews] || {
    isFetching: true,
    error:{},
    items: []
  };

  return {
    selectedNews,
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