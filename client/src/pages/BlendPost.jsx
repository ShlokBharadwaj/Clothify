import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompts } from '../utils';
import { FormField, Loader } from '../components';

const BlendPost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const [chosenImage, setChosenImage] = useState(null);
  const [chosenMask, setChosenMask] = useState(null);

  const [loading, setLoading] = useState(false);
  const handleSubmit = () => { }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSuggestMe = () => {
    const randomPrompt = getRandomPrompts();
    setForm({ ...form, prompt: randomPrompt });
  }
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })
      } catch (error) {

      }
    }
  }

  const validateImage = (file, isMask = false) => {
    const maxSize = 4 * 1024 * 1024; // 4MB

    if (file.type !== 'image/png') {
      alert("Invalid file type. Only PNG files are allowed.");
      return false;
    }
    if (file.size > maxSize) {
      alert("File is too large. Only files up to 4MB are allowed.");
      return false;
    }
    if (isMask && chosenImage) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = URL.createObjectURL(chosenImage);

        image.onload = () => {
          URL.revokeObjectURL(image.src);

          const maskImage = new Image();
          maskImage.src = URL.createObjectURL(file);

          maskImage.onload = () => {
            URL.revokeObjectURL(maskImage.src);

            if (
              image.width !== maskImage.width ||
              image.height !== maskImage.height
            ) {
              reject(
                new Error(
                  "Invalid mask dimensions. Mask should have the same dimensions as the image."
                )
              );
            } else {
              resolve();
            }
          };

          maskImage.onerror = () => {
            URL.revokeObjectURL(maskImage.src);
            reject(new Error("Error loading the mask image."));
          };
        };

        image.onerror = () => {
          URL.revokeObjectURL(image.src);
          reject(new Error("Error loading the image."));
        };
      });
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
          // TODO: API call 
          console.log('Chosen image:', file);
        }
      }
    };
    input.click();
  };

  const chooseMask = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (validateImage(file, true)) {
          setChosenMask(file);
          // TODO: API call
          console.log('Chosen mask:', file);
        }
      }
    };
    input.click();
  }

  useEffect(() => {
    if (chosenImage && chosenMask) {
      validateImage(chosenMask, true)
        .then(() => {
          console.log('Mask is valid');
        })
        .catch((error) => {
          alert(error.message);
          setChosenMask(null);
        });
    }
  }, [chosenImage, chosenMask]);

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
      <form className='mt-16' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            LabelName='Your Name'
            type='text'
            name='name'
            placeholder='John Doe'
            value={form.name}
            handleChange={handleChange}
          ></FormField>
          <FormField
            LabelName='Prompt'
            type='text'
            name='prompt'
            placeholder='Me in a red dress'
            value={form.prompt}
            handleChange={handleChange}
            isSuggestMe
            handleSuggestMe={handleSuggestMe}
          ></FormField>
          <div className='relative bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg w-64 p-3 h-64 flex justify-center items-center mx-auto'>
            {form.photo ? (
              <img src={form.photo} alt={form.photo} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt='preview' className='w-9/12 h-3/4 object-contain opacity-40' />
            )}
            {generatingImg && (
              <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center rounded-lg'>
                <Loader />
              </div>
            )}

          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={chooseImage} className='text-white bg-[#694faf] font-medium rounded-lg text-sm w-1/2 px-5 py-3 mx-auto'>
            {generatingImg ? 'Wait...' : 'Choose Image'}
          </button>
          <button type='button' onClick={generateImage} className='text-white bg-[#694faf] font-medium rounded-lg text-sm w-1/2 px-5 py-3 mx-auto'>
            {generatingImg ? 'Generating Image...' : 'Generate Image'}
          </button>
          <button type='button' onClick={chooseMask} className='text-white bg-[#694faf] font-medium rounded-lg text-sm w-1/2 px-5 py-3 mx-auto'>
            {generatingImg ? 'Wait...' : 'Choose Mask'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default BlendPost