import React, { PropTypes as T } from 'react'
import {Link} from 'react-router'
import classnames from 'classnames'

import styles from './styles.module.css';

export class Header extends React.Component {
  render() {
    const {event} = this.props;

    return (
      <div className={classnames(styles.topbar, 'ui sizer')}>
        {event && <Link className={classnames(styles.logo, 'column')} to="/">
          <h1 className={classnames('ui huge header')}>{event.name}</h1>
        </Link>}
        <section className={classnames('ui column')}>
          Fullstack.io
        </section>
      </div>
    )
  }
}

Header.propTypes = {
  event: T.object
}

Header.defaultProps = {
  object: {name: 'liveStream'}
}

export default Header
