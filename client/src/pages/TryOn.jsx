import React from 'react';

const TryOn = () => {
  // TODO: Fetch data from products array with image URLs and descriptions
  const results = [
    { imageUrl: 'http://localhost:8000/products/img1.png' },
    { imageUrl: 'http://localhost:8000/products/img2.png' },
    { imageUrl: 'http://localhost:8000/products/img3.png' },
    { imageUrl: 'http://localhost:8000/products/img4.png' },
    { imageUrl: 'http://localhost:8000/products/img5.png' },
    { imageUrl: 'http://localhost:8000/products/img6.png' },
    { imageUrl: 'http://localhost:8000/products/img7.png' },
    { imageUrl: 'http://localhost:8000/products/img8.png' },
    { imageUrl: 'http://localhost:8000/products/img9.png' },
  ];

  return (
    <div>
      <h1 className='font-extrabold text-[#343a40] text-[32px] mt-10 mx-auto max-w-7xl'>
        Virtual Try-on
      </h1>
      <p className='mt-4 text-[#6c757d] text-[16px] max-w-[500px]'>
        Step into the future of virtual fashion with our innovative 'TryOn' feature. Upload your picture, and watch as our cutting-edge technology seamlessly blends your image with our stunning product collection, giving you a realistic preview of how you'll look wearing your favorite clothing items.
      </p>

      <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-8">
        {results.map((product, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg cursor-pointer">
            <img src={product.imageUrl} alt={product.description} className="w-full h-64 sm:object-contain  object-cover mb-2 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TryOn;
