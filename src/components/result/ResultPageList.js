import React from 'react';

function ResultPageList({ it, id }) {
  return (
    <div key={id} className='liHover'>
      <div className='listItem'>
        <div style={{ display: 'block', paddingBottom: 5 }}>
          <div className='countryCity'>{`${it[4]} - ${it[5]}`}</div>
          <div className='nameDate'>{`${it[0]} - ${it[3].slice(6, 10)}`}</div>
        </div>
        <div className='email'> {`Email: ${it[2]}`}</div>
      </div>
    </div>
  );
}

export default ResultPageList;
