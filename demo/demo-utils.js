import * as $ from 'jquery';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const SEPARATOR = '::';

export function initializeStore(state) {
  const allReducers = combineReducers(state);
  return createStore(allReducers, applyMiddleware(thunk, logger));
}

function getAllActionsForServices(services) {
  const actionsList = [];
  const serviceKeys = Object.entries(services);
  serviceKeys.forEach(([serviceName, service]) => {
    const actionTypes = Object.keys(service.types);
    return actionTypes.forEach(actionType => actionsList.push(`${serviceName}${SEPARATOR}${actionType}`));
  });
  return actionsList;
}

export function createActionSelect(services, container) {
  const actionsList = getAllActionsForServices(services);
  const sel = $('<select id="action-select">').appendTo(container);
  actionsList.forEach(action => sel.append($('<option>').attr('value', action).text(action)));
}
