import React, { useEffect, useState } from 'react';
import tesodev from '../images/tesodevsvg.svg';
import sortIcon from '../images/sortIcon.svg';
import './ResultPage.css';
import ResultPageList from './ResultPageList';
import {
  changeSearch,
  getDataAsync,
  getResultsAsync,
  sortData,
} from '../redux/resultSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';

function ResultPage() {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSearch(search));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

  const searchClicked = (e) => {
    e.preventDefault();
    if (search !== '') {
      dispatch(getResultsAsync());
    } else {
      return;
    }
  };
  const items = useSelector((state) => state.results.items);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = items.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const changePage = (text, pageNumbersLength) => {
    if (text === 'next') {
      if (currentPage === pageNumbersLength) {
        return;
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
    if (text === 'previous') {
      if (currentPage === pageNumbersLength) {
        return;
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const [clicked, setClicked] = useState(false);

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
          <button onClick={() => setClicked(!clicked)} className='orderButton'>
            Order By
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: 644, marginRight: '8.7%' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {currentPost.map((it) => (
                <ResultPageList it={it} />
              ))}
            </ul>
          </div>
          {clicked && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                position: 'absolute',
              }}
            >
              <div className='sortOptions'>
                <button onClick={() => dispatch(sortData('nameAscending'))}>
                  Name ascending
                </button>
                <button onClick={() => dispatch(sortData('nameDescending'))}>
                  Name descending
                </button>
                <button onClick={() => dispatch(sortData('yearAscending'))}>
                  Year ascending
                </button>
                <button onClick={() => dispatch(sortData('yearDescending'))}>
                  Year descending
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Pagination
        postPerPage={postPerPage}
        totalPost={items.length}
        paginate={paginate}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ResultPage;
