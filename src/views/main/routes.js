import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Container from './Container'
import IndexPage from './indexPage/IndexPage'

export const makeMainRoutes = ({getState}) => {
  const requireAuth = (nextState, replace) => {
    const {users} = getState();
    const {currentUser} = users;

    if (!currentUser) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  const requireNoAuth = (nextState, replace) => {
    const {users} = getState();
    const {currentUser} = users;

    if (currentUser) {
      replace({
        pathname: '/',
        state: {}
      })
    }
  }
  return (
    <Route path="/" component={Container}>
      {/* Lazy-loading */}
      <Route path="login" onEnter={requireNoAuth} getComponent={(location, cb) => {
          require.ensure([], require => {
            const mod = require('./login/Login');
            cb(null, mod.default);
          })
        }} />
      {/* inline loading */}
      <IndexRoute component={IndexPage} onEnter={requireAuth} />
    </Route>
  )
}

export default makeMainRoutes
