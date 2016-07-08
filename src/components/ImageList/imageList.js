import React from 'react'

import Image from './Image'
import styles from './image.module.css'

export class ImageList extends React.Component {
  componentDidMount() {
    this.getLatestImages();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentEvent.event !== this.props.currentEvent.event) {
      this.getLatestImages(newProps);
    }
  }

  getLatestImages(newProps=this.props) {
    const {actions, currentEvent} = newProps;

    if (currentEvent && currentEvent.event) {
      actions.images.getLatestImages({event: currentEvent.event})
    }
  }

  render() {
    const {currentEvent} = this.props;
    const {images} = currentEvent;

    return (
      <div className={styles.container}>
        {images && images.map((img, idx) => img && <Image
          key={idx}
          image={img} />)}
      </div>
    )
  }
}

export default ImageList
