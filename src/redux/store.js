import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [thunk];
const store = configureStore({ reducer: persistedReducer, applyMiddleware: applyMiddleware(middlewares) });

export { store };
