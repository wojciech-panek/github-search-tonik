import { expectSaga } from 'redux-saga-test-plan';
import Immutable from 'seamless-immutable';

import { watchRepositories } from '../repositories.sagas';
import { RepositoriesActions } from '../repositories.redux';
import mockApi from '../../../services/mockApi';

describe('Repositories: sagas', () => {
  const defaultState = Immutable({});

  it('should dispatch searchSuccess', async () => {
    const items = [1, 2, 3];
    const response = { items };

    mockApi.get('/repositories?q=some-query&sort=stars&order=desc').reply(200, response);

    await expectSaga(watchRepositories)
      .withState(defaultState)
      .put(RepositoriesActions.searchSuccess(items))
      .dispatch(RepositoriesActions.search('some-query'))
      .silentRun();
  });
});
