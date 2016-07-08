// root reducer
import { combineReducers } from 'redux';
import { routerReducer as routing, push } from 'react-router-redux';

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

Object.keys(modules).forEach(key => {
  const container = modules[key];
  initialState[key] = container.initialState || {};
  actions[key] = container.actions;
  reducers[key] = container.reducer;
});

export const rootReducer = combineReducers(reducers);
