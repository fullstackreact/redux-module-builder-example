import { combineReducers } from 'redux';
import { routerReducer as routing, push } from 'react-router-redux';

const containers = {
  currentEvent: require('./modules/currentEvent')
}
export let actions = {
  routing: {
    navigateTo: path => dispatch => dispatch(push(path))
  }
}

export let initialState = {}
export let reducers = {routing};

Object.keys(containers).forEach(key => {
  const container = containers[key];
  initialState[key] = container.initialState || {};
  actions[key] = container.actions;
  reducers[key] = container.reducer;
});

export const rootReducer = combineReducers(reducers);
