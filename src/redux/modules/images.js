import {createConstants, createReducer} from 'redux-module-builder'
import {createApiHandler, createApiAction} from 'redux-module-builder/src/api'

import hello from 'hellojs'
import '../../utils/array'

export const types = createConstants('images')(
  {'GET_IMAGES': { api: true }},
  'MEDIA_ARRIVED'
);

export const actions = {
  getLatestImages: createApiAction(types.GET_IMAGES)((client, opts) => {
    const {event} = opts;
    return client.get({
      path: '/tweets/images'
    }).then(({tweets}) => {
      const {statuses} = tweets;
      const images = [].concat.apply([], statuses.map(t => t.entities.media).filter(t => !!t));
      return {images, event};
    })
    // return new Promise((resolve, reject) => {
    //   hello('twitter')
    //   .api('search/tweets', {
    //       q: `${event.hashtag} filter:twimg`
    //     }).then(json => {
    //     console.log('json', json);
    //     const {statuses} = json;
    //     const images = [].concat.apply([], statuses.map(t => t.entities.media).filter(t => !!t));
    //     resolve({event, images})
    //   }, err => {
    //     console.log({q: `${event.hashtag} filter:twimg`});
    //     console.log('error', err);
    //     reject(err);
    //   });
    // });
  })
}

export const reducer = createReducer({
  ...createApiHandler(types.GET_IMAGES)((state, {payload}) => {
    const {event, images} = payload;
    return {...state, images};
  })
});

export const initialState = {
  loading: false,
  errors: null,
  images: []
};
