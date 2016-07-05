import React from 'react'
import moment from 'moment'

import styles from './tweet.module.css'
import Tweet from './Tweet'

export class TweetList extends React.Component {
  render() {
    const {tweets} = this.props;

    return (
      <div className={styles.tweets}>
      {tweets.map(t => <Tweet
            key={t.id}
            tweet={t} />)}
      </div>
    )
  }
}

export default TweetList;
