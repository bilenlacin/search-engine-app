import React from 'react';

function ResultList({ it, i }) {
  return (
    <li className='listedItem'>
      <li style={{ display: 'flex' }}>
        <li className='country-city'>{`${it[4]} - ${it[5]}`}</li>
        <li className='email' style={{ marginLeft: 'auto' }}>
          {`Email:${it[2]}`}
        </li>
      </li>
      <li className='name-date'>{`${it[0]} - ${it[3].slice(6, 10)}`}</li>
    </li>
  );
}

export default ResultList;
