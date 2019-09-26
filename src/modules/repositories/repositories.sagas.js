import { put, select, all, takeLatest, fork } from 'redux-saga/effects';
import { parse, stringify } from 'query-string';

import api from '../../services/api';
import { RepositoriesTypes, RepositoriesActions } from './repositories.redux';
import { selectRepositoriesCacheItem } from './repositories.selectors';
import history from '../../services/history';

export function* watchQueryInSearch() {
  const search = parse(history.location.search);

  if (search.query) {
    yield put(RepositoriesActions.search(search.query));
  }
}

export function* search({ query }) {
  try {
    const queryString = stringify({
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
  yield all([fork(watchQueryInSearch), takeLatest(RepositoriesTypes.SEARCH, search)]);
}
