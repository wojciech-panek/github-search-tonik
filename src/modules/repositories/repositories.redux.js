import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types: RepositoriesTypes, Creators: RepositoriesActions } = createActions(
  {
    search: ['query'],
    searchSuccess: ['data'],
    searchError: ['error'],
    addToCache: ['key', 'data'],
  },
  { prefix: 'REPOSITORIES/' }
);

export const INITIAL_STATE = new Immutable({
  data: [],
  cache: {},
  isLoading: false,
});

export const searchHandler = state =>
  state.merge({
    data: new Immutable([]),
    isLoading: true,
  });

export const searchSuccessHandler = (state, { data }) =>
  state.merge({
    data: new Immutable(data),
    isLoading: false,
  });

export const searchErrorHandler = state => state.set('isLoading', false);

export const addToCacheHandler = (state, { key, data }) => state.setIn(['cache', key], new Immutable(data));

export const reducer = createReducer(INITIAL_STATE, {
  [RepositoriesTypes.SEARCH]: searchHandler,
  [RepositoriesTypes.SEARCH_SUCCESS]: searchSuccessHandler,
  [RepositoriesTypes.SEARCH_ERROR]: searchErrorHandler,
  [RepositoriesTypes.ADD_TO_CACHE]: addToCacheHandler,
});
