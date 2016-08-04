import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import layout from './layout';
import version from './version';
import { selectedReddit, postsByReddit } from './reddit';
import { selectedNews, newsByTypes } from './news';

const rootReducer = combineReducers({
  user : user,
  version : version,
  layout : layout,
  selectedReddit : undoable(selectedReddit),
  postsByReddit : undoable(postsByReddit),
  selectedNews: selectedNews,
  newsByTypes: newsByTypes,
  router : routerStateReducer
});

export default rootReducer;