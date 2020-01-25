import React from 'react';
import PropTypes from 'prop-types';


const Image = ({ index, onClick, onMouseOver, onMouseOut, image, margin, key, alt, id }) => {
  const imgStyle = { margin: margin, display: 'block' };
  const imgPointerStyle = { cursor: 'pointer' };

  const handleClick = event => {
    console.log('Image CLICK. ID = ', id);

    // TODO send action data to the server

    if (onClick)
        onClick(event, { image, index });
  };

  const handleMouseOver = event => {
    console.log('Image OVER. ID = ', id);

    // TODO send action data to the server

    if (onMouseOver)
        onMouseOver(event, { image, index });
  };

  const handleMouseOut = event => {
    console.log('Image OUT. ID = ', id);

    // TODO send action data to the server

    if (onMouseOut)
        onMouseOut(event, { image, index });
  };

  return (
    <img
      key={key}
      style={onClick ? { ...imgStyle, ...imgPointerStyle } : imgStyle}
      alt={alt}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...image}
    />
  );
};

export const imagePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  key: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sizes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
});

Image.propTypes = {
  index: PropTypes.number.isRequired,
  margin: PropTypes.number,
  onClick: PropTypes.func,
  image: imagePropType.isRequired,
};

export default Image;