import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import counter from './counter';
import layout from './layout';
import todos from './todos';
import version from './version';
import { selectedReddit, postsByReddit } from './reddit';
import { selectedNews, newsByTypes } from './news';
import { postsByImages } from './images';

const rootReducer = combineReducers({
  user : user,
  version : version,
  counter : undoable(counter),
  layout : undoable(layout),
  todos : undoable(todos),
  selectedReddit : undoable(selectedReddit),
  postsByReddit : undoable(postsByReddit),
  selectedNews: undoable(selectedNews),
  newsByTypes: undoable(newsByTypes),
  postsByImages: postsByImages,
  router : routerStateReducer
});

export default rootReducer;