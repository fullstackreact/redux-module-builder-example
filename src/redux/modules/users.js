import {createConstants, createReducer} from 'redux-module-builder'
import {createApiHandler, createApiAction} from 'redux-module-builder/api'

import hello from 'hellojs'

hello.init({
  twitter: __TWITTER_KEY__
}, {
  oauth_proxy: `${__API_URL__}/oauthproxy`
});

/*
 * Constants
 *
 * Basic constants can just be a name
 *  i.e. 'GET_ME'
 * and api constants can be an Object
 *  i.e. { 'GET_UPCOMING': { api: true }}
 */
export const types = createConstants('users')(
  'LOGIN',
  'LOGGED_IN',
  'ERROR_LOGGING_IN'
);

/*
 * actions
 *
 * The actions object can be a simple function
 *  i.e. getMe: () => (dispatch, getState) => {
 *  	dispatch({type: types.GET_ME})
 *  }
 *  or using the `createApiAction()` function, we can create an
 *  action that calls out to the api helpers of redux-module-builder
 *  For instance:
 *  getUpcomingEvents: createApiAction(types.GET_UPCOMING)((client, opts) => {
 *    const {count} = opts;
 *    return client.get({
 *    	path: '/events/upcoming',
 *    	params: {count}
 *    }).then(res => res.events)
 *  })
 */
export const actions = {
  loginWithTwitter: () => (dispatch, getState) => {
    hello('twitter').login()
      .then(res => {
        dispatch({type: types.LOGGED_IN, payload: res});
      }, err => {
        dispatch({type: types.ERROR_LOGGING_IN, payload: res});
      })
  }
}

/*
 * reducers
 *
 * The reducers go here where we can either create a simple reducer
 * using our types object from above
 * i.e. [types.GET_ME]: (state, action) => ({
 * 		...state,
 * 		me: action.payload
 * })
 * or it can be a a complex object, such as using the `createApiHandler`
 * method provided by `redux-module-builder`
 *
 * ...createApiHandler(types.GET_UPCOMING, (apiTypes) => {
 *  	// optional argument to handle apiTypes (i.e. loading and error)
 *    return {
 *    	[apiTypes.LOADING]: (state) => ({...state, loading: true}),
 *    	[apiTypes.ERROR]: (state, {payload}) => {
 *    		return {...state, loading: false, errors: payload};
 *    	}
 *    })((state, {payload}) => {
 *     	return {
 *     		...state,
 *     		loading: false,
 *     		errors: null,
 *     		events: payload
 *     	}
 *    })
 *
 */
export const reducer = createReducer({
  [types.LOGGED_IN]: (state, {payload}) => {
    return {
      ...state,
      currentUser: payload.authResponse
    }
  }
});

const twitterAuth = hello('twitter').getAuthResponse();

const currentUser = !!twitterAuth && !twitterAuth.error && twitterAuth
/*
 * The initial state for this part of the component tree
 */
export const initialState = {
  loading: false,
  errors: null,
  currentUser: currentUser
};
