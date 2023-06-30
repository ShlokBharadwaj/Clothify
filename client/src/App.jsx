import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { logo,logoPV } from './assets';
import { Home, BlendPost } from './pages';

const App = () => {
  return (
    <Router>
      <header className='w-full flex justify-between items-center bg-[#343a40] sm:px-8 px-4 py-4 border-b border-b-[#e6e6e6]'>
        <Link to='/'>
          <img src={logoPV} alt='logo' className='w-28 object-contain scale-125' />
        </Link>

      </header>
    </Router> 
  );
};

export default App;
