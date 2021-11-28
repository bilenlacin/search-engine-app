import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearch, getResultsAsync } from '../redux/resultSlice';
import ResultList from './ResultList';
import tesodev from '../images/tesodevsvg.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSearch(search));
  }, [dispatch, search]);

  const items = useSelector((state) => state.results.items);

  const searchClicked = (e) => {
    e.preventDefault();
    if (search !== '') {
      dispatch(getResultsAsync());
    } else {
      return;
    }
  };
  return (
    <div className='container'>
      <img src={tesodev} alt='' className='mainPageLogo' />
      <span className='logoText'>Search web app</span>
      <form action=''>
        <input
          type='text'
          className='searchInput'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='searchButton' onClick={(e) => searchClicked(e)}>
          Search
        </button>
      </form>
      {items.length !== 0 ? (
        <div className='resultArea'>
          <ul className='listedItems'>
            {items.slice(0, 3).map((it) => (
              <ResultList it={it} />
            ))}
          </ul>
          <Link to='/result'>
            <a className='showMore' href='/#'>
              Show more...
            </a>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LandingPage;
