import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const selectRepositoriesDomain = prop('repositories');

export const selectRepositoriesData = createSelector(
  selectRepositoriesDomain,
  prop('data')
);
