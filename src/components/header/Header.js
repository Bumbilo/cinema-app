import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import logo from '../../assets/logo.png';
import { connect } from 'react-redux';
import {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  searchQuery,
  searchResult,
  clearMovieDetails
} from '../../redux/actions/movies';
import { pathURL } from '../../redux/actions/routes';
import { useNavigate, useMatch, useLocation } from 'react-router-dom';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Poppular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = (props) => {
  const { getMovies, setMovieType, page, totalPages, setResponsePageNumber, searchQuery, searchResult, path, pathURL } =
    props;
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState(HEADER_LIST[0].type);
  const [disableSearch, setDisableSearch] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const detailsRoute = useMatch('/:id/:name/details');

  const toggleMenu = () => {
    setNavClass(!navClass);
    setMenuClass(!menuClass);
    navClass ? document.body.classList.add('header-nav-open') : document.body.classList.remove('header-nav-open');
  };

  const setMovieTypeUrl = (type) => {
    setDisableSearch(false);
    if (location.pathname !== '/') {
      clearMovieDetails();
      navigate('/');
      setType(type);
      setMovieType(type);
    } else {
      setType(type);
      setMovieType(type);
    }
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
    searchQuery(event.target.value);
    searchResult(event.target.value);
  };

  const nvaigateToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    pathURL('/', '/');
  }, []);
  useEffect(() => {
    getMovies(type, page);
    setResponsePageNumber(page, totalPages);

    if (detailsRoute || location.pathname === '/') {
      setHideHeader(true);
    }

    if (location.pathname !== '/' && location.key) {
      setDisableSearch(true);
    }
  }, [type, location, disableSearch, path]);

  return (
    <>
      {hideHeader && (
        <div className="header-nav-wrapper">
          <div className="header-bar"></div>
          <div className="header-navbar">
            <div className="header-image" onClick={() => nvaigateToHome()}>
              <img src={logo} alt="logo" className="header-image" />
            </div>
            <div
              className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`}
              id="header-mibile-menu"
              onClick={() => toggleMenu()}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
              {HEADER_LIST.map((header) => (
                <li
                  key={header.id}
                  className={header.type === type ? 'header-nav-item active-item' : 'header-nav-item'}
                  onClick={() => setMovieTypeUrl(header.type)}
                >
                  <span className="header-list-name">
                    <i className={header.iconClass}></i>
                  </span>{' '}
                  <span className="header-list-name">{header.name}</span>
                </li>
              ))}
              <input
                className={`search-input ${disableSearch ? 'disabled' : ''}`}
                type="text"
                placeholder="Search for a movie"
                value={search}
                onChange={onChangeSearch}
              />
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  getMovies: PropTypes.func,
  setMovieType: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  clearMovieDetails: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  searchQuery: PropTypes.func,
  searchResult: PropTypes.func,
  pathURL: PropTypes.func,
  path: PropTypes.string
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  path: state.routes.path
});
export default connect(mapStateToProps, {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  clearMovieDetails,
  searchQuery,
  searchResult,
  pathURL
})(Header);
