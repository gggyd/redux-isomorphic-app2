import request from 'axios';

export const POSTS_GET = 'POSTS_GET';
export const POSTS_GET_REQUEST = 'POSTS_GET_REQUEST';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_FAILURE = 'POSTS_GET_FAILURE';

export function fetchPosts() {
  return {
    type: POSTS_GET,
    promise: request(`http://local.domestore.cn:3500/api/v1/images`)
  }
}

function shouldFetchPosts() {
  return true;
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts()) {
      return dispatch(fetchPosts());
    }
  }
}
