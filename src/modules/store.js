import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'seamless-immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [sagaMiddleware];

  const store = createStore(createReducer(), Immutable(initialState), compose(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  return store;
}
