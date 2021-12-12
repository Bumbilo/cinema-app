import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Rating.scss';

const Rating = ({ rating, totalStars, className }) => {
  const [numberOfStars, setNumberOfStars] = useState([]);
  const raitingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map((i) => i + 1));
    raitingRef.current.style.width = `${Math.floor((rating / totalStars) * 100)}%`;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {numberOfStars.map((i) => (
          <i className="fa fa-star" aria-hidden="true" key={i} />
        ))}

        <div className="front-stars" ref={raitingRef}>
          {numberOfStars.map((i) => (
            <i className="fa fa-star" aria-hidden="true" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
  className: PropTypes.string
};
