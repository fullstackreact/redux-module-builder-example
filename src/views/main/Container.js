import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header/Header'
import styles from './styles.module.css'

export class Container extends React.Component {
  componentDidMount() {
    const {actions} = this.props;

    actions.currentEvent.getCurrent();
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
    const {currentEvent} = this.props;
    const {event} = currentEvent;
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>{currentEvent.loading ? 'Loading' : event && event.name}</h1>
          <p>{event && event.hashtag}</p>
        </div>
        <div className={styles.content}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default connect(state => ({
  currentEvent: state.currentEvent
}))(Container)
