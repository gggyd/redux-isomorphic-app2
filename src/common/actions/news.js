import request from 'axios';

export const SELECT_NEWS = 'SELECT_NEWS';
export const INVALIDATE_NEWS = 'INVALIDATE_NEWS';

export const NEWS_GET = 'NEWS_GET';
export const NEWS_GET_REQUEST = 'NEWS_GET_REQUEST';
export const NEWS_GET_SUCCESS = 'NEWS_GET_SUCCESS';
export const NEWS_GET_FAILURE = 'NEWS_GET_FAILURE';

export function selectNews(types) {
  return {
    type: SELECT_NEWS,
    types
  };
}

export function invalidateNews(types) {
  return {
    type: INVALIDATE_NEWS,
    types
  };
}

export function fetchNews(types = 'banner') {
  return {
    type: NEWS_GET,
    types,
    promise: request.get('http://local.domestore.cn:3500/api/v1/images')
  }
}

function shouldFetchNews(state, types) {
  const posts = state.newsByTypes[types];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchNewsIfNeeded(types) {
  return (dispatch, getState) => {
    if (shouldFetchNews(getState(), types)) {
      return dispatch(fetchNews(types));
    }
  };
}