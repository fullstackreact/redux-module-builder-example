import React from 'react'

import Image from './Image'
import styles from './image.module.css'

export class ImageList extends React.Component {
  render() {
    const {images} = this.props;
    return (
      <div className={styles.container}>
        {images.map(img => img && <Image
          key={img.id}
          image={img} />)}
      </div>
    )
  }
}

export default ImageList
