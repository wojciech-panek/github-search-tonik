import { put, select, all, takeLatest } from 'redux-saga/effects';
import { stringify as stringifyQuery } from 'query-string';

import api from '../../services/api';
import { RepositoriesTypes, RepositoriesActions } from './repositories.redux';
import { selectRepositoriesCacheItem } from './repositories.selectors';

export function* search({ query }) {
  try {
    const queryString = stringifyQuery({
      q: query,
      sort: 'stars',
      order: 'desc',
    });

    const cachedResponse = yield select(selectRepositoriesCacheItem(queryString));

    if (cachedResponse) {
      yield put(RepositoriesActions.searchSuccess(cachedResponse.items));
    } else {
      const { data } = yield api.get(`/repositories?${queryString}`);
      yield put(RepositoriesActions.addToCache(queryString, data));
      yield put(RepositoriesActions.searchSuccess(data.items));
    }
  } catch (error) {
    yield put(RepositoriesActions.searchError(error));
    console.error(error);
  }
}

export function* watchRepositories() {
  yield all([takeLatest(RepositoriesTypes.SEARCH, search)]);
}
