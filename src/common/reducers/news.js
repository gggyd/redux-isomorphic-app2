import {
  INVALIDATE_NEWS,
  NEWS_GET, NEWS_GET_REQUEST, NEWS_GET_SUCCESS, NEWS_GET_FAILURE
} from '../actions/news';

function news(state = {
  error: { },
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_NEWS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case NEWS_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case NEWS_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    case NEWS_GET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      });
    default: 
      return state;
  }
}

export function newsByTypes(state={}, action) {
  switch (action.type) {
    case INVALIDATE_NEWS:
    case NEWS_GET_REQUEST:
    case NEWS_GET_SUCCESS:
      let newsArray = [];
      if (action.req && action.req.data) {
        let data = action.req.data;
        newsArray = data;
      }

      return Object.assign({}, state, {
        0: news(state[0], {
          type: action.type,
          posts: newsArray,
          receivedAt: Date.now()
        })
      });
    case NEWS_GET_FAILURE:
      return Object.assign({}, state, {
        [0]: news(state[0], {
          type: action.type,
          posts: [],
          receivedAt: Date.now(),
          error: {
            status: action.error.status,
            statusText: action.error.statusText
          }
        })
      });
    default:
      return state;
  }
}