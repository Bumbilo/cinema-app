import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import logo from '../../assets/logo.png';
import { connect } from 'react-redux';
import { getMovies, setMovieType, setResponsePageNumber, searchQuery, searchResult } from '../../redux/actions/movies';

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
  const { getMovies, setMovieType, page, totalPages, setResponsePageNumber, searchQuery, searchResult } = props;
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState(HEADER_LIST[0].type);
  const [search, setSearch] = useState('');

  const toggleMenu = () => {
    setNavClass(!navClass);
    setMenuClass(!menuClass);
    navClass ? document.body.classList.add('header-nav-open') : document.body.classList.remove('header-nav-open');
  };

  const setMovieTypeUrl = (type) => {
    setType(type);
    setMovieType(type);
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
    searchQuery(event.target.value);
    searchResult(event.target.value);
  };

  useEffect(() => {
    getMovies(type, page);
    setResponsePageNumber(page, totalPages);
  }, [type]);

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
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
              className="search-input"
              type="text"
              placeholder="Search for a movie"
              value={search}
              onChange={onChangeSearch}
            />
          </ul>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  getMovies: PropTypes.func,
  setMovieType: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  // list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  searchQuery: PropTypes.func,
  searchResult: PropTypes.func
};

const mapStateToProps = (state) => ({
  // list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages
});
export default connect(mapStateToProps, { getMovies, setMovieType, setResponsePageNumber, searchQuery, searchResult })(
  Header
);
