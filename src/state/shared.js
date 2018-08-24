
export function createReducer(initialState, handlerMap) {
  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlerMap[action.type] : undefined;
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
}

export const OK = 'ok';
export const FAIL = 'fail';
export const Payload = data => ({ payload: { ...data } });
export const Action = (type, data) => ({ type, ...data });
export const ok = type => `${type}.${OK}`;
export const fail = type => `${type}.${FAIL}`;
export const ActionLoading = (type, payload) => Action(type, Payload(payload));
export const ActionOK = (type, payload) => Action(ok(type), Payload(payload));
export const ActionFail = (type, error) => Action(fail(type), Payload(error));
export const loading = state => ({ ...state, isLoading: true });
export const reducerOK = (state, data) => ({ ...state, ...data.payload, isLoading: false });
export const error = (state, data) => {
  const { code } = data.payload;
  return {
    ...state,
    hasError: true,
    errorCode: code,
    isLoading: false,
  };
};
