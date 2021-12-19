import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { IMAGE_URL } from '../../../services/move.service';
import Rating from '../rating/Rating';
import { LazyImage } from '../../lazy-image/LazyImage';
import { Link } from 'react-router-dom';
import { formatMovieTitle } from '../../../helpers';
import './Grid.scss';

const Grid = ({ list }) => {
  const [movieDate, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <>
      <div className="grid">
        {movieDate.map((movie, idx) => (
          <div key={uuidv4()}>
            <LazyImage className="grid-cell" src={`${IMAGE_URL}${movie.poster_path}`} alt="placeholder">
              <div className="grid-read-more">
                <button className="grid-cell-button">
                  <Link to={`/${movie.id}/${formatMovieTitle(movie.title)}/details`}>Read More</Link>
                </button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">{movie.title}</span>
                <div className="grid-detail-rating">
                  <Rating rating={movie.vote_average} totalStars={10} />
                  <div className="drid-vote-average">{movie.vote_average}</div>
                </div>
              </div>
            </LazyImage>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({ list: state.movies.list });

export default connect(mapStateToProps)(Grid);

Grid.propTypes = {
  images: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired
};
