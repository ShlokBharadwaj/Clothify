import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';

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
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchProduct ? (
                <RenderCards data={[]} title="No search results found" />) : (
                <RenderCards data={[]} title="No product found" />)
              }
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home