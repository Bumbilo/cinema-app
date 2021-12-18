import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from '../slider/Slider';
import Paginate from '../../pagenate/Paginate';
import Grid from '../grid/Grid';
import { getMovies, setResponsePageNumber } from '../../../redux/actions/movies';

import './MainContent.scss';

const MainContent = ({ list, movieType, totalPages, page, getMovies, setResponsePageNumber }) => {
  useEffect(() => {
    setCurrentPage(page);
  }, [page, totalPages]);
  const [currentPage, setCurrentPage] = useState(1);

  const HEADER_TYPE = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming'
  };

  const paginate = (type) => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }

    setCurrentPage(pageNumber);
    setResponsePageNumber(pageNumber, totalPages);
    getMovies(movieType, pageNumber);
  };

  return (
    <div className="main-content">
      <Slider images={list} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
      <Grid images={list} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType,
  totalPages: state.movies.totalPages,
  page: state.movies.page
});
export default connect(mapStateToProps, { getMovies, setResponsePageNumber })(MainContent);

MainContent.propTypes = {
  list: PropTypes.array.isRequired,
  movieType: PropTypes.string,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  getMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func
};
