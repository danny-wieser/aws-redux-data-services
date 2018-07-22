export const Action = (type, data) => {
  return {type, ...data};
};

export function createReducer(initialState, handlerMap) {
  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlerMap[action.type] : undefined;
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
}
