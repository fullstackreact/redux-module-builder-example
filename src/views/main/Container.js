import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import styles from './styles.module.css'

export class Container extends React.Component {

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser !== this.props.currentUser) {
      const {actions} = this.props;
      actions.routing.navigateTo('/');
    }
  }

  renderChildren() {
    const childProps = {
      ...this.props
    };
    const {children} = this.props;
    return React.Children.map(children,
              c => React.cloneElement(c, childProps));
  }

  render() {
    return (
      <div className={classnames(styles.wrapper)}>
        {this.renderChildren()}
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default connect(state => ({
  events: state.events,
  currentEvent: state.currentEvent,
  currentUser: state.users.currentUser
}))(Container)
