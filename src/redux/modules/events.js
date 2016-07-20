import {createConstants, createReducer} from 'redux-module-builder'
import {createApiHandler, createApiAction} from 'redux-module-builder/api'

import hello from 'hellojs'
import '../../utils/array'

export const types = createConstants('events')(
  {'GET_UPCOMING': { api: true }},
  {'GET_IMAGES': { api: true }}
);

export const actions = {
  getUpcomingEvents: createApiAction(types.GET_UPCOMING)((client, opts) => {
    const {count} = opts;
    return client.get({
      path: '/events/upcoming',
      params: {count},
    }).then(res => res.events)
  }),
}

const eventsMap = (eventList) => eventList.reduce((sum, e) => ({
  ...sum,
  [e._id]: e
}), {})

export const reducer = createReducer({
  ...createApiHandler(types.GET_UPCOMING, (apiTypes) => ({
      [apiTypes.LOADING]: (state) => ({...state, loading: true}),
      [apiTypes.ERROR]: (state, {payload}) => ({...state, loading: false, errors: payload}),
  }))((state, {payload}) => {
    return {
      ...state,
      loading: false,
      errors: null,
      events: eventsMap(payload)
    }
  }),

});

export const initialState = {
  loading: false,
  errors: null,
  events: {}
};
