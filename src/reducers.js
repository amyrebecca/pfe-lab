import users from './modules/users/reducer';
import organizations from './modules/organizations/reducer';

// redux's built-in combineReducers function scopes the state based on the reducer
// that modified it, which isn't a behavior i really like
export const myCombineReducers = (...reducers) => {
  let reducer;
  let reduction;
  let result = null;

  return function combined(state, action) {
    let matched = false;
    for (reducer of reducers) { // eslint-disable-line no-restricted-syntax
      reduction = reducer(state, action);
      if (reduction !== state) {
        if (matched) {
          /* eslint-disable no-throw-literal */
          throw `Multiple reducers matched the action ${action.type}, which is a BAD IDEA`;
          /* eslint-enable */
        }

        matched = true;
        result = Object.assign({}, state, reduction);
      }
    }

    return result || state;
  };
};

export default myCombineReducers(users, organizations);
