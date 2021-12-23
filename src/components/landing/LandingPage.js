import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearch, getResultsAsync } from '../../redux/resultSlice';
import ResultList from './ResultList';
import tesodev from '../../images/tesodevsvg.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSearch(search));
  }, [dispatch, search]);

  const searchClicked = (e) => {
    e.preventDefault();
    if (search !== '') {
      dispatch(getResultsAsync());
    } else {
      return;
    }
  };
  const items = useSelector((state) => state.results.items);
  const searched = useSelector((state) => state.results.search);

  return (
    <div className='container'>
      <div>
        <div className='imageDiv'>
          <img src={tesodev} alt='' className='mainPageLogo' />
        </div>
        <div className='logoText'>
          <span>Search web app</span>
        </div>
        <div>
          <form action=''>
            <input
              type='text'
              alt='search'
              className='searchInput'
              onChange={(e) => setSearch(e.target.value)}
              value={searched}
              placeholder='Enter here..'
            />
            <button className='searchButton' onClick={(e) => searchClicked(e)}>
              Search
            </button>
          </form>
        </div>

        <div>
          {items.length !== 0 ? (
            <div className='resultArea'>
              <div className='listedItems'>
                {items.slice(0, 3).map((it) => (
                  <React.Fragment key={it[6]}>
                    <ResultList it={it} />
                  </React.Fragment>
                ))}
              </div>
              <Link to='/result'>
                <span className='showMore'>Show more...</span>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
