import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { logo,logoPV } from './assets';
import { Home, BlendPost } from './pages';

const App = () => {
  return (
    <Router>
      <header className='w-full flex justify-between items-center bg-[#343a40] sm:px-8 p-4 border-b border-b-[#e6e6e6]'>
        <Link to='/'>
          <img src={logoPV} alt='logo' className='w-28 ml-2 object-contain scale-125' />
        </Link>
        <Link to='/blend-post' className='font-inter font-medium bg-[#694faf] text-white px-4 py-2 rounded-md'>Blend</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-slate-100 min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blend-post' element={<BlendPost />} />
        </Routes>
      </main>
    </Router> 
  );
};

export default App;
