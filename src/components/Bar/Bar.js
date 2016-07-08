import React from 'react'
import {connect} from 'react-redux'

import styles from './bar.module.css'

import Image from './Image'

export class Bar extends React.Component {
  componentDidMount() {
    const {actions, event} = this.props;
    actions.events.getLatestImages({event});
  }

  render() {
    const {event} = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{event.name}</h2>
        </div>
        <div className={styles.content}>
          {event.images && event.images.map((i, idx) => {
            return <div key={idx} className={styles.entity}>
              <Image img={i} />
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default Bar
