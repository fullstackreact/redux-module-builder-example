// root reducer
import { combineReducers } from 'redux';
import { routerReducer as routing, push } from 'react-router-redux';
import { createRootReducer } from 'redux-module-builder'

const modules = {
  events: require('./modules/events'),
  currentEvent: require('./modules/currentEvent'),
  images: require('./modules/images'),
  users: require('./modules/users')
}
export let actions = {
  routing: {
    navigateTo: path => dispatch => dispatch(push(path))
  }
}
export let initialState = {}
export let reducers = {routing};

/*
 * createRootReducer helper
 */
const mod = createRootReducer(modules, {
  initialInitialState: initialState,
  initialActions: actions,
  initialReducers: {routing}
})

/*
 * Alternatively, do this manually
 */
Object.keys(modules).forEach(key => {
  const container = modules[key];
  initialState[key] = container.initialState || {};
  actions[key] = container.actions;
  reducers[key] = container.reducer;
});

export const rootReducer = combineReducers(reducers);
