import React from 'react';
import './Boardlist.css';
import { Outlet } from 'react-router-dom';

function BoardList() {
  return (
    <div className='boardlist'>
      <header>
        <div>
          {' '}
          <h3>Header=big title</h3>
          <section> section list</section>
          <div> option</div>
          <div>search</div>
        </div>
      </header>
      <main>
        <div>table</div>
      </main>
      <footer>
        {' '}
        <div className='pagenum'>paaagenum</div>
      </footer>
    </div>
  );
}

export default BoardList;
