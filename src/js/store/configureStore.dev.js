import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../components/DevTools';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}