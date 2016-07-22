import React, { PropTypes as T } from 'react';
import {Link} from 'react-router';

import classNames from 'classnames'
import moment from 'moment'
import styles from './styles.module.css';

import Header from 'components/Header/Header'

import TweetList from 'components/TweetList/tweetList';
import ImageList from 'components/ImageList/imageList';

export class IndexPage extends React.Component {
  componentWillMount() {
    const {actions} = this.props;
    actions.events.getUpcomingEvents();
  }

  componentWillUnmount() {
    this.props.actions.currentEvent.wsDisconnect();
  }

  render() {
    const {actions, events, currentEvent} = this.props;
    const {event, tweets, images} = currentEvent;

    return (
      <div>
        <div className={classNames(styles.header, 'ui', 'menu')}>
          <Header event={event} />
        </div>

        <div className={classNames(styles.content, 'ui', 'main', 'text', 'container')}>
          <div className={classNames('ui', 'grid')}>

            <div className={classNames(styles.widget, styles.images, 'six', 'wide', 'column')}>
                <ImageList actions={actions} currentEvent={currentEvent} />
            </div>
        <div className={classNames(styles.widget, styles.tweetList, 'six', 'wide', 'column')}>
                <TweetList actions={actions} tweets={tweets} currentEvent={currentEvent} />
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default IndexPage;
