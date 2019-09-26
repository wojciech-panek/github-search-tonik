import Immutable from 'seamless-immutable';

import { selectRepositoriesData } from '../repositories.selectors';

describe('Repositories: selectors', () => {
  const data = [1, 2, 3];

  const defaultState = Immutable({
    repositories: {
      data,
    },
  });

  describe('selectRepositoriesData', () => {
    it('should select data', () => {
      expect(selectRepositoriesData(defaultState)).toEqual(data);
    });
  });
});
