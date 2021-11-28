import React, { useEffect, useState } from 'react';
import tesodev from '../images/tesodevsvg.svg';
import sortIcon from '../images/sortIcon.svg';
import './ResultPage.css';
import ResultPageList from './ResultPageList';
import { changeSearch, getResultsAsync } from '../redux/resultSlice';
import { useDispatch, useSelector } from 'react-redux';

function ResultPage() {
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
  return (
    <div className='resultContainer'>
      <div className='resultHeader'>
        <img className='resultPageLogo' src={tesodev} alt='' />
        <form action=''>
          <input
            className='resultPageInput'
            type='text'
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <button
          className='resultSearchButton'
          onClick={(e) => searchClicked(e)}
        >
          Search
        </button>
      </div>
      <div className='resultPageList'>
        <div className='sorting'>
          <img src={sortIcon} alt='' style={{ width: 26, height: 24 }} />
          <button className='orderButton'>Order By</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: 644, marginRight: '8.7%' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.slice(0, 6).map((it) => (
                <ResultPageList it={it} />
              ))}
            </ul>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              position: 'absolute',
            }}
          >
            <div className='sortOptions'>
              <button>Name ascending</button>
              <button>Name descending</button>
              <button>Year ascending</button>
              <button>Year descending</button>
            </div>
          </div>
        </div>
      </div>
      <div className='paging'></div>
    </div>
  );
}

export default ResultPage;
