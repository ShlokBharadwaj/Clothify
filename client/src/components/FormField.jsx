import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSuggestMe, handleSuggestMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
          {LabelName}
        </label>
        {isSuggestMe && (
          <button
            type='button'
            onClick={handleSuggestMe}
            className='font-semibold text-xs bg-slate-300 py-1 px-2 rounded-md text-black hover:animate-pulse'>Suggest Me</button>
        )}
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required className='bg-gray-50 text-gray-900 text-sm rounded-md outline-none block w-full p-3 shadow-xl' />
    </div>
  )
}

export default FormField