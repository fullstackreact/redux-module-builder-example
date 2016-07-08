import React from 'react'

import styles from './bar.module.css'

export class Image extends React.Component {
  render() {
    const {img} = this.props;
    return (
      <div className={styles.container}>
        <img src={img.media_url} />
      </div>
    )
  }
}

export default Image
