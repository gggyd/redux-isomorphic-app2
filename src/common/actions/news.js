import request from 'axios';

export const INVALIDATE_NEWS = 'INVALIDATE_NEWS';

export const NEWS_GET = 'NEWS_GET';
export const NEWS_GET_REQUEST = 'NEWS_GET_REQUEST';
export const NEWS_GET_SUCCESS = 'NEWS_GET_SUCCESS';
export const NEWS_GET_FAILURE = 'NEWS_GET_FAILURE';

export function invalidateNews(types) {
  return {
    type: INVALIDATE_NEWS,
    types
  };
}

export function fetchNews() {
  return {
    type: NEWS_GET,
    promise: request.get('http://local.domestore.cn:3500/api/v1/images')
  }
}

function shouldFetchNews(state) {
  const posts = state.newsByTypes[0];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchNewsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchNews(getState())) {
      return dispatch(fetchNews());
    }
  };
}