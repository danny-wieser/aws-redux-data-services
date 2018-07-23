import * as cognito from '../../src/state/cognito';
import { appendActionTemplate, fieldVals } from '../demo-utils';

export const { types, reducer, actions } = cognito;

export function handleSelection(type, container) {
  const typeValue = types[type];
  switch (typeValue) {
    case types.LOGIN:
      appendActionTemplate(['username', 'password'], container);
      break;
    default:
  }
}

const doLogin = store => store.dispatch(actions.login(fieldVals(['username', 'password'])));

export function handleDispatch(action, store) {
  const typeValue = types[action];
  switch (typeValue) {
    case types.LOGIN:
      doLogin(store);
      break;
    default:
  }
}
