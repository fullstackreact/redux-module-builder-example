import React from 'react'
import ReactDOM from 'react-dom'

import '../semantic/src/semantic.less'
import 'font-awesome/css/font-awesome.css'
import './app.css'

import App from 'containers/App/App'

import makeRoutes from './routes'

import {hashHistory} from 'react-router'
import {configureStore} from './redux/configureStore'

const initialState = {}
const {store, actions, history} =
  configureStore({initialState, historyType: hashHistory});

let render = (routerKey = null) => {
  const makeRoutes = require('./routes').default;
  const routes = makeRoutes(store)

  const mountNode = document.querySelector('#root');
  ReactDOM.render(
    <App history={history}
          store={store}
          actions={actions}
          routes={routes}
          routerKey={routerKey} />, mountNode);
}

if (__DEBUG__ && module.hot) {
  const renderApp = render;
  render = () => renderApp(Math.random())

  module.hot.accept('./routes', () => render());
}

render();
