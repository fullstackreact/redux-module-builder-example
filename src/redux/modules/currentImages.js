import {createConstants, createReducer} from 'redux-module-builder'
import {createApiHandler, createApiAction} from 'redux-module-builder/src/api'

import '../../utils/array'

export const types = createConstants('media')(
  'GET_MEDIA',
  'MEDIA_ARRIVED'
);

export const actions = {
  getLatestImages: createApiAction(types.GET_MEDIA)((client, opts) => {
    return client.get({
      path: '/tweets/images'
    }).then(({tweets}) => {
      const {statuses} = tweets;

      return statuses.map(t => t.entities.media)
            .reduce((sum, m) => sum.concat(m), []);
    })
  })
}

export const reducer = createReducer({
  ...createApiHandler(types.GET_MEDIA)((state, {payload}) => {
    return {
      ...state,
      loading: false,
      images: payload
    }
  })
});

export const initialState = {
  loading: false,
  errors: null,
  images: []
};
