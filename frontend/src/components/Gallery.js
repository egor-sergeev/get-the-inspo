import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import Image, { imagePropType } from './Image';
import { computeRowLayout } from '../layouts/justified';

const Gallery = React.memo(function Gallery({
                                                images,
                                                onClick,
                                                margin,
                                                limitNodeSearch,
                                                targetRowHeight,
                                            }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const galleryEl = useRef(null);

  useLayoutEffect(() => {
    let animationFrameID = null;
    const observer = new ResizeObserver(entries => {
      // only do something if width changes
      const newWidth = entries[0].contentRect.width;
      if (containerWidth !== newWidth) {
        // put in an animation frame to stop 'benign errors' from
        // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        animationFrameID = window.requestAnimationFrame(() => {
          setContainerWidth(Math.floor(newWidth));
        });
      }
    });
    observer.observe(galleryEl.current);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameID);
    };
  });

  const handleClick = (event, { index }) => {
    onClick(event, {
      index,
      image: images[index],
      previous: images[index - 1] || null,
      next: images[index + 1] || null,
    });
  };

  // no containerWidth until after first render with refs, skip calculations and render nothing
  if (!containerWidth) return <div ref={galleryEl}>&nbsp;</div>;
  // subtract 1 pixel because the browser may round up a pixel
  const width = containerWidth - 1;
  let galleryStyle, thumbs;

  galleryStyle = { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' };
  thumbs = computeRowLayout({ containerWidth: width, limitNodeSearch, targetRowHeight, margin, images });


  return (
    <div className='react-image-gallery--gallery'>
      <div ref={galleryEl} style={galleryStyle}>
        {thumbs.map((thumb, index) => {
          const { containerHeight, ...image } = thumb;
          return Image({
            id: image.id,
            key: thumb.key || thumb.src,
            alt: image.title,
            index: index,
            margin: margin,
            onClick: onClick ? handleClick : null,
            image: image,
          });
        })}
      </div>
    </div>
  );
});

Gallery.propTypes = {
  images: PropTypes.arrayOf(imagePropType).isRequired,
  onClick: PropTypes.func,
  targetRowHeight: PropTypes.number,
  limitNodeSearch: PropTypes.number,
  margin: PropTypes.number,
};

Gallery.defaultProps = {
  margin: 2,
  targetRowHeight: 600,
};

export { Image };
export default Gallery;