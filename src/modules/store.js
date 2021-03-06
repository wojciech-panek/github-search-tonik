import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'seamless-immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [sagaMiddleware];

  const enhancers = [];
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    createReducer(),
    Immutable(initialState),
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
