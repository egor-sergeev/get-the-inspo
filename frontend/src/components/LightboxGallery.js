import React, { useState, useCallback } from 'react';
import Gallery from './Gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';


function LightboxGallery({images}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { image, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);

    // console.log('Image OPENED. ID = ', image.id);

    // TODO send action data to the server
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  // const changeLightbox = () => {
  //   console.log('Image CHANGED. ID = ');
  //
  //   // TODO send action data to the server
  // };
  //
  // const clickItemLightbox = () => {
  //   console.log('Image onClickItem. ID = ', currentImage);
  //
  //   // TODO send action data to the server
  // };
  //
  // const clickThumbLightbox = () => {
  //   console.log('Image onClickThumb. ID = ', currentImage);
  //
  //   // TODO send action data to the server
  // };

  return (
    <div>
      <Gallery images={images} onClick={openLightbox}/>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              // onChange={console.log('onChange')}
              // onClickItem={console.log('onClickItem')}
              // onClickThumb={console.log('onClickThumb')}
              views={images.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default LightboxGallery;

