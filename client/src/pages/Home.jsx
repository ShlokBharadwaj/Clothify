import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([null]);

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#343a40] text-[32px]'>
          Our Products Showcase
        </h1>
        <p className='mt-2 text-[#6c757d] text-[16px] max-w-[500px]'>
          Discover your perfect fit with AI-powered virtual try-on.
        </p>
      </div>
    </section>
  )
}

export default Home