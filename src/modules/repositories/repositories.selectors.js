import { prop, pathOr } from 'ramda';
import { createSelector } from 'reselect';

export const selectRepositoriesDomain = prop('repositories');

export const selectRepositoriesData = createSelector(
  selectRepositoriesDomain,
  prop('data')
);

export const selectRepositoriesCacheItem = key =>
  createSelector(
    selectRepositoriesDomain,
    pathOr(null, ['cache', key])
  );
