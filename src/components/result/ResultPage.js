import React, { useEffect, useState } from 'react';
import tesodev from '../../images/tesodevsvg.svg';
import sortIcon from '../../images/sortIcon.svg';
import './ResultPage.css';
import ResultPageList from './ResultPageList';
import {
  changeSearch,
  getDataAsync,
  getResultsAsync,
  sortData,
} from '../../redux/resultSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../pagination/Pagination';

function ResultPage() {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSearch(search));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

  const items = useSelector((state) => state.results.items);
  const searched = useSelector((state) => state.results.search);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = items.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchClicked = (e) => {
    e.preventDefault();
    if (search !== '') {
      dispatch(getResultsAsync());
      setCurrentPage(1);
    } else {
      return;
    }
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
        <a href='/'>
          <img className='resultPageLogo' src={tesodev} alt='' />
        </a>

        <form action=''>
          <input
            className='resultPageInput'
            type='text'
            onChange={(e) => setSearch(e.target.value)}
            value={searched}
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
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', height: 510 }}
        >
          <div style={{ width: 644, marginRight: '8.7%' }}>
            <div style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {currentPost.map((it) => (
                <React.Fragment key={it[6]}>
                  <ResultPageList it={it} />
                </React.Fragment>
              ))}
            </div>
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
                <button
                  onClick={() => {
                    setClicked(!clicked);
                    dispatch(sortData('nameAscending'));
                  }}
                >
                  Name ascending
                </button>
                <button
                  onClick={() => {
                    setClicked(!clicked);
                    dispatch(sortData('nameDescending'));
                  }}
                >
                  Name descending
                </button>
                <button
                  onClick={() => {
                    setClicked(!clicked);
                    dispatch(sortData('yearAscending'));
                  }}
                >
                  Year ascending
                </button>
                <button
                  onClick={() => {
                    setClicked(!clicked);
                    dispatch(sortData('yearDescending'));
                  }}
                >
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
