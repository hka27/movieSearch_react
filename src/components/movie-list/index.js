import React, { useState } from 'react';
import './index.css';

export default function MovieList() {
  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState([]);

  function handleChange(e) {
    setUserInput(e.target.value);
  }
  async function loadData(e) {
    const res = await fetch(
      `https://jsonmock.hackerrank.com/api/movies?Year=${userInput}`
    );
    const data_parsed = await res.json();
    const list = data_parsed.data;
    // console.log(list);
    const arr = [];
    list.forEach((el) => {
      // console.log(el);
      arr.push({ key: arr.length, val: el });
    });

    // console.log(data, arr);
    setData((data) => []);
    setData((data) => data.concat(arr));
    // console.log(data);
  }
  function handleKeyPress(e) {
    if (e.key === 'Enter') return loadData();
  }
  return (
    <div className='layout-column align-items-center mt-50'>
      <section className='layout-row align-items-center justify-content-center'>
        <input
          value={userInput}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          type='number'
          className='large'
          placeholder='Enter Year eg 2015'
          data-testid='app-input'
        />
        <button onClick={loadData} className='' data-testid='submit-button'>
          Search
        </button>
      </section>

      <ul className='mt-50 styled' data-testid='movieList'>
        {/* <li className='slide-up-fade-in py-10'></li> */}
        {data.length !== 0
          ? data.map((el) => (
              <li className='slide-up-fade-in py-10' key={el.key}>
                {JSON.stringify(el.val)}
              </li>
            ))
          : null}
      </ul>

      <div className='mt-50 slide-up-fade-in' data-testid='no-result'></div>
    </div>
  );
}
