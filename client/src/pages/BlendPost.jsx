import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { Loader } from '../components';
import Products from './Products';
import TryOn from './TryOn';
import axios from 'axios';

const BlendPost = () => {
  const [chosenImage, setChosenImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const generateImage = async () => {
    if (!chosenImage || !selectedProduct) {
      alert('Please choose an image and a product.');
      return;
    } else {
      try {
        setUploadingImg(true);
        setLoading(true);

        const formData = new FormData();
        formData.append('userImage', chosenImage);
        formData.append('productImage', selectedProduct.imageUrl);

        // Send the form data to the backend API
        await axios.post('http://localhost:8000/api/process-images', formData);

        // After processing on the backend, set the generatedImageUrl state with the URL of the processed image
        const response = await fetch('http://localhost:8000/api/response');
        const data = await response.json();
        setGeneratedImageUrl(data.response.imageUrls[0]);

        setLoading(false);
        setUploadingImg(false);
      } catch (error) {
        setLoading(false);
        setUploadingImg(false);
        alert('Error generating image');
        console.error('Error details:', error);
      }
    }
  };



  const validateImage = (file, isMask = false) => {
    const maxSize = 1 * 1024 * 1024; // 1MB
    console.log("The user upload Image size is: " + file.size);
    if (file.type !== 'image/png') {
      alert('Invalid file type. Only PNG files are allowed.');
      return false;
    }
    if (file.size > maxSize) {
      alert('File is too large. Only files up to 1MB are allowed.');
      return false;
    }
    return true;
  };

  const chooseImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (validateImage(file)) {
          setChosenImage(file);
          console.log('Chosen image:', file);
        }
      }
    };
    input.click();
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#343a40] text-[32px]'>
          Blend
        </h1>
        <p className='mt-2 text-[#6c757d] text-[16px] max-w-[500px]'>
          Elevate your style with DALL-E & MidJourney's AI-powered virtual try-on for the perfect fit.
        </p>
      </div>
      <form className='mt-16'>
        <div className='flex flex-col gap-5'>
          <div className='relative bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg w-64 p-3 h-64 flex justify-center items-center mx-auto'>
            {chosenImage ? (
              <img src={URL.createObjectURL(chosenImage)} alt='preview' className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt='preview' className='w-9/12 h-3/4 object-contain opacity-40' />
            )}
            {uploadingImg && (
              <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={chooseImage} className='text-white bg-[#694faf] font-medium rounded-lg text-sm w-52 px-5 py-3 mx-auto'>
            {uploadingImg ? 'Wait...' : 'Choose Image'}
          </button>
          <button type='button' onClick={generateImage} className='text-white bg-[#694faf] font-medium rounded-lg text-sm w-52  px-5 py-3 mx-auto'>
            {uploadingImg ? 'Uploading Image...' : 'Upload Image'}
          </button>
        </div>
      </form>
      <Products setSelectedProduct={setSelectedProduct} />
      <TryOn imageUrl={generatedImageUrl} />
    </section>
  )
};

export default BlendPost;