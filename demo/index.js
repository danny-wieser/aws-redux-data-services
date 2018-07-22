import { configure } from '../src';
import { reducer, actions } from '../src/state/cognito'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as $ from 'jquery';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const config = require("json-loader!yaml-loader!./config.yml");

configure(config);

let store;

$( document ).ready(function() {
  initializeStore();
});


function initializeStore() {
  //const cognito =
  let state = { cognito: reducer }
  const allReducers = combineReducers(state);
  store = createStore(allReducers, applyMiddleware(thunk, logger));
  store.dispatch(actions.login({}));
}
