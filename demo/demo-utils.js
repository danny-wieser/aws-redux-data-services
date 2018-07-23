/* eslint-disable import/no-extraneous-dependencies */
import * as $ from 'jquery';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import renderjson from 'renderjson';

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

function dispatchAction(services, store) {
  const selectedAction = $('#action-select').val();
  const service = selectedAction.substr(0, selectedAction.indexOf(SEPARATOR));
  const action = selectedAction.substr(selectedAction.indexOf(SEPARATOR) + SEPARATOR.length);
  services[service].handleDispatch(action, store);
}

function handleSelection(services) {
  const selectedAction = $('#action-select').val();
  const actionTemplate = $('#action-template');
  actionTemplate.empty();
  const service = selectedAction.substr(0, selectedAction.indexOf(SEPARATOR));
  const type = selectedAction.substr(selectedAction.indexOf(SEPARATOR) + SEPARATOR.length);
  services[service].handleSelection(type, actionTemplate);
}

export function eventHandlers(services, store) {
  $('#dispatch').on('click', () => dispatchAction(services, store));
  $('#action-select').on('change', () => handleSelection(services));
  handleSelection(services);
}

export function monitorState(container, store) {
  renderjson.set_show_to_level('all');
  store.subscribe(() => {
    $('.renderjson').remove();
    container.append(renderjson(store.getState()));
  });
  container.append(renderjson(store.getState()));
}

const textTmplt = field => `<input id="${field}" type="text" placeholder="${field}"/>`;

export function createActionTemplate(actionFields) {
  const reducer = (template, field) => `${template}<div class="auto cell">${textTmplt(field)}<div>`;
  return actionFields.reduce(reducer, '');
}

export function appendActionTemplate(actionsFields, container) {
  $(createActionTemplate(actionsFields)).appendTo(container);
}

export const fieldVal = fieldName => $(`#${fieldName}`).val();

export function fieldVals(fieldNames) {
  const reducer = (accumulator, currentValue) => {
    accumulator[currentValue] = fieldVal(currentValue);
    return accumulator;
  };
  return fieldNames.reduce(reducer, {});
}
