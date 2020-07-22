import React from 'react';
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { counterReducer } from './counterReducer'
import { GetStateFromReducers, GetActionsFromReducer, Get2NestedValuesAsUnion } from './reduxHelperTypes';
import { UIApp } from './UIApp';
import { usersReducer } from './usersReducer';

// ------------------
// --- init redux ---
// ------------------
const reducers = {
  users: usersReducer,
  helpers: combineReducers({
    counter: counterReducer,
  }),
};

export type GlobalState = GetStateFromReducers<typeof reducers>
export type AllReduxActions = GetActionsFromReducer<
  Get2NestedValuesAsUnion<typeof reducers>
>

let store = createStore(combineReducers(reducers), applyMiddleware(thunk))

// init whole react app
export const App = () => (
  <Provider store={store}>
    <UIApp />
  </Provider>
);

