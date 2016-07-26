import {
  INVALIDATE_IMAGES,
  IMAGES_GET, IMAGES_GET_REQUEST, IMAGES_GET_SUCCESS, IMAGES_GET_FAILURE
} from '../actions/images';

function posts(state = {
  error: {},
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_IMAGES:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case IMAGES_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case IMAGES_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    case IMAGES_GET_FAILURE: 
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      });
    default:
      return state;
  }
}

export function postsByImages(state = { }, action) {
  switch(action.type) {
    case IMAGES_GET_REQUEST:
    case IMAGES_GET_SUCCESS:
      let postsArray = [];
      if (action.req && action.req.data) {
        let data = action.req.data;
        postsArray = data.map(item => item);
      }
      return Object.assign({}, state, 
        posts(state, {
          type: action.type,
          posts: postsArray,
          receivedAt: Date.now()
        })
      );
    case IMAGES_GET_FAILURE:
      return Object.assign({}, state, 
      posts(state, {
        type: action.type,
        posts: [],
        receivedAt: Date.now(),
        error: {
          status: action.error.status,
          statusText: action.error.statusText
        }
      }));
    default:
      return state;
  }
} 