import {createConstants, createReducer} from 'redux-module-builder'
import {createApiHandler, createApiAction} from 'redux-module-builder/api'

import hello from 'hellojs'
import '../../utils/array'

export const types = createConstants('images')(
  {'GET_IMAGES': { api: true }},
  'MEDIA_ARRIVED'
);

export const actions = {
  // Create an API action that fetches images contained in tweets
  getLatestImages: createApiAction(types.GET_IMAGES)((client, opts) => {
    const {event} = opts;
    return client.get({
      path: '/tweets/images'
    }).then(({tweets}) => {
      const {statuses} = tweets;
      const images = [].concat
        .apply([],
          statuses
            .map(t => t.entities.media)
            .filter(t => !!t));
      return images;
    })
  })
}

export const reducer = createReducer({
  ...createApiHandler(types.GET_IMAGES)((state, {payload}) => {
    return {...state, images: payload};
  })
});

export const initialState = {
  loading: false,
  errors: null,
  images: []
};
