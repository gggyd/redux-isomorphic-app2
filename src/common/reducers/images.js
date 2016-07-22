import {
  POSTS_GET, POSTS_GET_REQUEST, POSTS_GET_SUCCESS, POSTS_GET_FAILURE
} from '../actions/images';

function posts(state = {
  error: {},
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case POSTS_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case POSTS_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    case POSTS_GET_FAILURE: 
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

export function postsByImages(state = { }, action) {
  switch(action.type) {
    case POSTS_GET_REQUEST:
    case POSTS_GET_SUCCESS:
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
    case POSTS_GET_FAILURE:
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