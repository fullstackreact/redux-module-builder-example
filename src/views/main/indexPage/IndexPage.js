import React, { PropTypes as T } from 'react';
import {Link} from 'react-router';

import classNames from 'classnames'
import moment from 'moment'
import styles from './styles.module.css';

import Header from 'components/Header/Header'
import Bar from 'components/Bar/Bar'
import Sidebar from 'components/Sidebar/Sidebar'

import TweetList from 'components/TweetList/tweetList';
import ImageList from 'components/ImageList/imageList';

export class IndexPage extends React.Component {
  componentWillMount() {
    const {actions} = this.props;
    actions.events.getUpcomingEvents();
  }

  componentDidMount() {
    const {actions, currentEvent} = this.props;
console.log('currentEvent ->', currentEvent);
    // actions.currentEvent.wsConnect('puppies');
  }

  componentWillUnmount() {
    this.props.actions.currentEvent.wsDisconnect();
  }

  render() {
    const {actions, events, currentEvent} = this.props;
    const {event, tweets, images} = currentEvent;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header event={event} />
        </div>
      <div className={styles.content}>
        <div className={classNames(styles.widget, styles.images)}>
          <ImageList actions={actions} currentEvent={currentEvent} />
        </div>
        <div className={classNames(styles.widget, styles.tweetList)}>
          <TweetList actions={actions} tweets={tweets} currentEvent={currentEvent} />
        </div>
      </div>
    </div>
    )
  }
}

export default IndexPage;
