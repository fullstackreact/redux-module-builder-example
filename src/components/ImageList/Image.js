import React from 'react'
import moment from 'moment'

import styles from './image.module.css'

export class Image extends React.Component {
  render() {
    const {image} = this.props;

    const {
      media_url,
      url
    } = image;

    return (
      <div className={styles.image}>
        <img src={media_url} />
      </div>
    )
  }
}

export default Image;
