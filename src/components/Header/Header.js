import React, { PropTypes as T } from 'react'
import {Link} from 'react-router'
import classnames from 'classnames'

import styles from './styles.module.css';

export class Header extends React.Component {
  render() {
    const {event} = this.props;

    return (
      <div className={classnames('ui container')}>
        {event && <Link className={classnames(styles.logo, 'item')} to="/">
          <h1>{event.name}</h1>
        </Link>}
        <a className={classnames('item')}>
          Fullstack.io
        </a>
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
