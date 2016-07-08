import React from 'react'

import styles from './sidebar.module.css'

export class Event extends React.Component {
  render() {
    const {event} = this.props;
    return (
      <div className={styles.container}>
        <h2>{event.name}</h2>
      </div>
    )
  }
}

export default Event
