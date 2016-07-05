import React from 'react'
import moment from 'moment'

import styles from './tweet.module.css'

export class Tweet extends React.Component {
  render() {
    const {tweet} = this.props;

    const {
      created_at,
      user,
      text
    } = tweet;

    const formattedDate =
      moment(new Date(created_at))
      .fromNow();

    return (
      <div className={styles.tweet}>

        <div className={styles.info}>
          <div className={styles.user}>
            <img src={user.profile_image_url} />
            @{user.screen_name}
          </div>
          <div className={styles.date}>
            {formattedDate}
          </div>
        </div>

        <div className={styles.content}>

          <div className={styles.text}>
            {text}
          </div>
        </div>

      </div>
    )
  }
}

export default Tweet;
