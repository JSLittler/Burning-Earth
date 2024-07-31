import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const middlewares = [thunk];
const store = configureStore({ reducer: rootReducer, applyMiddleware: applyMiddleware(middlewares) });

export { store };
