import React, { PropTypes as T } from 'react';
import {Link} from 'react-router';

import moment from 'moment'
import styles from './styles.module.css';

import TweetList from 'components/TweetList/tweetList';
import ImageList from 'components/ImageList/imageList';

export class IndexPage extends React.Component {
  componentWillReceiveProps(newProps) {
    if (newProps.currentEvent.event !== this.props.currentEvent.event) {
      const {actions, currentEvent} = newProps;
      const {event} = currentEvent;
      actions.currentEvent.wsConnect(currentEvent.event.hashtag);
      actions.currentEvent.getLatestImages();
    }
  }

  componentWillUnmount() {
    this.props.actions.currentEvent.wsDisconnect();
  }
  render() {
    const {currentEvent} = this.props;
    const {event, tweets, images} = currentEvent;

    return (
      <div className={styles.content}>
        <div className={styles.widget}>
          <ImageList images={images} />
        </div>
        <div className={styles.widget}>
          <TweetList tweets={tweets} />
        </div>
      </div>
    )
  }
}

export default IndexPage;
