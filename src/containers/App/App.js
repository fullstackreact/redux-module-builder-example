import React, { PropTypes as T } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import classnames from 'classnames';

class App extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    history: T.object.isRequired,
    routes: T.element.isRequired,
    routerKey: T.number,
    actions: T.object
  };

  get content() {
    const { history, routes, routerKey, store, actions } = this.props;
    let newProps = {
      actions,
      ...this.props
    }

    const createElement = (Component, props) => {
      return <Component {...newProps} {...props} />
    }

    return (
      <Router
        key={routerKey}
        routes={routes}
        createElement={createElement}
        history={history} />
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools/DevTools').default
        return <DevTools />
      }
    }
  }

  render () {
     return (
       <Provider store={this.props.store}>
         <div>
           {this.content}
           {this.devTools}
         </div>
        </Provider>
     )
   }
}

export default App;
