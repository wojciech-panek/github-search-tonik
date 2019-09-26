import { all, takeLatest } from 'redux-saga/effects';
import { RepositoriesTypes } from './repositories.redux';

export function* search() {}

export function* watchRepositories() {
  yield all([takeLatest(RepositoriesTypes.SEARCH, search)]);
}
