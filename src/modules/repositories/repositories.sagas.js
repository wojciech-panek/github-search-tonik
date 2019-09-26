import { put, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import { RepositoriesTypes, RepositoriesActions } from './repositories.redux';

export function* search() {
  try {
    const { data } = yield api.get('/repositories?q=tetris&sort=stars&order=desc');
    yield put(RepositoriesActions.searchSuccess(data.items));
  } catch (error) {
    yield put(RepositoriesActions.searchError(error));
    console.error(error);
  }
}

export function* watchRepositories() {
  yield all([takeLatest(RepositoriesTypes.SEARCH, search)]);
}
