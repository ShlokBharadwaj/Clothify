import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([null]);
  const [searchProduct, setSearchProduct] = useState('asdf');

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

      <div className='mt-16'>
        <FormField />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
          {searchProduct && (
            <h2 className='font-medium text-[#6c757d] text-[16px] mb-3'>
              Showing results for <span className='text-[#343a40]'>{searchProduct}</span>
            </h2>
          )}
          </>
        )}
      </div>
    </section>
  )
}

export default Home