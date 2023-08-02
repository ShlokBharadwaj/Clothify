import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';
import Products from './Products';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className='mt-5 font-bold text-[#694faf] text-xl uppercase'>{title}
    </h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([null]);
  const [searchProduct, setSearchProduct] = useState('');

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

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <Products />
        )}
      </div>
    </section>
  )
}

export default Home