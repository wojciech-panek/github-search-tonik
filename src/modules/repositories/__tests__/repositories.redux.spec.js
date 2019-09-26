import Immutable from 'seamless-immutable';

import { reducer as repositoriesReducer, RepositoriesTypes } from '../repositories.redux';

describe('Repositories: redux', () => {
  const defaultState = Immutable({
    data: [],
    cache: {},
    isLoading: false,
  });

  it('should return initial state', () => {
    expect(repositoriesReducer(undefined, {})).toEqual(defaultState);
  });

  it('should return state on unknown action', () => {
    expect(repositoriesReducer(defaultState, { type: 'unknown-action' })).toEqual(defaultState);
  });

  it('should clear data on SEARCH', () => {
    const language = 'en';
    const initialState = defaultState.set('data', [1, 2, 3]);
    const expectedState = defaultState.set('isLoading', true);
    const action = { language, type: RepositoriesTypes.SEARCH };
    expect(repositoriesReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set data on SEARCH_SUCCESS', () => {
    const data = [1, 2, 3];
    const expectedState = defaultState.set('data', data).set('isLoading', false);
    const action = { data, type: RepositoriesTypes.SEARCH_SUCCESS };
    expect(repositoriesReducer(defaultState, action)).toEqual(expectedState);
  });

  it('should set data on SEARCH_SUCCESS', () => {
    const data = [1, 2, 3];
    const expectedState = defaultState.set('data', data);
    const action = { data, type: RepositoriesTypes.SEARCH_SUCCESS };
    expect(repositoriesReducer(defaultState, action)).toEqual(expectedState);
  });

  it('should set isLoading to false on SEARCH_ERROR', () => {
    const initialState = defaultState.set('isLoading', true);
    const expectedState = defaultState.set('isLoading', false);
    const action = { type: RepositoriesTypes.SEARCH_ERROR };
    expect(repositoriesReducer(initialState, action)).toEqual(expectedState);
  });
});
