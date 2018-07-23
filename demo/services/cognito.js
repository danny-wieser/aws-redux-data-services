import * as $ from 'jquery';
import cognito from '../../src/state/cognito';

export const { types, reducer } = cognito;

export function handleSelection(type, actionTemplate) {
  const typeValue = types[type];
  switch (typeValue) {
    case types.LOGIN:
      $('<input id="username" placeholder="enter username"/>').appendTo(actionTemplate);
      $('<input id="password" placeholder="enter password"/>').appendTo(actionTemplate);
      break;
    default:
  }
}

export function handleDispatch(action, store) {
  const typeValue = types[action];
  switch (typeValue) {
    case types.LOGIN:
      store.dispatch(cognito.actions.login());
      break;
    default:
  }
}
