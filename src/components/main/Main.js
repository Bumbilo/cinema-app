import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/Spinner';
import Search from '../search/Search';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';
import './Main.scss';

function Main(props) {
  const { loadMoreMovies, page, totalPages, setResponsePageNumber, movieType, searchResult } = props;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setResponsePageNumber(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      fetchData();
    }
  };

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    } else {
      // loadMoreMovies('now_playing', currentPage);
    }
  };

  return (
    <div className="main" ref={mainRef} onScroll={handleScroll}>
      {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent /> : <Search />}</>}
      <div ref={bottomLineRef}></div>
    </div>
  );
}
// MainContent />
const mapSateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  searchResult: state.movies.searchResult
});
export default connect(mapSateToProps, { loadMoreMovies, setResponsePageNumber })(Main);
Main.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  list: PropTypes.array,
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  movieType: PropTypes.string,
  searchResult: PropTypes.array
};
