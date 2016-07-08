import React from 'react'

import Event from './Event'
import styles from './sidebar.module.css'

export class Sidebar extends React.Component {
  render() {
    const {events} = this.props.events;
    return (
      <div className={styles.container}>
        {events && events.map(evt => {
          return <Event key={evt._id}
                event={evt} />
        })}
      </div>
    )
  }
}

export default Sidebar
