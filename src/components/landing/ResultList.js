import React from 'react';

function ResultList({ it, id }) {
  return (
    <div key={id} className='listedItem'>
      <div style={{ display: 'block', width: 290 }}>
        <div className='country-city'>{`${it[4]} - ${it[5]}`}</div>
        <div className='name-date'>{`${it[0]} - ${it[3].slice(6, 10)}`}</div>
      </div>
      <div className='e-mail'>{`Email: ${it[2]}`}</div>
    </div>
  );
}

export default ResultList;
