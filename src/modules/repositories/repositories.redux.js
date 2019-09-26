import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types: RepositoriesTypes, Creators: RepositoriesActions } = createActions(
  {
    search: ['query'],
    searchSuccess: ['data'],
    searchError: ['error'],
  },
  { prefix: 'REPOSITORIES/' }
);

export const INITIAL_STATE = new Immutable({
  data: [],
});

export const searchHandler = state => state.set('data', new Immutable([]));

export const searchSuccessHandler = (state, { data }) => state.set('data', new Immutable(data));

export const reducer = createReducer(INITIAL_STATE, {
  [RepositoriesTypes.SEARCH]: searchHandler,
  [RepositoriesTypes.SEARCH_SUCCESS]: searchSuccessHandler,
});
