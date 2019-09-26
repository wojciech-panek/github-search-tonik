import { put, all, takeLatest } from 'redux-saga/effects';
import { stringify as stringifyQuery } from 'query-string';

import api from '../../services/api';
import { RepositoriesTypes, RepositoriesActions } from './repositories.redux';

export function* search({ query }) {
  try {
    const queryString = stringifyQuery({
      q: query,
      sort: 'stars',
      order: 'desc',
    });
    const { data } = yield api.get(`/repositories?${queryString}`);
    yield put(RepositoriesActions.searchSuccess(data.items));
  } catch (error) {
    yield put(RepositoriesActions.searchError(error));
    console.error(error);
  }
}

export function* watchRepositories() {
  yield all([takeLatest(RepositoriesTypes.SEARCH, search)]);
}
