import React, { useState } from 'react';
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
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = () => {}
  const handleChange = (e) => {}
  const handleSuggestMe = () => {}

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#343a40] text-[32px]'>
          Blend
        </h1>
        <p className='mt-2 text-[#6c757d] text-[16px] max-w-[500px]'>
          Elevate your style with DALL-E & MidJourney's AI-powered virtual try-on for the perfect fit
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            LabelName='Your Name'
            type='text'
            name='name'
            placeholder='Lorem Ipsum'
            value={form.name}
            handleChange={handleChange}
          ></FormField>
          <FormField
            LabelName='prompt'
            type='text'
            name='prompt'
            placeholder='a man trying on a casual outfit for a casual gathering'
            value={form.prompt}
            handleChange={handleChange}
            isSuggestMe
            handleSuggestMe={handleSuggestMe}
          ></FormField>
        </div>
      </form>
    </section>
  )
}

export default BlendPost