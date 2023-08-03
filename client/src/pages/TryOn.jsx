import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Loader } from '../components';

const TryOn = () => {

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch the response.json data from the backend API
    axios.get('http://localhost:8000/api/response')
      .then((response) => {
        // Update the state with the imageUrls data from response.json
        if (response.data && response.data.response && response.data.response.imageUrls) {
          setResults(response.data.response.imageUrls);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching response.json:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className='font-extrabold text-[#343a40] text-[32px] mt-10 mx-auto max-w-7xl'>
        Virtual Try-on
      </h1>
      <p className='mt-4 text-[#6c757d] text-[16px] max-w-[500px]'>
        Step into the future of virtual fashion with our innovative 'TryOn' feature. Upload your picture, and watch as our cutting-edge technology seamlessly blends your image with our stunning product collection, giving you a realistic preview of how you'll look wearing your favorite clothing items.
      </p>

      {loading ? (
        <Loader /> // Show the loader while data is being fetched
      ) : (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-8">
          {results.map((imageUrl, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg cursor-pointer">
              <img src={imageUrl} alt={`Product ${index + 1}`} className="w-full h-64 sm:object-contain object-cover mb-2 rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TryOn;