import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);

    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
  };

  return (
    <div className='container 2xl:px-20 px-4 mx-auto my-10'>
      {/* Hero Banner */}
      <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-12 sm:py-16 text-center rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 px-4'>
          Explore curated job listings, personalize your resume, and get hired faster.
        </h2>
        <p className='mb-8 max-w-2xl mx-auto text-sm md:text-base font-light px-6'>
          Your one-stop destination to craft resumes, find jobs, and build a future full of possibilities, growth, and purpose-driven work.
        </p>

        {/* Search Bar */}
        <div className='flex flex-col sm:flex-row flex-wrap sm:flex-nowrap items-stretch sm:items-center bg-white rounded text-gray-600 max-w-3xl mx-auto px-4 py-3 gap-2 sm:gap-0'>
          <div className='flex items-center w-full sm:w-auto border-b sm:border-b-0 sm:border-r px-2'>
            <img className='h-4 sm:h-5 mr-2' src={assets.search_icon} alt="Search Icon" />
            <input
              ref={titleRef}
              type='text'
              placeholder='Search for jobs'
              className='text-xs sm:text-sm p-2 rounded outline-none w-full'
            />
          </div>

          <div className='flex items-center w-full sm:w-auto border-b sm:border-b-0 sm:border-r px-2'>
            <img className='h-4 sm:h-5 mr-2' src={assets.location_icon} alt="Location Icon" />
            <input
              ref={locationRef}
              type='text'
              placeholder='Search for location'
              className='text-xs sm:text-sm p-2 rounded outline-none w-full'
            />
          </div>

          <button
            onClick={onSearch}
            className='bg-blue-600 text-white px-6 py-2 rounded text-sm mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto'
          >
            Search
          </button>
        </div>
      </div>


      <div className='border border-gray-200 shadow-sm mt-6 p-4 sm:p-6 rounded-md'>
        <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-8'>
          <p className='font-medium text-sm sm:text-base w-full text-center sm:w-auto'>Trusted by</p>
          <img className='h-5 sm:h-6' src={assets.microsoft_logo} alt='Microsoft' />
          <img className='h-5 sm:h-6' src={assets.walmart_logo} alt='Walmart' />
          <img className='h-5 sm:h-6' src={assets.accenture_logo} alt='Accenture' />
          <img className='h-5 sm:h-6' src={assets.samsung_logo} alt='Samsung' />
          <img className='h-5 sm:h-6' src={assets.amazon_logo} alt='Amazon' />
          <img className='h-5 sm:h-6' src={assets.adobe_logo} alt='Adobe' />
        </div>
      </div>
    </div>
  );
};

export default Hero;
