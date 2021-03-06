import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { IMAGE_URL } from '../../services/move.service';
import Rating from '../content/rating/Rating';
import { LazyImage } from '../lazy-image/LazyImage';
import { Link } from 'react-router-dom';
import { formatMovieTitle } from '../../helpers';

import '../content/grid/Grid.scss';
import './Search.scss';

const Search = ({ searchResult, searchQuery }) => {
  const [movieDate, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  return (
    <div className="search-keyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyworkd:</span> <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieDate.map((movie) => (
          <Fragment key={uuidv4()}>
            {movie.poster_path && (
              <LazyImage className="grid-cell" src={`${IMAGE_URL}/${movie.poster_path}`} alt="placeholder">
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
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ searchResult: state.movies.searchResult, searchQuery: state.movies.searchQuery });

export default connect(mapStateToProps)(Search);

Search.propTypes = {
  searchResult: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
};
