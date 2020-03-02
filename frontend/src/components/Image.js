import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {uuidv4} from '../utils/uuid-generator';


const Image = ({ index, onClick, onMouseOver, onMouseOut, image, margin, key, alt, id }) => {
  const imgStyle = { margin: margin, display: 'block' };
  const imgPointerStyle = { cursor: 'pointer' };

  const handleClick = event => {
    // console.log('Image CLICK. ID = ', id);
    let data = {
        user_id: uuidv4(),
        object_type_id: 1,
        object_type: 'image',
        object_id: uuidv4(),
        action_type_id: 1,
        action_type: 'click',
        timestamp: + new Date()
    } ;
    axios.post('http://127.0.0.1:5000/log',
              data)
         .then(res => {
            console.log('Click log have been sent');
         });

    if (onClick)
        onClick(event, { image, index });
  };

  const handleMouseOver = event => {
    // console.log('Image OVER. ID = ', id);

    // axios.post('http://127.0.0.1:5000/log',
    //           {event_type: 1, image_id: id})
    //      .then(res => {
    //         console.log('MouseOver log have been sent');
    //      });

    if (onMouseOver)
        onMouseOver(event, { image, index });
  };

  const handleMouseOut = event => {
    // console.log('Image OUT. ID = ', id);

    // axios.post('http://127.0.0.1:5000/log',
    //           {event_type: 2, image_id: id})
    //      .then(res => {
    //         console.log('MouseOut log have been sent');
    //      });

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
  id: PropTypes.string.isRequired,
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