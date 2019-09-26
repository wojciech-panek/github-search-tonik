import { all, fork } from 'redux-saga/effects';

import { watchRepositories } from './repositories/repositories.sagas';

export default function* rootSaga() {
  try {
    yield all([fork(watchRepositories)]);
  } catch (e) {
    yield console.error(e);
  }
}
