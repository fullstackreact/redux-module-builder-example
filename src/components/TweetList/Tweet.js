import React from 'react'
import moment from 'moment'

import styles from './tweet.module.css'
import classNames from 'classnames'

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
      <div className={classNames('event', styles.tweet)}>
        <div className="label">
          <img src={user && user.profile_image_url} />
        </div>
        <div className="content">
          <div className="summary">
            <a className="user">
              @{user && user.screen_name}
            </a>
            <div className="date">
              {formattedDate}
            </div>
          </div>
          <div className="extra text">
           {text}
          </div>
        </div>
      </div>
    )
  }
}

export default Tweet;
