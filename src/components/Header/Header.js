import React, { PropTypes as T } from 'react'
import {Link} from 'react-router'

import styles from './styles.module.css';

export class Header extends React.Component {
  render() {
    const {event} = this.props;

    return (
      <div className={styles.topbar}>
        {event && <Link className={styles.logo} to="/"><h1>{event.name}</h1></Link>}
        <section>
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
