import request from 'axios';

export const INVALIDATE_IMAGES = 'INVALIDATE_IMAGES';
export const IMAGES_GET = 'IMAGES_GET';
export const IMAGES_GET_REQUEST = 'IMAGES_GET_REQUEST';
export const IMAGES_GET_SUCCESS = 'IMAGES_GET_SUCCESS';
export const IMAGES_GET_FAILURE = 'IMAGES_GET_FAILURE';

export function invalidateImages() {
  return {
    type: INVALIDATE_IMAGES
  };
}

export function fetchPosts() {
  return {
    type: IMAGES_GET,
    promise: request(`http://local.domestore.cn:3500/api/v1/images`)
  }
}

function shouldFetchPosts(state) {
  const posts = state.postsByImages;
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  }
}
