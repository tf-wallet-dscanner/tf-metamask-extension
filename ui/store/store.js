import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';
import rootReducer from '../ducks';

const logger = createLogger();

export default function configureStore(initialState) {
  let storeEnhancers = applyMiddleware(logger, thunkMiddleware);

  if (process.env.METAMASK_DEBUG && !process.env.IN_TEST) {
    const composeEnhancers = composeWithDevTools({
      name: 'MetaMask',
      hostname: 'localhost',
      port: 8000,
      realtime: Boolean(process.env.METAMASK_DEBUG),
    });
    storeEnhancers = composeEnhancers(storeEnhancers);
  }

  return createStore(rootReducer, initialState, storeEnhancers);
}
