import React from 'react'
import moment from 'moment'

import styles from './tweet.module.css'
import Tweet from './Tweet'

export class TweetList extends React.Component {
  componentDidMount() {
    this.connectToTweetStream();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentEvent.event !== this.props.currentEvent.event) {
      this.connectToTweetStream(newProps);
    }
  }

  connectToTweetStream(newProps=this.props) {
    const {actions, currentEvent} = newProps;

    if (currentEvent && currentEvent.event) {
      actions.currentEvent.wsConnect(currentEvent.event)
      // actions.images.getLatestImages({event: currentEvent.event})
    }
  }

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
