import {createConstants, createReducer} from 'redux-module-builder'
import {createApiHandler, createApiAction} from 'redux-module-builder/src/api'

import '../../utils/array'

export const types = createConstants('event')(
  'GET_CURRENT',
  'GET_MEDIA',
  'TWEET_ARRIVED',
  'MEDIA_ARRIVED'
);

let ws;
export const actions = {
  getCurrent: createApiAction(types.GET_CURRENT)((client, opts, getState, dispatch) => {
    return client.get({
      path: '/events/upcoming'
    })
    .then(resp => {
      const {events} = resp;
      return events.length > 0 ? events[0] : null;
    })
  }),

  getLatestImages: createApiAction(types.GET_MEDIA)((client, opts) => {
    return client.get({
      path: '/tweets/images'
    }).then(({tweets}) => {
      const {statuses} = tweets;

      return statuses.map(t => t.entities.media)
            .reduce((sum, m) => sum.concat(m), []);
    })
  }),

  wsConnect: (tag) => (dispatch, getState) => {
    ws = new WebSocket('ws://' + __API_HOST__ + '/ts');
    ws.onmessage = function (event) {
      let data = event.data;
      try {
        data = JSON.parse(event.data);
        dispatch({type: types.TWEET_ARRIVED, payload: data, meta: { debounce: 'simple' }})
      } catch (e) {
      }
    };

    ws.onopen = () => ws.send(JSON.stringify({type: 'searchTag', tag}));
  },

  wsDisconnect: () => (dispatch, getState) => ws.close()
}

export const reducer = createReducer({
  ...createApiHandler(types.GET_CURRENT)((state, {payload}) => {
    return {
      ...state,
      loading: false,
      errors: null,
      event: payload
    }
  }),

  ...createApiHandler(types.GET_MEDIA)((state, {payload}) => {
    return {
      ...state,
      loading: false,
      images: payload
    }
  }),

  [types.TWEET_ARRIVED]: (state, {payload}) => {
    if (state.tweetIds.indexOf(payload.id) < 0) {
      const {tweets} = state
      tweets.shiftMax(payload, 3);
      const tweetIds = tweets.map(t => t.id);
      return {...state, tweets, tweetIds }
    } else {
      return state;
    }
  }
});

export const initialState = {
  event: null,
  loading: false,
  errors: null,
  images: [],
  tweets: [],
  tweetIds: []  // simple array of ids
};
