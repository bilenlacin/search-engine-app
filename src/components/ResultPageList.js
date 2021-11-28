import React from 'react';

function ResultPageList({ it, i }) {
  return (
    <li className='liHover'>
      <li className='listItem'>
        <li style={{ display: 'flex', paddingBottom: 5 }}>
          <li className='countryCity'>{`${it[4]} - ${it[5]}`}</li>
          <li className='email'> {`Email:${it[2]}`}</li>
        </li>
        <li className='nameDate'>{`${it[0]} - ${it[3].slice(6, 10)}`}</li>
      </li>
    </li>
  );
}

export default ResultPageList;
