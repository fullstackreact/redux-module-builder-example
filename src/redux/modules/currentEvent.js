import {createConstants, createReducer} from 'redux-module-builder'
import {createApiHandler, createApiAction} from 'redux-module-builder/api'

import '../../utils/array'

import * as events from './events';
import * as images from './images'

export const types = createConstants('currentEvent')(
  'TWEET_ARRIVED',
  'MEDIA_ARRIVED'
);

let ws;
export const actions = {
  wsConnect: (event) => (dispatch, getState) => {
    const {users} = getState();
    const {currentUser} = users;
    ws = new WebSocket(__WS_URL__ + '/ts');
    ws.onmessage = function (event) {
      let data = event.data;
      try {
        data = JSON.parse(event.data);
        if (data.entites && data.entities.media && data.entities.media.length > 0) {
          dispatch({
            type: types.MEDIA_ARRIVED,
            payload: data.entities.media[0]
          })
        } else if (!data['msg']) {
          dispatch({
            type: types.TWEET_ARRIVED,
            payload: data
          })
        }
      } catch (e) {
        console.log('tweet error?', e);
      }
    };

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'searchTag', tag: event.hashtag,
        access_token: currentUser.oauth_token,
        access_token_secret: currentUser.oauth_token_secret
      }));
    }
  },

  wsDisconnect: () => (dispatch, getState) => ws.close()
}

export const reducer = createReducer({
    [types.TWEET_ARRIVED]: (state, {payload}) => {
    if (state.tweetIds.indexOf(payload.id) < 0) {
      const {tweets} = state
      tweets.shiftMax(payload, 10);
      const tweetIds = tweets.map(t => t.id);
      return {...state, tweets, tweetIds }
    } else {
      return state;
    }
  },

  [types.MEDIA_ARRIVED]: (state, {payload}) => {
    const {images} = state;
    images.shiftMax(payload, 10);
    return {
      ...state,
      images
    }
  },

  [events.types.GET_UPCOMING_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      event: payload && payload[0]
    }
  },

  [images.types.GET_IMAGES_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      images: payload
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
