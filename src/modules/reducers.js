import { combineReducers } from 'redux';

import { reducer as repositoriesReducer } from './repositories/repositories.redux';

export default function createReducer() {
  return combineReducers({
    repositories: repositoriesReducer,
  });
}
